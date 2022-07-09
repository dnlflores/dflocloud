const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
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
router.post('/', requireAuth, singleMulterUpload("song"), singleMulterUpload("image"), validateSong, asyncHandler(async (req, res) => {
    const { title, description, url, imageUrl, albumId } = req.body;
    const songUrl = url ? url : await singlePublicFileUpload(req.files[0]);
    const picUrl = imageUrl ? imageUrl : await singlePublicFileUpload(req.files[1]);

    const newSong = await Song.create({
        title, description, userId: req.user.id, songUrl, previewImage: picUrl, albumId
    });

    return res.json(newSong);
}));

// Get Songs
router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll({include: [{model: User, as: 'Artist'}, Album]});

    return res.json(songs);
}));

// Get All User Songs
router.get('/me', requireAuth, asyncHandler(async (req, res) => {
    const mySongs = await Song.findAll({include: [{model: User, as: 'Artist'}, Album], where: {userId: {[Op.eq]: req.user.id}}});

    return res.json(mySongs);
}));

// Get Single Song
router.get('/:id', asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id, {include: [{model: User, as: 'Artist'}, Album.scope('song')]});

    return res.json(song);
}));

// Edit Song
router.patch('/:id', requireAuth, singleMulterUpload("song"), singleMulterUpload("image"), validateSong, asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id);
    const { title, description, songUrl, imageUrl } = req.body;
    const newSongUrl = songUrl ? songUrl : await singlePublicFileUpload(req.files[0]);
    const newImageUrl = imageUrl ? imageUrl : await singlePublicFileUpload(req.files[1]);

    await song.update({
        title, description, userId: req.user.id, songUrl: newSongUrl, previewImage: newImageUrl
    })

    return res.json(song);
}));

// Delete Song
router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id);

    await song.destroy();

    return res.json({ message: "success", statusCode: 200 });
}));

module.exports = router;