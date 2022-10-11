const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { query } = require('express-validator/check');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload, multipleMulterUpload, multiplePublicFileUpload } = require('../../awsS3');
const { Op } = require('sequelize');
const { Song, Album, User, PlaylistSong } = require('../../db/models');

const router = express.Router();

const validateSong = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 50 })
        .withMessage('Please provide a title with at least 4 characters and less than 50 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 10, max: 300 })
        .withMessage('Description must be at least 10 characters and less than 300 characters.'),
    handleValidationErrors
];

const validateQuery = [
    query('size')
        .isInt({ max: 20 }).withMessage('Size must be less than or equal 20'),
    handleValidationErrors
]

// Upload Song
// song url and image url naming convention is a work in progress. 
// these url's need 2 different names for each to check if a user has used a computer file upload (AWS frontend)
// or if they are providing an actual link to a picture (mostly for testing)
router.post('/', requireAuth, multipleMulterUpload("files"), asyncHandler(async (req, res) => {
    const { titles, description, title } = req.body;

    const titlesObj = title ? {} : JSON.parse(titles);

    const songs = req.files.filter(file => file.mimetype.includes('audio'));
    const image = req.files.find(file => file.mimetype.includes('image'));

    const songsUrl = await multiplePublicFileUpload(songs);
    const imageUrl = image ? await singlePublicFileUpload(image) : 'https://qph.cf2.quoracdn.net/main-qimg-0b4d3539b314fb898a95d424fe1af853-pjlq';

    if (songsUrl.length > 1) {
        const bulk = [];
        songsUrl.forEach((song, i) => {
            bulk.push({
                title: titlesObj[songs[i].originalname],
                description,
                userId: req.user.id,
                songUrl: song,
                previewImage: imageUrl
            })
        });
        const createSongs = await Song.bulkCreate(bulk);

        const ids = createSongs.map(song => song.id);

        const newSongs = await Song.findAll({ where: { id: ids }, include: [{ model: User, as: 'Artist' }] });
        return res.json(newSongs);
    }

    await Song.create({
        title,
        description,
        userId: req.user.id,
        songUrl: songsUrl[0],
        previewImage: imageUrl
    });
    return res.redirect('/api/songs')
}));

// Get Songs
router.get('/', asyncHandler(async (req, res) => {
    const size = parseInt(req.query.size, 10);
    const songs = await Song.findAll({ include: [{ model: User, as: 'Artist' }, Album], limit: !isNaN(size) ? size : null });

    return res.json(songs);
}));

// Get All User Songs
router.get('/me', requireAuth, asyncHandler(async (req, res) => {
    const mySongs = await Song.findAll({ include: [{ model: User, as: 'Artist' }, Album], where: { userId: { [Op.eq]: req.user.id } } });

    return res.json(mySongs);
}));

// Get Latest Songs
router.get('/latest', asyncHandler(async (req, res) => {
    const size = parseInt(req.query.size, 10);
    const songs = await Song.findAll({ include: [{ model: User, as: 'Artist' }, Album], limit: !isNaN(size) ? size : null, order: [['createdAt', 'DESC']] });

    return res.json(songs);
}));

// Get Most Played Songs
router.get('/popular', asyncHandler(async (req, res) => {
    const size = parseInt(req.query.size, 10);
    const songs = await Song.findAll({ include: [{ model: User, as: 'Artist' }, Album], limit: !isNaN(size) ? size : null, order: [['timesPlayed', 'DESC']] })
}));

// Get Single Song
router.get('/:id', asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id, { include: [{ model: User, as: 'Artist' }, Album.scope('song')] });

    if (!song) {
        res.status(404);
        return res.json({ message: "Song not found.", statusCode: 404 });
    }

    return res.json(song);
}));

// Edit Song
router.patch('/:id', requireAuth, multipleMulterUpload("files"), validateSong, asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id, { include: [{ model: User, as: 'Artist' }] });
    const { title, description, songUrl, imageUrl } = req.body;

    if (!song) {
        res.status(404);
        return res.json({ message: "Song can't be found.", statusCode: 404 })
    }

    if (req.user.id !== song.userId) {
        res.status(403);
        return res.json({ message: "Only the owner of this song can edit this song.", statusCode: 403 })
    }

    const url = songUrl ? songUrl : await singlePublicFileUpload(req.files[0]);

    let picUrl;
    if (req.files.length > 1 && !imageUrl) picUrl = await singlePublicFileUpload(req.files[1]);
    else if (req.files.length === 1 && !imageUrl) picUrl = await singlePublicFileUpload(req.files[0]);
    else picUrl = imageUrl ? imageUrl : "https://upload.wikimedia.org/wikipedia/commons/c/ca/CD-ROM.png";

    await song.update({
        title, description, userId: req.user.id, songUrl: url, previewImage: picUrl
    })

    return res.json(song);
}));

// Delete Song
router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id);

    if (!song) {
        res.status(404);
        return res.json({ message: "Song can't be found.", statusCode: 404 })
    }

    if (req.user.id !== song.userId) {
        res.status(403);
        return res.json({ message: "Only the owner of this song can delete this song.", statusCode: 403 })
    }

    // const songPlaylist = await PlaylistSong.findOne({ where: { songId: song.id } })

    // if (songPlaylist) await songPlaylist.destroy();

    await song.destroy();

    return res.json({ message: "Song successfully deleted.", statusCode: 200 });
}));

// Increase number of times song was played by 1
router.patch('/:id/play', asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id);

    if (!song) {
        res.status(404);
        return res.json({ message: "Song can't be found.", statusCode: 404 });
    }

    await song.update({ timesPlayed: song.timesPlayed + 1 });

    return res.json(song);
}));

module.exports = router;