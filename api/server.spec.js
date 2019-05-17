const request = require('supertest');
const db = require('../data/dbConfig');

const Games = require('../games/games-model');

const server = require('./server');

describe('server', () => {
    it('should return an OK status code', () => {
        return request(server).get('/').expect(200);
    })
})

describe('games', () => {
    
    afterEach(async () => {
        await db('games').truncate();
    })

    describe('GET / games', () => {
        it('should return an OK status code', () => {
            return request(server).get('/api/games').expect(200);
        })

        it('should return a JSON object (list of games)', () => {
            return request(server).get('/api/games').then(res => {
                expect(res.type).toBe('application/json');
            })
        })

        it('should always return an array even if no games in database', () => {
            return request(server).get('/api/games').then(res => {
                expect(res.body).toEqual(expect.any(Array));
            })
        })
    })

    describe('POST / games', () => {
        it('should return status code 422 if any game information is missing', async () => {
            const game = { genre: 'test' };
            const res = await request(server)
                .post('/api/games')
                .send(game)
                expect(res.status).toBe(422);
        })

        it('should return status code 200 when game added sucessfully', async () => {
            const game = { title: 'game', genre: 'genre', releaseYear: 1980 };
            const res = await request(server)
                .post('/api/games')
                .send(game)
                expect(res.status).toBe(200)
        })

        it('should return JSON object when new game has been successfully added', async () => {
            const game = { title: 'test', genre: 'test', releaseYear: 1980 };
            const res = await request(server)
                .post('/api/games')
                .send(game)
                expect(res.type).toBe('application/json');
        })

        it('should insert provided user, return length of array', async () => {
            let game = await Games.addGame({ title: 'test', genre: 'test', releaseYear: 1980 });
            expect(game.title).toBe('test');
        
            game = await Games.addGame({ title: 'test2', genre: 'test', releaseYear: 1990 });
            expect(game.title).toBe('test2');

            const games = await db('games');
            expect(games).toHaveLength(2);
        })
    })
})