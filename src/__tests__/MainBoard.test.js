/**
 * @jest-environment jsdom
 */
import React from 'react';
import { MainBoard } from '../components/MainBoard';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

Enzyme.configure({adapter: new Adapter()});

let main_board_props;

beforeEach(() => {
    main_board_props = {
        isMobile: false,
        hideMobileNav: jest.fn()
    };
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('rendering components', () => {
    test('rendering MainBoard', () => {
        Enzyme.shallow(
            <MainBoard
                {...main_board_props}
            />
        );
    });
});

describe('passing props', () => {
    test('MainBoard passing props', () => {
        const wrapper = Enzyme.mount(
            <MainBoard
                {...main_board_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(typeof wrapper.props().hideMobileNav === typeof jest.fn()).toBe(true);
    });
});
// TODO:: verify all logic for inputs (Min bounds, max bounds, etc.) 
// TODO:: show when started does change from MenuBoard to MainBoard component
describe('logic', () => {})

describe('snapshots', () => {
    test('renders MainBoard containing MenuBoard component when started is false', () => {
        const wrapper = Enzyme.shallow(
            <MainBoard
                {...main_board_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders MainBoard containing StudyBoard when started is true', () => {
        const wrapper = Enzyme.shallow(
            <MainBoard
                {...main_board_props}
            />
        );
        wrapper.setState({
            started: true
        })
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})