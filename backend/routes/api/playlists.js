const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Op } = require('sequelize');
const { Song, Album, User, Playlist, PlaylistSong } = require('../../db/models');

const router = express.Router();

const validatePlaylist = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 50 })
        .withMessage('Please provide a name with at least 4 characters and less than 50 characters.'),
    handleValidationErrors
];

// Get all playlists 
router.get('/', asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll({ include: [{ model: Song, include: [{ model: User, as: 'Artist' }] }, User] });

    const playlistsOrders = await PlaylistSong.scope('order').findAll({ order: [['index', 'ASC']] });

    return res.json({ playlists, orders: playlistsOrders });
}))

// Get playlists by the current user
router.get('/me', requireAuth, asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll({ where: { userId: { [Op.eq]: req.user.id } }, include: [{ model: Song, include: [{ model: User, as: 'Artist' }] }, User] });

    const playlistsOrders = await PlaylistSong.scope('order').findAll({ order: [['index', 'ASC']] });

    return res.json({ playlists, orders: playlistsOrders });
}));

// Get specified playlist
router.get('/:id', asyncHandler(async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id, {
        include: [{ model: Song, include: { model: User, as: 'Artist' } }, User]
    });

    const playlistOrder = await PlaylistSong.scope('order').findAll({
        where: {
            playlistId: playlist.id
        },
        order: [['index', 'ASC']]
    });

    if (!playlist) {
        res.status(404);
        return res.json({ message: "Playlist not found.", statusCode: 404 })
    }

    return res.json({ playlist, order: playlistOrder });
}));

// Create a playlist
router.post('/', requireAuth, singleMulterUpload("image"), validatePlaylist, asyncHandler(async (req, res) => {
    const { name, description, imageUrl } = req.body;
    const picUrl = req.file ? await singlePublicFileUpload(req.file) : imageUrl ? imageUrl : `https://us.123rf.com/450wm/motismotis/motismotis1805/motismotis180500005/102159464-retro-background-futuristic-landscape-1980s-style-digital-retro-landscape-cyber-surface-retro-music-.jpg`;

    const playlist = await Playlist.create({
        userId: req.user.id,
        name,
        previewImage: picUrl,
        description
    });

    const createdPlaylist = await Playlist.findByPk(playlist.id, { include: [Song, User] });

    return res.json(createdPlaylist);
}));

// Add a song to a playlist
router.post('/:id', requireAuth, asyncHandler(async (req, res) => {
    const songId = req.body.songId;
    const playlistId = req.params.id;
    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist) {
        res.status(404);
        return res.json({ message: "Playlist not found.", statusCode: 404 });
    }

    if (!song) {
        res.status(404);
        return res.json({ message: "Song not found.", statusCode: 404 });
    }

    if (req.user.id !== playlist.userId) {
        res.status(403);
        return res.json({ message: "Only the owner of the playlist may add songs to the playlist.", statusCode: 403 });
    }

    const existingSong = await PlaylistSong.findOne({
        where: {
            songId: {
                [Op.eq]: songId
            },
            playlistId: {
                [Op.eq]: playlistId
            }
        }
    });

    if (existingSong) {
        res.status(403);
        return res.json({ message: "Song is already in the playlist", statusCode: 403 });
    }

    const playlistIndex = await PlaylistSong.max('index', { where: { playlistId } });

    const addSong = await PlaylistSong.create({
        songId,
        playlistId,
        index: playlistIndex + 1
    });

    return res.json({ id: addSong.id, songId, playlistId, song });
}));

// Add multiple songs to a playlist 
router.post('/:id', requireAuth, asyncHandler(async (req, res) => {

}));

// Remove a song to a playlist
router.delete('/:id/song', requireAuth, asyncHandler(async (req, res) => {
    const songId = req.body.songId;
    const playlistId = req.params.id;
    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist) {
        res.status(404);
        return res.json({ message: "Playlist not found.", statusCode: 404 });
    }

    if (!song) {
        res.status(404);
        return res.json({ message: "Song not found.", statusCode: 404 });
    }

    if (req.user.id !== playlist.userId) {
        res.status(403);
        return res.json({ message: "Only the owner of the playlist may remove songs from the playlist.", statusCode: 403 });
    }

    const removeSong = await PlaylistSong.findOne({
        where: {
            songId: {
                [Op.eq]: songId
            },
            playlistId: {
                [Op.eq]: playlistId
            }
        }
    });

    if (!removeSong) {
        res.status(404);
        return res.json({ message: "Song does not exist in the playlist.", statusCode: 404 });
    }

    await removeSong.destroy();

    return res.json({ message: "Song removed from playlist", statusCode: 200 });
}));

// Edit a playlist
router.patch('/:id', requireAuth, singleMulterUpload("image"), validatePlaylist, asyncHandler(async (req, res) => {
    const { name, image, description } = req.body;
    const playlist = await Playlist.findByPk(req.params.id, {
        include: [{ model: Song, include: { model: User, as: 'Artist' } }, User]
    });

    if (!playlist) {
        res.status(404);
        return res.json({ message: "Playlist not found.", statusCode: 404 });
    }

    if (req.user.id !== playlist.userId) {
        res.status(403);
        return res.json({ message: "Only the owner of the playlist can edit the playlist.", statusCode: 403 });
    }

    const picUrl = image ? image : await singlePublicFileUpload(req.file);

    await playlist.update({
        name,
        description,
        previewImage: picUrl
    })

    return res.json(playlist);
}));

// Delete a playlist
router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);

    if (!playlist) {
        res.status(404);
        return res.json({ message: "Playlist not found.", statusCode: 404 });
    }

    if (req.user.id !== playlist.userId) {
        res.status(403);
        return res.json({ message: "Only the owner of the playlist can delete the playlist.", statusCode: 403 });
    }

    // const playlistSongs = await PlaylistSong.findAll({ where: { playlistId: playlist.id } });

    // if (playlistSongs.length) {
    //     const ids = playlistSongs.map(playlistSong => playlistSong.id)
    //     await PlaylistSong.destroy({ where: { id: ids } });
    // }

    await playlist.destroy();

    return res.json({ message: "Deleted successfully", statusCode: 200 });
}));

module.exports = router;