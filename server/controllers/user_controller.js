let user_preferences = {
    user_genres: [],
    user_pace: ''
};

module.exports = {
    getPreferences: (req, res, next) => {
        let stack = [];

        const { userid } = req.query
            , db = req.app.get('db');

        stack.push(db.user.get_genres([+userid]).then( resp => {
            // console.log('Get genres: ', resp)
            if( resp === [] ) {
                user_preferences.user_genres = []
            } else {
                resp.forEach( genre => {
                    user_preferences.user_genres.push(genre.genre_name)
                })  
            }
            console.log('User preferences after genres added: ', user_preferences)
        }).catch(err => console.log('Get Genres error: ', err)
        ))
            // resp.status(500).send(err)))

        stack.push(db.user.get_pace([+userid]).then( resp => {
            // console.log('Get pace: ', resp)
            resp.length === 0
                ? user_preferences.user_pace = ''
                : user_preferences.user_pace = resp[0].pace
        }).catch(err => console.log('Get Pace error: ', err)
            //resp.status(500).send(err)))
        ))
        Promise.all(stack).then( () => {
            res.status(200).send(user_preferences)
        }).catch(err => console.log('Promise.all error: ', err)
            //res.status(500).send(err))
        )
    },

    postPreferences: (req, res, next) => {
        let stack = [];

        const { userid } = req.query
            , { userGenrePrefs, user_pace } = req.body
            , db = req.app.get('db');
        
        userGenrePrefs.forEach( genre => {
            stack.push(db.user.post_genres([+userid, genre]).then(resp => {
                // console.log('Genre added to preferences: ', resp[0].genre_name)
                user_preferences.user_genres.push(resp[0].genre_name);
            }).catch(err => console.log('Genre added error: ', err)))
        })

        stack.push(db.user.post_pace([+userid, user_pace]).then(resp => {
            // console.log('Post pace response: ', resp)
            // console.log('User pace updated: ', resp[0].pace)
            user_preferences.user_pace = resp[0].pace;
        }).catch(err => console.log('Pace added error: ' ,err)))

        Promise.all(stack).then(result => {
            // console.log('User preferences posted : ', user_preferences)
            res.status(200).send(user_preferences)
        }).catch(err => console.log(err))
    }
}
