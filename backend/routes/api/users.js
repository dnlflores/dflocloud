const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

// Get user details
router.get('/:id', asyncHandler(async (req, res) => {
    const user = await User.scope('currentUser').findByPk(req.params.id, { include: [Song, Album] });
    const result = { id: user.id, username: user.username, totalSongs: user.Songs.length, totalAlbums: user.Albums.length, profilePicUrl: user.profilePicUrl }
    res.json(result);
}));

// Get user songs
router.get('/:id/songs', asyncHandler(async (req, res) => {
    const songs = await Song.findAll({ where: { userId: { [Op.eq]: req.params.id } } })
    res.json(songs);
}));

// Get user albums
router.get('/:id/albums', asyncHandler(async (req, res) => {
    const albums = await Album.findAll({ where: { userId: { [Op.eq]: req.params.id } } })
    res.json(albums);
}));

// Get user playlists
router.get('/:id/playlists', asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll({ where: { userId: { [Op.eq]: req.params.id } } })
    res.json(playlists);
}));

module.exports = router;