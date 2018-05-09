const groupBy = require('lodash/groupBy')


module.exports = {
    getPlaylists: (req, res, next) => {
        const { userid } = req.params
            , db = req.app.get('db');

        db.playlists.get_pl_data([+userid]).then( playlist_data => {
            console.log('Playlists: ', playlist_data);
            let playlistContainer = [];

            playlist_data.forEach( (playlist, i) => {
                const { playlist_id, playlist_name } = playlist;
                playlistContainer.push({
                    playlist_id,
                    playlist_name,
                    playlist_index: i,
                    tracks: []
                }) 
            console.log('Retrieved playlists: ', playlistContainer)
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
        
        // db.playlists.get_playlists([+userid]).then( results => {
        //     let playlists = groupBy(results, 'playlist_id')


        //     let playlist_separator = Object.values(playlists);

        //     playlist_separator.forEach( (playlist, i) => {
        //         playlistContainer.push({
        //             playlist_id: playlist[0].playlist_id,
        //             playlist_name: playlist[0].playlist_name,
        //             playlist_index: i, 
        //             tracks: []
        //         })
        //         playlist.forEach( track => {
        //             let {playlist_id, playlist_name, ...rest} = track
        //             playlistContainer[i].tracks.push(rest)
        //         }) 

        //     })

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
            console.log('Playlist created: ', resp)
            res.status(200).send('Playlist created!')
    
        }).catch(err => console.log('Playlist creation failed: ', err))
    },

    delete_playlist: (req, res, next) => {
        const { userid } = req.params
            , { playlist_id } = req.query
            , db = req.app.get('db');

        db.playlists.get_playlists([+userid]).then( results => {
            let plMatch = [];

            results.forEach( (trackObj, i) => {
                if( +trackObj.playlist_id === playlist_id ) {
                    plMatch.push(i)
                    console.log('match found')
                }
            })
            plMatch
                ? (
                    db.playlists.delete_playlist([+playlist_id])
                        .then( () => res.status(200).send('Playlist deleted'))
                        .catch(err => console.log('Delete error: ', err))
                )
                : res.sendStatus(401)
            
        })
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