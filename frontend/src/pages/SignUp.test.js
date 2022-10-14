import { render, screen, fireEvent } from '@testing-library/react';
// import {rest} from 'msw'
// import {setupServer} from 'msw/node'
import SignUp from './SignUp';
import {BrowserRouter} from "react-router-dom";

// https://testing-library.com/docs/react-testing-library/example-intro/#mock
// const server = setupServer(
//     rest.get('/greeting', (req, res, ctx) => {
//         return res(ctx.json({greeting: 'hello there'}))
//     }),
// )

test('SignUp pages loads', () => {
    render(
        <BrowserRouter>
            <SignUp />
        </BrowserRouter>
    );

    // are the form fields rendered?
    expect(screen.getByTestId("form-name")).toBeInTheDocument();
    expect(screen.getByTestId("form-pw")).toBeInTheDocument();
    expect(screen.getByTestId("form-email")).toBeInTheDocument();
    expect(screen.getByText("Create Account")).toBeInTheDocument();

});

test('Registering a new account sends the correct info', () => {
    render(
        <BrowserRouter>
            <SignUp />
        </BrowserRouter>
    );

    //fireEvent.click(screen.getByText('Create Account'))
    // todo: this test
});
