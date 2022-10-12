import { getMockServer, getMockDatabase } from './MockServer';
import axios from "axios";

//const server = getMockServer();
const API_HOST = "http://localhost:4000";

let server = null

beforeEach(() => {
    server = getMockServer();
    server.listen()
})
afterEach(() => {
    server.close()
})

test('Update one user', async () => {
    let response = await axios.get(API_HOST + `/api/users/select/2`);

    let user = response.data
    user.name = "Bobby"

    response = await axios.patch(API_HOST + `/api/users/update/${user.user_id}`, user);

    response = await axios.get(API_HOST + `/api/users/select/2`);
    let newUser = response.data

    expect(newUser).toMatchObject(user)

    response = await axios.get(API_HOST + `/api/users/`);
});

test('Get all users', async () => {
    let response = await axios.get(API_HOST + `/api/users/`);

    expect(response.data).toMatchObject(getMockDatabase().users)
});

test('Get one user', async () => {
    let response = await axios.get(API_HOST + `/api/users/select/2`);

    let user = getMockDatabase().users.find( u => u.user_id === 2)

    expect(response.data).toMatchObject(user)
});

test('Post new user', async () => {
    let newUser = {"user_id":-1, "email":"peter@email.com",  "password_hash":"$argon2fakehash_peter", "name":"Peter", "join_date":null}

    let response = await axios.post(API_HOST + `/api/users/`, newUser);

    response = await axios.get(API_HOST + `/api/users/`);
    let user = response.data.find( u => u.email === "peter@email.com")

    newUser.user_id = user.user_id

    expect(user).toMatchObject(newUser)
});

test('Delete existing user', async () => {
    await axios.delete(API_HOST + `/api/users/remove/2`);

    let users = getMockDatabase().users.filter( u => u.user_id !== 2)

    let response = await axios.get(API_HOST + `/api/users/`);
    let newUsers = response.data.filter( u => u.user_id !== 2)

    expect(newUsers).toMatchObject(users)
});

test('TODO: Delete a user with posts', async () => {
    // TODO
    // Expectation:
    // - all the users posts will be delete
    // - any orhpaned posts will be removed as well
    // - parent/child references will be updated
    expect(false).toBe(true)
});

test('Update one post', async () => {
    let response = await axios.get(API_HOST + `/api/posts/2`);

    let post = response.data
    post.body = "I changed my mid about this one"

    response = await axios.patch(API_HOST + `/api/posts/${post.post_id}`, post);

    response = await axios.get(API_HOST + `/api/posts/2`);
    let newPost = response.data

    expect(newPost).toMatchObject(post)

});

test('Get all posts', async () => {
    let response = await axios.get(API_HOST + `/api/posts/`);

    expect(response.data).toMatchObject(getMockDatabase().posts)
});

test('Get one post', async () => {
    let response = await axios.get(API_HOST + `/api/posts/2`);

    let post = getMockDatabase().posts.find( p => p.post_id === 2)

    expect(response.data).toMatchObject(post)
});

test('Post new root post', async () => {
    let newPost = {
        "post_id":-1, 
        "user_id": 1, 
        "body":"this is a new root post",  
        "imageURL": null, 
        "timestamp": null, 
        "parent_id": null, 
        "children_ids": null
    }

    let response = await axios.post(API_HOST + `/api/posts/`, newPost);

    response = await axios.get(API_HOST + `/api/posts/`);
    let post = response.data.find( p => p.body === "this is a new root post")

    newPost.post_id = post.post_id

    expect(post).toMatchObject(newPost)
});

test('Post new reply post', async () => {
    let newPost = {
        "post_id":-1, 
        "user_id": 1, 
        "body":"this is a new root post",  
        "imageURL": null, 
        "timestamp": null, 
        "parent_id": 3, 
        "children_ids": null
    }

    await axios.post(API_HOST + `/api/posts/`, newPost);

    let response = await axios.get(API_HOST + `/api/posts/`);
    let post = response.data.find( p => p.body === "this is a new root post")
    newPost.post_id = post.post_id
    
    let parent = response.data.find( p => p.post_id === 3)
    expect(parent.children_ids).toMatchObject([post.post_id])


    expect(post).toMatchObject(newPost)
});

test('Delete existing post', async () => {
    await axios.delete(API_HOST + `/api/posts/2`);

    let posts = getMockDatabase().posts.filter( p => p.post_id !== 2)

    let response = await axios.get(API_HOST + `/api/posts/`);
    let newPosts = response.data.filter( p => p.post_id !== 2)

    expect(newPosts).toMatchObject(posts)
});

test('TODO: Delete a post with replies', async () => {
    // TODO
    // Expectation:
    // - any orhpaned posts will be removed as well
    // - parent/child references will be updated
    expect(false).toBe(true)
});