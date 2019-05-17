const db = require('../data/dbConfig');

module.exports = {
    getGames,
    addGame,
    getGameById
}

function getGames() {
    return db('games');
}

function getGameById(id) {
    return db('games')
        .where({ id })
        .first()
}

function addGame(game) {
    console.log(game)
    return db('games')
        .insert(game)
        .then(ids => {
            console.log(ids)
            return getGameById(ids[0])
        })
}