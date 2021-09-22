/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

// TODO:: figure out how to test app.js since addEventListener and using window.matchMedia make testing hard
Enzyme.configure({adapter: new Adapter()});
test('renders learn react link', () => {
  //window.location = jest.fn()
  /*
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  */
});