import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import SignUp from './SignUp';
import {BrowserRouter} from "react-router-dom";
import { getMockServer } from '../repository/MockServer';
import * as UserRepo from '../repository/User';


let server = null

beforeEach(() => {
    server = getMockServer();
    server.listen()
})
afterEach(() => {
    server.close()
})
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

test('Registering a new account sends the correct info', async () => {
    render(
        <BrowserRouter>
            <SignUp />
        </BrowserRouter>
    );
    var name = screen.getByTestId("form-name");
    var pw = screen.getByTestId("form-pw");
    var email = screen.getByTestId("form-email");
    var submit = screen.getByTestId("form-submit");

    
    const registerSpy = jest.spyOn(UserRepo, 'registerUser');
    const localSpy = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');

    fireEvent.change(name, {target: {value: 'testName'}})
    fireEvent.change(pw, {target: {value: 'testPass'}})
    fireEvent.change(email, {target: {value: 'test@email.com'}})

    fireEvent.click(submit);

    await waitFor(() => expect(localSpy).toHaveBeenCalledTimes(5));

    expect(localSpy.mock.calls[0][1]).not.toBe("{}");

    console.log("=========>" + JSON.stringify(localSpy.mock.calls));        

    expect(registerSpy).toBeCalled();
    expect(localSpy).toBeCalledWith("isLoggedIn", "true");
});
