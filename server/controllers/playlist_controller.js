const groupBy = require('lodash/groupBy')



module.exports = {
    getPlaylists: (req, res, next) => {
        const { userid } = req.query
            , db = req.app.get('db');

        db.playlists.get_playlists([+userid]).then( results => {
            console.log(results)
            let playlists = groupBy(results, 'playlist_id')
            res.status(200).send(playlists)
        }).catch(err => console.log(err))
    },

    addSong: (req, res, next) => {
        const { id } = req.params
            , { track_id } = req.body
            , db = req.app.get('db')

        db.playlists.add_track([+id, track_id]).then( res => {
            res.sendStatus(200).catch(err => res.status(500).send(err))
        })
    }
}