/**
 * @jest-environment jsdom
 */
import React from 'react';
import { MainBoard } from '../components/MainBoard';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import fetch_mock, { spy } from 'fetch-mock';
import { StudyBoard } from '../components/StudyBoard';

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
    fetch_mock.restore()
});

describe('rendering components', () => {
    test('rendering MainBoard', () => {
        shallow(
            <MainBoard
                {...main_board_props}
            />
        );
    });
});

describe('passing props', () => {
    test('MainBoard passing props', () => {
        const wrapper = mount(
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
describe('logic', () => {
    test('test maxBound changes due to minBound on input', () => {
        const wrapper = mount(
            <MainBoard
                {...main_board_props}
            />
        );
        const min_bound = wrapper.find('#min-bound');
        const max_bound = wrapper.find('#max-bound');
        min_bound.simulate('change', {target: {value: '-1'}});
        expect(wrapper.instance().state.minBound).toBe('-1');
        expect(wrapper.instance().state.maxBound).toBe('10');
        // test that max bound value goes up by one if min changes
        min_bound.simulate('change', {target: {value: '11'}});
        expect(wrapper.instance().state.minBound).toBe('11');
        expect(wrapper.instance().state.maxBound).toBe('12');
        min_bound.simulate('change', {target: {value: '12'}});
        expect(wrapper.instance().state.minBound).toBe('12');
        expect(wrapper.instance().state.maxBound).toBe('12');
        // test that max bount will go up after blur when max is less than min
        max_bound.simulate('change', {target: {value: '4'}});
        max_bound.simulate('blur');
        expect(wrapper.instance().state.maxBound).toBe('13');
    });
    test('test invalid characters and bounds', () => {
        const wrapper = mount(
            <MainBoard
                {...main_board_props}
            />
        );
        const min_bound = wrapper.find('#min-bound');
        const max_bound = wrapper.find('#max-bound');
        const how_many = wrapper.find('#how-many');
        const decimal_select = wrapper.find({name: 'decimal'});
        // test invalid inputs
        min_bound.simulate('change', {target: {value: 'f'}});
        max_bound.simulate('change', {target: {value: 'f'}});
        how_many.simulate('change', {target: {value: 'f'}});
        expect(wrapper.instance().state.minBound).toBe('0');
        expect(wrapper.instance().state.maxBound).toBe('1');
        expect(wrapper.instance().state.howMany).toBe('1');
        expect(wrapper.instance().state.decimalPlacement).toBe('0');
        // test going beyond accepted bounds
        min_bound.simulate('change', {target: {value: '-19999999999999.99'}});
        min_bound.simulate('blur');
        expect(wrapper.instance().state.minBound).toBe('0');
        max_bound.simulate('change', {target: {value: '19999999999999.99'}});
        max_bound.simulate('blur');
        expect(wrapper.instance().state.maxBound).toBe('1');
        // test accepted bounds
        min_bound.simulate('change', {target: {value: '-9999999999999.99'}});
        min_bound.simulate('blur');
        expect(wrapper.instance().state.minBound).toBe('-9999999999999.99');
        /*
        min_bound.simulate('change', {target: {value: '-9999999999998.99'}});
        min_bound.simulate('keyDown', {target: {value: 'Enter'}});
        expect(wrapper.instance().state.minBound).toBe('-9999999999998.99');
        */
        max_bound.simulate('change', {target: {value: '9999999999999.99'}});
        max_bound.simulate('blur');
        expect(wrapper.instance().state.maxBound).toBe('9999999999999.99');
        /*
        max_bound.simulate('change', {target: {value: '9999999999998.99'}});
        max_bound.simulate('keyDown');
        expect(wrapper.instance().state.maxBound).toBe('9999999999998.99');
        */
        how_many.simulate('change', {target: {value: '50'}});
        expect(wrapper.instance().state.howMany).toBe('50');
        how_many.simulate('change', {target: {value: '51'}});
        expect(wrapper.instance().state.howMany).toBe('50');
        
        decimal_select.simulate('change', {target: {value: '2'}});
        expect(wrapper.instance().state.decimalPlacement).toBe('2');

    });
    test('test button state logic', () => {
        const wrapper = mount(
            <MainBoard
                {...main_board_props}
            />
        );
        const more_options = wrapper.find('#more-options-button')
        more_options.simulate('click');
        const read_character = wrapper.find('#read-character');
        const read_number = wrapper.find('#read-number');
        const listen = wrapper.find('#listen');
        read_character.simulate('click');
        expect(wrapper.instance().state.questions.readCharacter).toBe(false);
        read_number.simulate('click');
        expect(wrapper.instance().state.questions.readNumber).toBe(false);
        listen.simulate('click');
        expect(wrapper.instance().state.questions.listen).toBe(false);
        read_character.simulate('click');
        expect(wrapper.instance().state.questions.readCharacter).toBe(true);
        read_number.simulate('click');
        expect(wrapper.instance().state.questions.readNumber).toBe(true);
        listen.simulate('click');
        expect(wrapper.instance().state.questions.listen).toBe(true);
    });
    test('test starting StudyBoard', () => {
        window.URL.createObjectURL = jest.fn(() => 'some stuff');
        fetch_mock.postOnce('http://localhost:5000/studyboardSetup', Promise.resolve('value'));
        const wrapper = mount(
            <MainBoard
                {...main_board_props}
            />
        );
        const start_button = wrapper.find('#start-button');
        start_button.simulate('click');
        expect(wrapper.instance().state.loading).toBe(true);
        expect(wrapper.instance().state.started).toBe(true);
        wrapper.instance().setState({loading: false})
        expect(wrapper.instance().state.loading).toBe(false);
        
    });
    test('test chinese character type state logic', () => {
        const wrapper = mount(
            <MainBoard
                {...main_board_props}
            />
        );
        const chn_char_select = wrapper.find({name: 'chinese-character-type'});
        chn_char_select.simulate('change', {target: {value: 'tc'}});
        expect(wrapper.instance().state.chnCharType).toBe('tc');
    });
});

describe('snapshots', () => {
    test('renders MainBoard containing MenuBoard component when started is false', () => {
        const wrapper = shallow(
            <MainBoard
                {...main_board_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders MainBoard containing StudyBoard when started is true', () => {
        const wrapper = shallow(
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