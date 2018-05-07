const forEach = require('lodash/forEach')

module.exports = {
    getPlaylists: (req, res, next) => {
        const { userid } = req.query
            , db = req.app.get('db');

        db.playlists.get_playlists([+userid]).then( results => {
            console.log(results)
        })
    }
}