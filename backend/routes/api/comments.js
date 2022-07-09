const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Comment, User, Song } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

const validateComment = [
    check('content')
        .exists({ checkFalsy: true })
        .isLength({ min: 10, max: 100 })
        .withMessage('Content must be at least 10 characters and less than 100 characters.'),
    handleValidationErrors
];

// Get comments for a song
router.get('/:songId', asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.songId);

    if(!song) {
        res.status(404);
        return res.json({ message: "Song cannot be found.", statusCode: 404 });
    }

    const comments = await Comment.findAll({
        where: {
            songId: { [Op.eq]: req.params.songId }
        },
        include: User
    });

    return res.json(comments);
}));

// Create comment for a song
router.post('/:songId', requireAuth, validateComment, asyncHandler(async (req, res) => {
    const { content } = req.body;
    const song = await Song.findByPk(req.params.songId);

    if(!song) {
        res.status(404);
        return res.json({ message: "Song cannot be found.", statusCode: 404 });
    }

    const newComment = await Comment.create({
        userId: req.user.id,
        content,
        songId: req.params.songId
    });

    return res.json(newComment);
}));

// Edit a comment
router.patch('/:id', requireAuth, asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);
    const { content } = req.body;

    if(!comment) {
        res.status(404);
        return res.json({ message: "Comment cannot be found.", statusCode: 404 });
    }

    if(req.user.id !== comment.userId) {
        res.status(403);
        return res.json({ message: "Only the user who created this comment can edit it.", statusCode: 403 })
    }

    await comment.update({ content });

    return res.json(comment);
}));

// Delete a comment
router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);

    if(!comment) {
        res.status(404);
        return res.json({ message: "Comment cannot be found.", statusCode: 404 });
    }

    if(req.user.id !== comment.userId) {
        res.status(403);
        return res.json({ message: "Only the user who created this comment can delete it.", statusCode: 403 })
    }

    await comment.destroy();

    return res.json({ message: "Deleted successfully", statusCode: 200 });
}));

module.exports = router;