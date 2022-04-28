import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

// Making Dummy data for Episode prop
const testData = {
    image: null,
    summary: 'Something Neat'
}

test("renders without error", () => {
    // Rendering episode
    render(<Episode episode={testData}/>)
});

test("renders the summary test passed as prop", () => {
    // Rendering Episode with the prop
    render(<Episode episode={testData}/>)

    // Storing the value I'm searching for inside a variable
    const summary = screen.queryByText('Something Neat', { exact: true })

    // Asserting that it exists
    expect(summary).toBeInTheDocument()
    expect(summary).toBeVisible()
    expect(summary).toBeTruthy()
    expect(summary).toBeValid()
    expect(summary).toHaveTextContent('Something Neat')

});

test("renders default image when image is not defined", () => {
    // Rendering Episode to the dom
    render(<Episode episode={testData}/>)

    // Finding and Storing Image value inside of a variable
    // When using queries use index
    const image = screen.queryAllByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')
    // console.log(image)

    // Asserting that image is in the Dom
    expect(image[0]).toHaveAttribute('alt', 'https://i.ibb.co/2FsfXqM/stranger-things.png')
});
