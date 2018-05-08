const groupBy = require('lodash/groupBy')



module.exports = {
    getPlaylists: (req, res, next) => {
        const { userid } = req.query
            , db = req.app.get('db');

        db.playlists.get_playlists([+userid]).then( results => {
            let playlists = groupBy(results, 'playlist_id')
            console.log('Group by playlist_id: ', playlists)

            let playlistContainer = [];

            let playlist_separator = Object.values(playlists);

            playlist_separator.forEach( (playlist, i) => {
                playlistContainer.push({
                    playlist_id: playlist[0].playlist_id,
                    playlist_name: playlist[0].playlist_name,
                    playlist_index: i, 
                    tracks: []
                })
                playlist.forEach( track => {
                    let {playlist_id, playlist_name, ...rest} = track
                    playlistContainer[i].tracks.push(rest)
                }) 

            })
            console.log('Playlist container after nested forEach: ', playlistContainer)
            // for( var i in playlists ) {
            //     console.log(property)
            //     let playlist = playlist[i].map( element => element)
            //     playlistContainer.push(playlist);
            //     console.log('New Playlist: ', playlist)
            // }
            res.status(200).send(playlistContainer)
        }).catch(err => res.status(500).send(err))
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