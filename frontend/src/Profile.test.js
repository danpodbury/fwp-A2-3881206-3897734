import { render, screen, fireEvent } from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Profile from './Profile';
import {BrowserRouter} from "react-router-dom";

// import * as UserRepo from './repository/User';
// import * as TimelineRepo from './repository/Timeline';

// https://testing-library.com/docs/react-testing-library/example-intro/#mock
let base = '/api/users'
const server = setupServer(
    rest.get(base+'/', (req, res, ctx) => {
        return res(ctx.json({greeting: 'hello there'}))
    }),
    rest.get(base+'/select/:id', (req, res, ctx) => {
        return res(ctx.json({greeting: 'hello there'}))
    }),
    rest.patch(base+'/update/:id', (req, res, ctx) => {
        return res(ctx.json({greeting: 'hello there'}))
    }),
    rest.get(base+'/login', (req, res, ctx) => {
        return res(ctx.json({greeting: 'hello there'}))
    }),
    rest.post(base+'/', (req, res, ctx) => {
        return res(ctx.json({greeting: 'hello there'}))
    }),
    
)
beforeAll(() => {
    // Establish requests interception layer before all tests.
    server.listen()
})
beforeEach(()=>{
    localStorage.setItem("isLoggedIn","true");
    localStorage.setItem("currentUser",
    '{"user_id":1,"email":"test@email.com","password_hash":"$argon2fakehash","name":"Tester","join_date":null}');
})
afterAll(() => {
    // Clean up after all tests are done, preventing this
    // interception layer from affecting irrelevant tests.
    server.close()
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
    //expect(screen.getByTestId("container-EditProfile")).toBeInTheDocument();

    const profile_name = screen.getByText("Name: Tester");
    expect(profile_name).toBeInTheDocument();

});

test('Profile update info', () => {

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


    let user = JSON.parse(localStorage.getItem("currentUser"));
    
    expect(user.name).toBe("newName");
    expect(user.email).toBe('name@example.com');
    // '{"user_id":1,"email":"test@email.com","password_hash":"$argon2id$v=19$m=4096,t=3,p=1$B6F+d6C5VodOI8+V4iIN0A$7kruFkoQjlHauM5l7TVkC1QLLLm+dW57RxSex/rN9vI","name":"Tester","join_date":null}');


});

