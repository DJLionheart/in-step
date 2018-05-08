module.exports = {
    getPreferences: (req, res, next) => {
        let stack = [],
            user_preferences = {};

        const { userid } = req.query
            , db = req.app.get('db');

        stack.push(db.user.get_genres([+userid]).then( resp => {
            user_preferences.user_genres = resp[0]
        }).catch(err => console.log('Get Genres error: ', err)
        ))
            // resp.status(500).send(err)))

        stack.push(db.user.get_pace([+userid]).then( resp => {
            user_preferences.user_pace = resp[0]
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
            , { genreList, userPace } = req.body
            , db = req.app.get('db');
        
        db.user.find_preferences().then(res => {
            if( res[0] === [] ){
                genreList.forEach( genre => {
                    stack.push(db.user.post_genres([+userid, genre])).then(resp => resp.sendStatus(200))
                        .catch(err => res.status(500).send(err))
                })
                stack.push(db.user.post_preferences([+userid, userPace]).then(resp => resp.sendStatus(200)))
                    .catch(err => res.status(500).send(err))
                    
                } else {
                    genreList.forEach( genre => {
                        stack.push(db.user.put_genres([+userid, genre])).then(resp => resp.sendStatus(200))
                        .catch(err => res.status(500).send(err))
                    })
                    stack.push(db.user.put_preferences([+userid, userPace])).then(resp => resp.sendStatus(200))
                    .catch(err => res.status(500).send(err))
                    
                }

                Promise.all(stack).then(result => {
                    result.status(200).send(result)
                }).catch(err => res.status(500).send(err))
        })
        
        stack.push(db.user)
        

    }
}