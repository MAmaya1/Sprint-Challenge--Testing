const router = require('express').Router();
const Games = require('../games/games-model');

// Get games

router.get('/', (req, res) => {
    Games.getGames()
        .then(games => {
            res.status(200).json(games)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Games could not be retrieved from database.' })
        })
})

// Add new game

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.genre) {
        res.status(422).json({ errorMessage: 'New games require a title and genre.' })
    } else {
        Games.addGame(req.body)
            .then(game => {
                res.status(200).json(game)
            })
            .catch(err => {
                res.status(500).json({ error: err, message: 'This game already exists in the database.'})
            })
    }
})

module.exports = router;