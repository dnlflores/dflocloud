const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Op } = require('sequelize');
const { Song, Album, User, Playlist } = require('../../db/models');
const playlist = require('../../db/models/playlist');

const router = express.Router();

const validatePlaylist = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 50 })
        .withMessage('Please provide a title with at least 4 characters and less than 50 characters.'),
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

module.exports = router;