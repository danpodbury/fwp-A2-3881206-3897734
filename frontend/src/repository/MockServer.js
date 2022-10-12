import {rest} from 'msw'
import {setupServer} from 'msw/node'

// https://testing-library.com/docs/react-testing-library/example-intro/#mock

export const getMockServer = (db) => {
    let base_url = 'http://localhost:4000/api'

    // get default mockc db if none provided
    if (db === undefined){
        db = getMockDatabase()
    }

    // Define mock endpoints
    return setupServer(
        rest.get(base_url+'/users/', (req, res, ctx) => {
            return res( ctx.json( db.users ))
        }),

        rest.get(base_url+'/users/select/:id', (req, res, ctx) => {
            return res( ctx.json( db.users.find( u => u.user_id === parseInt(req.params.id)) ))
        }),

        rest.patch(base_url+'/users/update/:id', (req, res, ctx) => {
            // todo: update store
            return res(ctx.json(req.body))
        }),

        rest.get(base_url+'/users/login', (req, res, ctx) => {
            return res(ctx.json({greeting: 'hello there'}))
        }),

        rest.post(base_url+'/users/', (req, res, ctx) => {
            return res(ctx.json({greeting: 'hello there'}))
        }),
        
    )
}

export const getMockDatabase = () => {
    let users = [
        {"user_id":1, "email":"alice@email.com",  "password_hash":"$argon2fakehash_alice", "name":"Alice", "join_date":null},
        {"user_id":2, "email":"bob@email.com",    "password_hash":"$argon2fakehash_bob",   "name":"Bob",   "join_date":null},
        {"user_id":3, "email":"oliver@email.com", "password_hash":"$argon2fakehash_oliver","name":"Oliver","join_date":null},
        {"user_id":4, "email":"dan@email.com",    "password_hash":"$argon2fakehash_dan",   "name":"Dan",   "join_date":null}
    ]

    let posts = []

    return {"users":users, "posts": posts}
}
