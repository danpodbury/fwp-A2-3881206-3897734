import { render, screen } from '@testing-library/react';
import Home from './Home';
import {BrowserRouter} from "react-router-dom";

test('renders learn react link', () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
    const slogan = screen.getByText("When you're here, you're here.");
    expect(slogan).toBeInTheDocument();
    });
