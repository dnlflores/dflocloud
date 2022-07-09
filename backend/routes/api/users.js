const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

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
    singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const profilePicUrl = await singlePublicFileUpload(req.file);
        const user = await User.signup({ email, username, password, profilePicture: profilePicUrl });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

router.get("/me", requireAuth, asyncHandler(async (req, res) => {

    res.json(req.user);
}));

// Get user details
router.get('/:id', asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, { include: [Song, Album] });

    if(!user) {
        res.status(404);
        return res.json({ message: "Artist not found.", statusCode: 404 });
    }

    const result = { id: user.id, username: user.username, totalSongs: user.Songs.length, totalAlbums: user.Albums.length, profilePicUrl: user.profilePicUrl }
    return res.json(result);
}));

// Get user songs
router.get('/:id/songs', asyncHandler(async (req, res) => {
    const songs = await Song.findAll({ where: { userId: { [Op.eq]: req.params.id } } });
    const user = await User.findByPk(req.params.id);

    if(!user) {
        res.status(404);
        return res.json({ message: "Artist not found.", statusCode: 404 });
    }

    return res.json(songs);
}));

// Get user albums
router.get('/:id/albums', asyncHandler(async (req, res) => {
    const albums = await Album.findAll({ where: { userId: { [Op.eq]: req.params.id } } });
    const user = await User.findByPk(req.params.id);

    if(!user) {
        res.status(404);
        return res.json({ message: "Artist not found.", statusCode: 404 });
    }

    return res.json(albums);
}));

// Get user playlists
router.get('/:id/playlists', asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll({ where: { userId: { [Op.eq]: req.params.id } } });
    const user = await User.findByPk(req.params.id);

    if(!user) {
        res.status(404);
        return res.json({ message: "Artist not found.", statusCode: 404 });
    }

    return res.json(playlists);
}));

module.exports = router;