const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

const { Song } = require('../../db/models');

const router = express.Router();

const validateSong = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 50 })
        .withMessage('Please provide a title with at least 4 characters and less than 50 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 10, max: 300 })
        .withMessage('Description must be at least 6 characters and less than 300 characters.'),
    handleValidationErrors
];

// Upload Song
router.post('/', singleMulterUpload("song"), validateSong, asyncHandler(async(req, res) => {
    const {title, description, userId } = req.body;
    const songUrl = await singlePublicFileUpload(req.file);

    const newSong = await Song.create({
        title, description, userId, songUrl
    });

    return res.json(newSong);
}));

// Get Songs
router.get('/', asyncHandler(async(req, res) => {
    const songs = await Song.findAll();

    return res.json(songs);
}));

// Get Single Song
router.get('/:id', asyncHandler(async(req, res) => {
    const song = await Song.findByPk(req.params.id);

    return res.json(song);
}));

// Edit Song
router.patch('/:id', singleMulterUpload("image"), validateSong, asyncHandler(async(req, res) => {
    const song = await Song.findByPk(req.params.id);
    const { title, description, userId, songUrl } = req.body;
    const newSongUrl = req.file ? await singlePublicFileUpload(req.file) : songUrl;

    await song.update({
        title, description, userId, songUrl: newSongUrl
    })

    return res.json(song);
}));

// Delete Song
router.delete('/:id', asyncHandler(async(req, res) => {
    const song = Song.findByPk(req.params.id);

    await song.destroy();

    return res.json({message: "success", song});
}));