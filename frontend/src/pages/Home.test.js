import { render, screen } from '@testing-library/react';
import Home from './Home';
import {BrowserRouter, useLocation} from "react-router-dom";
import '@testing-library/jest-dom'

import { getMockServer, getMockDatabase } from '../repository/MockServer';
let server = null;
const API_HOST = "http://localhost:4000";

beforeEach(()=>{
    window.history.pushState({},"Test",'/');
    localStorage.setItem("isLoggedIn", "false")
    localStorage.setItem("currentUser", "{}")
})

// This test will pass if a logged in user is redirected to their
// profile when loading the home page
test('Logged in user sees profile page', () => {
    server = getMockServer();
    server.listen();

    localStorage.setItem("isLoggedIn","true");
    localStorage.setItem("currentUser",JSON.stringify(getMockDatabase().users[0]));

    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );

    expect(window.location.pathname).toBe("/profile")

    server.close();

});

// This test will pass if a non-logged in user is shown the landing page
test('Guest sees landing page', () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );

    //const location = useLocation();
    expect(window.location.pathname).toBe("/");


    const slogan = screen.getByText("When you're here, you're here.");
    expect(slogan).toBeInTheDocument();
});