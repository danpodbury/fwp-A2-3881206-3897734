import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';
import {BrowserRouter} from "react-router-dom";
import axios from "axios";

import { getMockServer, getMockDatabase } from './repository/MockServer';
let server = null

const API_HOST = "http://localhost:4000";

// Setup and packdown each test
beforeEach(()=>{
    server = getMockServer();
    server.listen()

    localStorage.setItem("isLoggedIn","true");
    localStorage.setItem("currentUser",JSON.stringify(getMockDatabase().users[0]));
})
afterEach(()=>{
    server.close()
    
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

    const profile_name = screen.getByText("Name: Alice");
    expect(profile_name).toBeInTheDocument();

});

test('Profile update info', async () => {
    render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
    );

    // confirm static profile page state
    expect(screen.getByTestId("container-StaticProfile")).toBeInTheDocument();
    expect(screen.getByTestId("btn-edit")).toBeInTheDocument();

    // navigate to profile edit view
    fireEvent(
        screen.getByTestId("btn-edit"),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      )

    // confirm edit profile page state
    expect(screen.getByTestId("container-EditProfile")).toBeInTheDocument();
    expect(screen.getByTestId("form-name")).toBeInTheDocument();
    expect(screen.getByTestId("form-email")).toBeInTheDocument();
    expect(screen.getByTestId("btn-update")).toBeInTheDocument();

    // modify the form fields
    fireEvent.change(screen.getByTestId("form-name"), {target: {value: 'newName'}})
    fireEvent.change(screen.getByTestId("form-email"), {target: {value: 'name@example.com'}})

    // navigate to profile edit view
    fireEvent(
        screen.getByTestId("btn-update"),
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
        )
    
    let response = await axios.get(API_HOST + `/api/users/select/1`);

    expect(response.data.name).toBe("newName");
    expect(response.data.email).toBe('name@example.com');
});

test('Correct user posts display', async () => {
    render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
    );

    let posts = getMockDatabase().posts.filter(p => p.user_id === 1)
    
    expect(posts.length).toBe(2)

    let comments = screen.queryByTestId("comment")
    expect(comments).toHaveLength(2) 

});