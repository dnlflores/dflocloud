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

    await comment.update({ content });

    return res.json(comment);
}));

// Delete a comment
router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);

    await comment.destroy();

    return res.json({ message: "Success" });
}));

module.exports = router;