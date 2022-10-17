import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

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
    var name = screen.getByTestId("form-name");
    var pw = screen.getByTestId("form-pw");
    var email = screen.getByTestId("form-email");
    var title = screen.getByText("Create Account");

    expect(name).toBeInTheDocument();
    expect(pw).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(title).toBeInTheDocument();

});

// test('Registering a new account sends the correct info', () => {
//     render(
//         <BrowserRouter>
//             <SignUp />
//         </BrowserRouter>
//     );

//     //fireEvent.click(screen.getByText('Create Account'))
//     // todo: this test
// });
