const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Comment } = require('../../db/models');
const { Op } = require('sequelize/types');

const router = express.Router();

const validateComment = [
    check('content')
        .exists({ checkFalsy: true })
        .isLength({ min: 10, max: 300 })
        .withMessage('Content must be at least 10 characters and less than 300 characters.'),
    handleValidationErrors
];

// Get comments for a song
router.get('/:id', asyncHandler(async (req, res) => {
    const comments = await Comment.findAll({
        where: {
            songId: { [Op.eq]: req.params.id }
        }
    });

    return res.json(comments);
}));

// Create comment for a song
router.post('/:id', validateComment, asyncHandler(async(req, res) => {
    const { content, userId } = req.body;

    const newComment = await Comment.create({
        userId,
        content,
        songId: req.params.id
    });

    return res.json(newComment);
}));

// Delete a comment
router.delete('/:id', asyncHandler(async(req, res) => {
    const comment = await Comment.findByPk(req.params.id);

    await comment.destroy();

    return res.json({message: "Success"});
}));

module.exports = router;