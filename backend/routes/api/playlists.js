const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Op } = require('sequelize');
const { Song, Album, User, Playlist, PlaylistSong } = require('../../db/models');
const playlist = require('../../db/models/playlist');

const router = express.Router();

const validatePlaylist = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 50 })
        .withMessage('Please provide a name with at least 4 characters and less than 50 characters.'),
    handleValidationErrors
];

// Get playlists by the current user
router.get('/me', requireAuth, asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll({ where: { userId: { [Op.eq]: req.user.id } } })

    res.json(playlists);
}));

// Get specified playlist
router.get('/:id', asyncHandler(async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id, {
        include: [Song]
    })

    res.json(playlist);
}));

// Create a playlist
router.post('/', requireAuth, singleMulterUpload("image"), validatePlaylist, asyncHandler(async (req, res) => {
    const { name, imageUrl } = req.body;
    const picUrl = imageUrl ? imageUrl : await singlePublicFileUpload(req.file);

    const playlist = await Playlist.create({
        userId: req.user.id,
        name,
        previewImage: picUrl
    })

    res.json(playlist);
}));

// Add a song to a playlist
router.post('/:id', requireAuth, asyncHandler(async (req, res) => {
    const songId = req.body.songId;
    const playlistId = req.params.id;

    const addSong = await PlaylistSong.create({
        songId,
        playlistId
    });

    res.json({ id: addSong.id, songId, playlistId });
}));

// Edit a playlist
router.patch('/:id', requireAuth, singleMulterUpload("image"), validatePlaylist, asyncHandler(async (req, res) => {
    const { name, imageUrl } = req.body;
    const picUrl = imageUrl ? imageUrl : await singlePublicFileUpload(req.file);

    const playlist = await Playlist.findByPk(req.params.id);

    await playlist.update({
        name,
        previewImage: picUrl
    })

    res.json(playlist);
}));

// Delete a playlist
router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);

    await playlist.destroy();

    res.json({ message: "Deleted successfully", statusCode: 200 });
}));

module.exports = router;