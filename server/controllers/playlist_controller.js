const groupBy = require('lodash/groupBy')


module.exports = {
    getPlaylists: (req, res, next) => {
        const { userid } = req.params
            , db = req.app.get('db');

        db.playlists.get_pl_data([+userid]).then( playlist_data => {
            // console.log('Playlists: ', playlist_data);
            let playlistContainer = [];

            playlist_data.forEach( (playlist, i) => {
                const { playlist_id, playlist_name } = playlist;
                playlistContainer.push({
                    playlist_id,
                    playlist_name,
                    playlist_index: i,
                    tracks: []
                }) 
            // console.log('Retrieved playlists: ', playlistContainer)
            } );

            db.playlists.get_pl_tracks([+userid]).then( tracks => {
                playlistContainer.forEach( playlist => {
                    tracks.forEach( track => {
                        if( playlist.playlist_id === track.playlist_id ) {
                            const {playlist_id, playlist_name, ...rest} = track;
                            playlist.tracks.push(rest)

                        }
                    })
                })
                res.status(200).send(playlistContainer)
            }).catch(err => console.log('Playlist spreading failed: ', err))
        })
    },
            // More efficient way to loop through object: 

            // for( var i in playlists ) {
            //     console.log(property)
            //     let playlist = playlist[i].map( element => element)
            //     playlistContainer.push(playlist);
            //     console.log('New Playlist: ', playlist)
            // }
        //     res.status(200).send(playlistContainer)
        // }).catch(err => res.status(500).send(err))

    create_playlist: (req, res, next) => {
        const { userid } = req.params
            , { playlist_name } = req.body
            , db = req.app.get('db');

        db.playlists.create_playlist([+userid, playlist_name]).then( resp => {
            console.log(`Playlist with name of ${playlist_name}created: `, resp)
            res.status(200).send(resp[0])
    
        }).catch(err => console.log('Playlist creation failed: ', err))
    },

    rename_playlist: (req, res, next) => {
        const { playlist_id } = req.params
            , { newName } = req.body
            , db = req.app.get('db');

        db.playlists.rename_playlist([newName, +playlist_id])
    },

    delete_playlist: (req, res, next) => {
        const { playlist_id } = req.params
            , db = req.app.get('db')
            , dl_plId = +playlist_id

    db.playlists.delete_playlist([dl_plId])
        .then( () => res.status(200).send(`Playlist ${playlist_id} deleted`))
        .catch(err => console.log('Delete playlist error: ', err))   
    },

    addSong: (req, res, next) => {
        const { playlist_id } = req.params
            , { track_id } = req.body
            , db = req.app.get('db')
        
            let plId = +playlist_id

        db.playlists.add_track([plId, track_id]).then( resp => {
            console.log(`Track ${track_id} added to playlist ${playlist_id}`)
            res.status(200).send(resp[0])
        }).catch(err => console.log('Add song error: ', err))
    },

    removeSong: (req, res, next) => {
        const { playlist_id } = req.params
            , { track_num } = req.query
            , db = req.app.get('db')

        db.playlists.remove_track([+playlist_id, +track_num]).then( resp => {
            res.status(200).send(`Track ${track_num} removed from playlist ${playlist_id}`)
        }).catch(err => console.log('Remove song error: ', err))
    },

    delete_all_tracks: (req, res, next) => {
        const { playlist_id } = req.params
            , db = req.app.get('db')

        let id_to_clear = +playlist_id

        db.playlists.delete_all_tracks([id_to_clear]).then( resp => {
            res.status(200).send(`All tracks removed from playlist ${playlist_id}`)
        }).catch(err => console.log('Remove all error: ', err))
    },


}