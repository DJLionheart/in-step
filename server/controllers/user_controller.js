module.exports = {
    postPreferences: (req, res, next) => {
        let stack = []
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