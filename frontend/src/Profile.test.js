import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';
import {BrowserRouter} from "react-router-dom";

//import * as UserRepo from './repository/User';
// import * as TimelineRepo from './repository/Timeline';

import { getMockServer } from './repository/MockServer';
const server = getMockServer();

// Setup all tests
beforeAll(() => {
    // Establish requests interception layer before all tests.
    server.listen()
})
afterAll(() => {
    // Clean up after all tests are done, preventing this
    // interception layer from affecting irrelevant tests.
    server.close()
})

// Setup each test
beforeEach(()=>{
    localStorage.setItem("isLoggedIn","true");
    localStorage.setItem("currentUser",
    '{"user_id":1,"email":"test@email.com","password_hash":"$argon2fakehash_test","name":"Tester","join_date":null}');
})
afterEach(()=>{
    localStorage.setItem("isLoggedIn","false");
    localStorage.setItem("currentUser",'{}');
})

test('Profile Loads', () => {

    render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
    );

    // are the form fields rendered?
    expect(screen.getByTestId("container-StaticProfile")).toBeInTheDocument();

    const profile_name = screen.getByText("Name: Tester");
    expect(profile_name).toBeInTheDocument();

});

// test('Profile update info', () => {

//     render(
//         <BrowserRouter>
//             <Profile />
//         </BrowserRouter>
//     );

//     // confirm static profile page state
//     expect(screen.getByTestId("container-StaticProfile")).toBeInTheDocument();
//     expect(screen.getByTestId("btn-edit")).toBeInTheDocument();

//     // navigate to profile edit view
//     fireEvent(
//         screen.getByTestId("btn-edit"),
//         new MouseEvent('click', {
//           bubbles: true,
//           cancelable: true,
//         }),
//       )

//     // confirm edit profile page state
//     expect(screen.getByTestId("container-EditProfile")).toBeInTheDocument();
//     expect(screen.getByTestId("form-name")).toBeInTheDocument();
//     expect(screen.getByTestId("form-email")).toBeInTheDocument();
//     expect(screen.getByTestId("btn-update")).toBeInTheDocument();

//     // modify the form fields
//     fireEvent.change(screen.getByTestId("form-name"), {target: {value: 'newName'}})
//     fireEvent.change(screen.getByTestId("form-email"), {target: {value: 'name@example.com'}})

//     // navigate to profile edit view
//     fireEvent(
//         screen.getByTestId("btn-update"),
//         new MouseEvent('click', {
//             bubbles: true,
//             cancelable: true,
//         }),
//         )


//     let user = JSON.parse(localStorage.getItem("currentUser"));
    
//     expect(user.name).toBe("newName");
//     expect(user.email).toBe('name@example.com');
// });

