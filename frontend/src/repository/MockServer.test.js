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
    let response = await axios.post(API_HOST + `/api/users/select/2`);

    let user = getMockDatabase().users.find( u => u.user_id === 2)

    expect(response.data).toMatchObject(user)
});

test('Delete existing user', async () => {
    let response = await axios.delete(API_HOST + `/api/users/2`);

    let user = getMockDatabase().users.find( u => u.user_id === 2)

    expect(response.data).toMatchObject(user)
});
