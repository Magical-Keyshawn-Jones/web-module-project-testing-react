import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Show from './../Show';

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

test('renders without errors', () => {
    // Rendering Show
    render(<Show/>)
});

test('renders Loading component when prop show is null', () => {
    // Rendering Show 
    render(<Show show={null}/>)

    // Finding the Loading component
    // When using queries use Index
    const loading = screen.queryAllByTestId('loading-container')

    // Asserting the Loading Component will be in the DOM
    expect(loading[0]).toBeInTheDocument()
});

test('renders same number of options seasons are passed in', () => { 
    // Rendering Show to the DOM
    render(<Show show={testData} selectedSeason={'none'}/>)

    // Storing the test ids in a variable
    const optionsSeasons = screen.queryAllByTestId('season-option')

    // Asserting options Seasons will be in the DOM
    // Using Length because query returns an array and expecting 2 seasons in through props 2 seasons out in the app 
    expect(optionsSeasons).toHaveLength(2)
});

test('handleSelect is called when an season is selected', () => {
    // Mocking handleSelect
    const handleSelect = jest.fn()

    // Rendering Show to the DOM    
    render(<Show show={testData} handleSelect={handleSelect} selectedSeason={'none'}/>)

    // Storing the select button 
    const select = screen.getByLabelText(/Select A Season/i)

    // Firing a user event to use select 
    userEvent.selectOptions(select, ['1'])

    // Asserting the handleSelect is called 
    expect(handleSelect).toBeCalled()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    // Rendering Show app and Defining Rerender
    const { rerender } = render(<Show show={testData} selectedSeason={'none'} />)
    
    // Storing our episodes in a variable
    // This query holds all of our episodes
    const episodes = screen.queryByTestId('episodes-container')

    // Asserting that show renders with no seasons 
    expect(episodes).not.toBeInTheDocument()

    // Rerender our Show to have show be visible in the DOM
    // After rerender you have to redefine the variables so 'let' would be very useful in rerendering
    rerender(<Show show={testData} selectedSeason={1} />)

    // Redefining newEpisodes
    const newEpisodes = screen.queryByTestId('episodes-container')


    // Asserting episodes will now show up in the DOM
    expect(newEpisodes).toBeInTheDocument();
});
