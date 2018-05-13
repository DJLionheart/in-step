module.exports = {
    search: (req, res, next) => {
        const { type, search } = req.query
            , db = req.app.get('db');
        switch( type ) {
            case 'bpm':
                const lower = +search-5
                    , upper = +search+5;

                db.search.bpm([lower, upper]).then( results => {
                    console.log(`Searching for tracks similar to${search} BPM`)
                    res.status(200).send(results)
                }).catch(err => res.status(500).send(`Something went wrong: ${err}`))
                break;
            
            case 'track_name':
                db.search.track([`%${search}%`]).then( results => {
                    console.log(`Searching for tracks similar to: ${search}`)
                    res.status(200).send(results)
                }).catch(err => res.status(500).send(`Something went wrong: ${err}`))
                break;  
                
            case 'artist_name':
                db.search.artist([`%${search}%`]).then( results => {
                    console.log(`Searching for artists similar to: ${search}`)
                    res.status(200).send(results)
                }).catch(err => res.status(500).send(`Something went wrong: ${err}`))
                break;  
                
            case 'track_genre':
                db.search.genre([`%${search}%`]).then( results => {
                    console.log(`Searching for tracks in the Genre: ${search}`)                    
                    res.status(200).send(results)
                }).catch(err => res.status(500).send(`Something went wrong: ${err}`))
                break;  
            default:
                return null;
        }
    }
}