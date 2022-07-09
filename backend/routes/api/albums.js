const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Album, User, Song } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

const validateAlbum = [
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

// Create Album
router.post('/', singleMulterUpload("image"), validateAlbum, asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const imageUrl = await singlePublicFileUpload(req.file);

    const newAlbum = await Album.create({
        title, description, userId: req.user.id, previewImage: imageUrl
    });

    return res.json(newAlbum);
}));

// Get Albums
router.get('/', asyncHandler(async (req, res) => {
    const albums = await Album.findAll({ include: [User, Song] });

    return res.json(albums);
}));

// Get All Albums from current user
router.get('/me', asyncHandler(async (req, res) => {
    const albums = await Album.findAll({include: [{model: User, as: 'Artist'}, Song], where: {userId: {[Op.eq]: req.user.id}}});

    return res.json(albums);
}));

// Get Single Album
router.get('/:id', asyncHandler(async (req, res) => {
    const myAlbums = await Album.findByPk(req.params.id, {include: [{model: User, as: 'Artist'}, Song]});

    return res.json(myAlbums);
}));

// Edit Album
router.patch('/:id', singleMulterUpload("image"), validateAlbum, asyncHandler(async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    const { title, description, imageUrl } = req.body;
    const newImageUrl = req.file ? await singlePublicFileUpload(req.file) : imageUrl;

    await album.update({
        title, description, previewImage: newImageUrl
    })

    return res.json(album);
}));

// Delete Album
router.delete('/:id', asyncHandler(async (req, res) => {
    const album = await Album.findByPk(req.params.id);

    await album.destroy();

    return res.json({ message: "success", statusCode: 200 });
}));

module.exports = router;