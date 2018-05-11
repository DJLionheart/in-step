
module.exports = {
    getFavs: (req, res, next) => {
        const { userid } = req.query
            , db = req.app.get('db');
        
        db.favs.get_favs([+userid]).then( results => {
            console.log('Favorites retrieved from db', results[0])
            res.status(200).send(results[0])
        }).catch(err => console.log('Failed to retrieve favorites: ', err))
    },

    addFav: (req, res, next) => {
        const { track_id } = req.params
            , { userid } = req.query
            , db = req.app.get('db');

        db.favs.add_fav([+userid, +track_id]).then( result => {
            console.log('Track added to favs', result);
            res.status(200).send(result[0])
        }).catch(err => console.log('Failed to fav: ', err))
    },

    unFav: (req, res, next) => {
        const { track_id } = req.params
            , { userid } = req.query
            , db = req.app.get('db');

        db.favs.un_fav([+userid, +track_id]).then( result => {
            console.log('Track removed from favs', result);
            res.status(200).send('Track removed from favs')
        }).catch(err => console.log('Failed to fav: ', err))
    }
}