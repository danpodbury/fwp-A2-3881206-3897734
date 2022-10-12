import {rest} from 'msw'
import {setupServer} from 'msw/node'

// https://testing-library.com/docs/react-testing-library/example-intro/#mock

export const getMockDatabase = () => {
    let users = [
        {"user_id":1, "email":"alice@email.com",  "password_hash":"$argon2fakehash_alice", "name":"Alice", "join_date":null},
        {"user_id":2, "email":"bob@email.com",    "password_hash":"$argon2fakehash_bob",   "name":"Bob",   "join_date":null},
        {"user_id":3, "email":"oliver@email.com", "password_hash":"$argon2fakehash_oliver","name":"Oliver","join_date":null},
        {"user_id":4, "email":"dan@email.com",    "password_hash":"$argon2fakehash_dan",   "name":"Dan",   "join_date":null}
    ]

    let posts = [
        {"post_id":1, "user_id": 1, "body":"hello this is my first post",  "imageURL": null, "timestamp":null, "parent_id":null, "children_ids":null},
        {"post_id":2, "user_id": 1, "body":"hello this is my second post", "imageURL": null, "timestamp":null, "parent_id":1, "children_ids":null},
        {"post_id":3, "user_id": 3, "body":"root post",                    "imageURL": null, "timestamp":null, "parent_id":null, "children_ids":null},
        {"post_id":4, "user_id": 4, "body":"reply",                        "imageURL": null, "timestamp":null, "parent_id":3, "children_ids":null}
    ]

    return {"users":users, "posts": posts}  
}

export const getMockServer = () => {
    let base_url = 'http://localhost:4000/api'

    let db = getMockDatabase();

    // Define mock endpoints
    return setupServer(
        //// USER ROUTES ////
        rest.get(base_url+'/users/', (req, res, ctx) => {
            return res( ctx.json( db.users ))
        }),
        rest.get(base_url+'/users/select/:id', (req, res, ctx) => {
            return res( ctx.json( db.users.find( u => u.user_id === parseInt(req.params.id)) ))
        }),
        rest.patch(base_url+'/users/update/:id', (req, res, ctx) => {
            //update user record
            db.users = db.users.map( u => {
                return u.user_id === parseInt(req.params.id) ? req.body : u;
            })

            return res( ctx.json( db.users.find( u => u.user_id === parseInt(req.params.id)) ))
        }),
        rest.get(base_url+'/users/login', (req, res, ctx) => {
            // TODO: implement pw check
            return res(ctx.json({greeting: 'hello there'}))
        }),
        rest.post(base_url+'/users/', (req, res, ctx) => {
            let max_id = db.users[db.users.length - 1].user_id
            let user = req.body
            user.user_id = max_id + 1
            db.users.push(user)
            return res(ctx.json(user))
        }),
        rest.delete(base_url+'/users/remove/:id', (req, res, ctx) => {
            db.users = db.users.filter(u => { return u.user_id !== req.params.id });
            return res(ctx.json())
        }),

        //// POST ROUTES ////
        rest.get(base_url+'/posts/', (req, res, ctx) => {
            return res( ctx.json( db.posts ))
        }),
        rest.get(base_url+'/posts/:id', (req, res, ctx) => {
            return res( ctx.json( db.posts.find( p => p.post_id === parseInt(req.params.id)) ))
        }),
        rest.patch(base_url+'/posts/:id', (req, res, ctx) => {
            //update user record
            db.posts = db.posts.map( p => {
                return p.post_id === parseInt(req.params.id) ? req.body : p;
            })

            return res( ctx.json( db.posts.find( p => p.post_id === parseInt(req.params.id)) ))
        }),
        rest.post(base_url+'/posts/', (req, res, ctx) => {
            let max_id = db.posts[db.posts.length - 1].post_id
            let post = req.body
            post.post_id = max_id + 1

            // if this is a reply we need to update the parent.children_ids
            if (post.parent_id !== null){

                // find the parent
                let parent = db.posts.find( p => p.post_id === post.parent_id)                
                if (parent !== null){
                    // add the new post as a child id
                    if (parent.children_ids === null) { parent.children_ids = []}
                    parent.children_ids.push(post.post_id)

                    // update parent post in db
                    db.posts = db.posts.map( p => {
                        return (p.post_id === post.parent_id) ? parent : p;
                    })
                }
            }
            // add this new post to db
            db.posts.push(post)
            return res(ctx.json(post))
        }),
        rest.delete(base_url+'/posts/:id', (req, res, ctx) => {
            db.posts = db.posts.filter(p => { return p.post_id !== req.params.id });
            return res(ctx.json())
        }),
    )
}

