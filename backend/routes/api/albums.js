const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
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
router.post('/', requireAuth, singleMulterUpload("image"), validateAlbum, asyncHandler(async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const picUrl = imageUrl ? imageUrl : await singlePublicFileUpload(req.file);

    const newAlbum = await Album.create({
        title, description, userId: req.user.id, previewImage: picUrl
    });

    return res.json(newAlbum);
}));

// Get Albums
router.get('/', asyncHandler(async (req, res) => {
    const albums = await Album.findAll({ include: [{ model: User, as: 'Artist' }, Song] });

    return res.json(albums);
}));

// Get All Albums from current user
router.get('/me', requireAuth, asyncHandler(async (req, res) => {
    const albums = await Album.findAll({ include: [{ model: User, as: 'Artist' }, Song], where: { userId: { [Op.eq]: req.user.id } } });

    return res.json(albums);
}));

// Get Single Album
router.get('/:id', asyncHandler(async (req, res) => {
    const album = await Album.findByPk(req.params.id, { include: [{ model: User, as: 'Artist' }, Song] });

    if (!album) {
        res.status(404);
        return res.json({ message: "Album can't be found", statusCode: 404 })
    }

    return res.json(album);
}));

// Edit Album
router.patch('/:id', requireAuth, singleMulterUpload("image"), validateAlbum, asyncHandler(async (req, res) => {
    const album = await Album.findByPk(req.params.id, { include: { model: User, as: "Artist" } });
    const { title, description, image } = req.body;

    if (!album) {
        res.status(404);
        return res.json({ message: "Album can't be found", statusCode: 404 })
    }

    if (req.user.id !== album.userId) {
        res.status(403);
        return res.json({ message: "Only the owner of this album can edit this album", statusCode: 403 })
    }
    const newImageUrl = image ? image : await singlePublicFileUpload(req.file);

    await album.update({
        title, description, previewImage: newImageUrl
    })

    return res.json(album);
}));

// Delete Album
router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const album = await Album.findByPk(req.params.id);

    if (!album) {
        res.status(404);
        return res.json({ message: "Album can't be found", statusCode: 404 })
    }

    if (req.user.id !== album.userId) {
        res.status(403);
        return res.json({ message: "Only the owner of this album can delete this album", statusCode: 403 })
    }

    await album.destroy();

    return res.json({ message: "success", statusCode: 200 });
}));

module.exports = router;