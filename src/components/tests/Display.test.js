import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import userEvent from '@testing-library/user-event';

// Mocking fectchShow from api/fetchShow.js
import mockFetchShow from '../../api/fetchShow';

// Using mock to spy on the fetchShow file
jest.mock('../../api/fetchShow')

const testData = {
    name: 'Kriegster',
    summary: 'Im dah Best',
    seasons: [
        {
            id: 0,
            name: 'Rar',
            episodes: []
        },

        {
            id: 1,
            name: 'Meow',
            episodes: []
        }
    ]
}

test('renders without errors with no props', async () => {
    // Rendering Display
    render(<Display/>)
 });

test('renders Show component when the button is clicked ', async () => { 
    // Mocks resolved results
    mockFetchShow.mockResolvedValueOnce(testData)

    // Rendering Display
    render(<Display />)

    // Storing our button. There is only one button so we're using getByRole
    const button = screen.getByRole('button')

    // Creating a user interaction with the button
    userEvent.click(button)

    // Storing our Show app inside of a variable
    const show = await screen.findByTestId('show-container')

    // Asserting that Show has been rendered after click
    expect(show).toBeInTheDocument()
});

test('renders show season options matching your data when the button is clicked', async () => {
    // Mocking our resolved results 
    mockFetchShow.mockResolvedValueOnce(testData)

    // Rendering Display to the DOM 
    render(<Display/>)

    // Storing the button inside of a variable
    const button = screen.getByRole('button')

    // Creating a user interaction with the button
    userEvent.click(button)

    // use waitFor function to wait for the button results to appear
    await waitFor(()=>{
        // Storing the season options inside of a variable 
        const seasonOptions = screen.queryAllByTestId('season-option')

        // Asserting that the seasons show up to the DOM 2 in through props, 2 out through the App
        expect(seasonOptions).toHaveLength(2)
    })
});

test('when the fetch button is pressed, displayFunc function is called', async ()=>{
        // Mocking our resolved results 
        mockFetchShow.mockResolvedValueOnce(testData)

        //Mimicking displayFunc in the Display app
        const displayFunc = jest.fn() 

        // Rendering Display to the DOM 
        render(<Display displayFunc={displayFunc} />)
    
        // Storing the button inside of a variable
        const button = screen.getByRole('button')
    
        // Creating a user interaction with the button
        userEvent.click(button)

        await waitFor(()=>{
            // Asserting that displayFunc has been called
            expect(displayFunc).toHaveBeenCalled()
        })
})
