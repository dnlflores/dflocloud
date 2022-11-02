const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const commentsRouter = require('./comments.js');
const albumsRouter = require('./albums.js');
const playlistsRouter = require('./playlists.js')
const { restoreUser } = require('../../utils/auth.js');
const { Song, Playlist, User, PlaylistSong } = require('../../db/models');
const { Op } = require('sequelize');

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/comments', commentsRouter);
router.use('/albums', albumsRouter);
router.use('/playlists', playlistsRouter);

// this is a test route to set the cookie!
router.get('/csrf/restore', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send({ 'XSRF-TOKEN': req.csrfToken() });
});

router.get('/search', asyncHandler(async (req, res) => {
    const { term } = req.query;

    const matchedSongs = process.env.NODE_ENV === 'production' ?

        await Song.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.iLike]: `%${term}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${term}%`
                        }
                    }
                ]
            },
            include: [{ model: User, as: 'Artist' }]
        }) :
        await Song.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.substring]: term
                        }
                    },
                    {
                        description: {
                            [Op.substring]: term
                        }
                    }
                ]
            },
            include: [{ model: User, as: 'Artist' }]
        });

    const matchedPlaylists = process.env.NODE_ENV === 'production' ?

        await Playlist.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${term}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${term}%`
                        }
                    }
                ]
            },
            include: [{ model: Song, include: { model: User, as: 'Artist' } }, User]
        }) :
        await Playlist.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: term
                        }
                    },
                    {
                        description: {
                            [Op.substring]: term
                        }
                    }
                ]
            },
            include: [{ model: Song, include: { model: User, as: 'Artist' } }, User]
        });

    let playlistOrder = [];
    if (matchedPlaylists.length) {
        playlistOrder = await PlaylistSong.scope('order').findAll({ order: [['index', 'ASC']] });
    }

    return res.json({ songs: matchedSongs, playlists: { matchedPlaylists, order: playlistOrder } });
}))

module.exports = router;