const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload, multipleMulterUpload } = require('../../awsS3');
const { Op } = require('sequelize');
const { Song, Album, User } = require('../../db/models');

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

// Upload Song
// song url and image url naming convention is a work in progress. 
// these url's need 2 different names for each to check if a user has used a computer file upload (AWS frontend)
// or if they are providing an actual link to a picture (mostly for testing)
router.post('/', requireAuth, multipleMulterUpload("files"), validateSong, asyncHandler(async (req, res) => {
    const { title, description, songUrl, imageUrl, albumId } = req.body;

    const album = await Album.findByPk(albumId);

    if(!album) {
        res.status(404);
        return res.json({ message: "Album cannot be found.", statusCode: 404 });
    }

    const url = songUrl ? songUrl : await singlePublicFileUpload(req.files[0]);
    
    let picUrl;
    if(req.files.length > 1 && !imageUrl) picUrl = await singlePublicFileUpload(req.files[1]);
    else picUrl = imageUrl ? imageUrl : "https://upload.wikimedia.org/wikipedia/commons/c/ca/CD-ROM.png";

    const newSong = await Song.create({
        title, description, userId: req.user.id, songUrl: url, previewImage: picUrl, albumId
    });

    return res.json(newSong);
}));

// Get Songs
router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll({ include: [{ model: User, as: 'Artist' }, Album] });

    return res.json(songs);
}));

// Get All User Songs
router.get('/me', requireAuth, asyncHandler(async (req, res) => {
    const mySongs = await Song.findAll({ include: [{ model: User, as: 'Artist' }, Album], where: { userId: { [Op.eq]: req.user.id } } });

    return res.json(mySongs);
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
    const song = await Song.findByPk(req.params.id);
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
    if(req.files.length > 1 && !imageUrl) picUrl = await singlePublicFileUpload(req.files[1]);
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

    await song.destroy();

    return res.json({ message: "Song successfully deleted.", statusCode: 200 });
}));

module.exports = router;