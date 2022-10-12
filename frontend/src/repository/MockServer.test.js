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

// test('Update one user', async () => {
//     let response = await axios.get(API_HOST + `/api/users/select/2`);

//     let user = response.data
//     user.name = "Bobby"

//     response = await axios.patch(API_HOST + `/api/users/update/${user.user_id}`, user);

//     response = await axios.get(API_HOST + `/api/users/select/2`);
//     let newUser = response.data

//     expect(newUser).toMatchObject(user)

//     response = await axios.get(API_HOST + `/api/users/`);
// });

// test('Get all users', async () => {
//     let response = await axios.get(API_HOST + `/api/users/`);

//     expect(response.data).toMatchObject(getMockDatabase().users)
// });

// test('Get one user', async () => {
//     let response = await axios.get(API_HOST + `/api/users/select/2`);

//     let user = getMockDatabase().users.find( u => u.user_id === 2)

//     expect(response.data).toMatchObject(user)
// });

// test('Post new user', async () => {
//     let newUser = {"user_id":-1, "email":"peter@email.com",  "password_hash":"$argon2fakehash_peter", "name":"Peter", "join_date":null}

//     let response = await axios.post(API_HOST + `/api/users/`, newUser);

//     response = await axios.get(API_HOST + `/api/users/`);
//     let user = response.data.find( u => u.email === "peter@email.com")

//     newUser.user_id = user.user_id

//     expect(user).toMatchObject(newUser)
// });

// test('Delete existing user', async () => {
//     await axios.delete(API_HOST + `/api/users/remove/2`);

//     let users = getMockDatabase().users.filter( u => u.user_id !== 2)

//     let response = await axios.get(API_HOST + `/api/users/`);
//     let newUsers = response.data.filter( u => u.user_id !== 2)

//     expect(newUsers).toMatchObject(users)
// });

test('Update one post', async () => {
    // let response = await axios.get(API_HOST + `/api/users/select/2`);

    // let user = response.data
    // user.name = "Bobby"

    // response = await axios.patch(API_HOST + `/api/users/update/${user.user_id}`, user);

    // response = await axios.get(API_HOST + `/api/users/select/2`);
    // let newUser = response.data

    // expect(newUser).toMatchObject(user)

    // response = await axios.get(API_HOST + `/api/users/`);
});

test('Get all posts', async () => {
    let response = await axios.get(API_HOST + `/api/posts/`);

    expect(response.data).toMatchObject(getMockDatabase().users)
});

test('Get one post', async () => {
    // let response = await axios.get(API_HOST + `/api/users/select/2`);

    // let user = getMockDatabase().users.find( u => u.user_id === 2)

    // expect(response.data).toMatchObject(user)
});

test('Post new post', async () => {
    // let newUser = {"user_id":-1, "email":"peter@email.com",  "password_hash":"$argon2fakehash_peter", "name":"Peter", "join_date":null}

    // let response = await axios.post(API_HOST + `/api/users/`, newUser);

    // response = await axios.get(API_HOST + `/api/users/`);
    // let user = response.data.find( u => u.email === "peter@email.com")

    // newUser.user_id = user.user_id

    // expect(user).toMatchObject(newUser)
});

test('Delete existing post', async () => {
    // await axios.delete(API_HOST + `/api/users/remove/2`);

    // let users = getMockDatabase().users.filter( u => u.user_id !== 2)

    // let response = await axios.get(API_HOST + `/api/users/`);
    // let newUsers = response.data.filter( u => u.user_id !== 2)

    // expect(newUsers).toMatchObject(users)
});