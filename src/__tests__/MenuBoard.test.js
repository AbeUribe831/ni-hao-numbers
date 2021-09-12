/**
 * @jest-environment jsdom
 */
import React from 'react';
// import renderer from 'react-test-renderer';
import { MenuBoard, NumberOptions } from '../components/MenuBoard';
import { MoreOptions } from '../components/MenuBoard';
import { Options } from '../components/MenuBoard';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json'

Enzyme.configure({adapter: new Adapter()});

let number_options_props;
let more_options_props;
let options_props;
let menu_board_props;
const mock_function = jest.fn();

beforeEach(() => {
    number_options_props = {
        isMobile:false,
        minBound:'0',
        updateMinBound:jest.fn(),
        confirmMinIsNumber:jest.fn(),
        maxBound:'10',
        decimalPlacement:'0',
        chnCharType:'sc',
        updateMaxBound:jest.fn(),
        updateDecimalPlacement:jest.fn(),
        confirmMaxIsNumber:jest.fn(),
        howMany:'5',
        updateHowMany:jest.fn(),
        updateChnCharType:jest.fn(),
        confirmHowMany:jest.fn(),
    };
    more_options_props = {
        isMobile:false,
        questions:{
            listen: false,
            readNumber: true,
            readCharacter: true
        },
        started:false,
        onClickMoreOptions:jest.fn(), 
        updateQuestions:jest.fn(),
        updateAnswers:jest.fn(),
        resetQAndA:jest.fn()
    };
        options_props = {
            isMobile:false,
            minBound:'0',
            maxBound:'10',
            howMany:'6',
            questions:{
                listen: false,
                readNumber: true,
                readCharacter: true
            },  
            answers:{speak: false},
            started:false,
            decimalPlacement:'0',
            chnCharType:'sc',
            onClickMoreOptions:jest.fn(), 
            moreOptions:false, 
            updateDecimalPlacement:jest.fn(),
            updateQuestions:jest.fn(),
            updateAnswers:jest.fn(),
            updateMinBound:jest.fn(),
            updateMaxBound:jest.fn(),
            updateHowMany:jest.fn(),
            updateChnCharType:jest.fn(),
            confirmMinIsNumber:jest.fn(),
            confirmMaxIsNumber:jest.fn(),
            confirmHowMany:jest.fn(),
            resetQAndA:jest.fn(),
            onClickStart:jest.fn(),
        };
        menu_board_props = {
            isMobile:false,
            minBound:'0',
            maxBound:'10',
            howMany:'5',
            questions:{
                listen: false,
                readNumber: true,
                readCharacter: true
            },
            answers:{speak: false},
            started:false,
            decimalPlacement:'0',
            chnCharType:'sc',
            onClickMoreOptions:jest.fn(),
            moreOptions:false,
            updateDecimalPlacement:jest.fn(),
            updateQuestions:jest.fn(),
            updateAnswers:jest.fn(),
            updateMinBound:jest.fn(),
            updateMinBoundBlur:jest.fn(),
            updateMaxBound:jest.fn(),
            updateMaxBoundBlur:jest.fn(),
            updateHowMany:jest.fn(),
            updateHowManyBlur:jest.fn(),
            updateChnCharType:jest.fn(),
            confirmMinIsNumber:jest.fn(),
            confirmMaxIsNumber:jest.fn(),
            confirmHowMany:jest.fn(),
            resetQAndA:jest.fn(),
            onClickStart:jest.fn(),
        }
});
afterEach(() => {
    jest.clearAllMocks();
})
describe('rendering components', () => {
    test('NumberOptions renders when isMobile is false', () => {
        Enzyme.shallow(
            <NumberOptions
                {...number_options_props}
            />
        );
    });
    test('NumberOptions renders when isMobile is true', () => {
        number_options_props.isMobile = true;
        Enzyme.shallow(
            <NumberOptions
                {...number_options_props}
            />
        );
    });
    test('MoreOptions renders when isMobile is false', () => {
        Enzyme.shallow(
            <MoreOptions
            {...more_options_props}
            />
        );
    });
    test('MoreOptions renders when isMobile is true', () => {
        more_options_props.isMobile = true;
        Enzyme.shallow(
            <MoreOptions
            {...more_options_props}
            />
        );
    });
    test('Options renders when isMobile is false', () => {
        Enzyme.shallow(
            <Options
                {...options_props}
            />
        );
    });
    test('MenuBoard renders when isMobile is false', () => {
        Enzyme.shallow(
            <MenuBoard
                {...menu_board_props}
            />
        );
    });
    test('MenuBoard renders when isMobile is true', () => {
        menu_board_props.isMobile=true
        Enzyme.shallow(
            <MenuBoard
                {...menu_board_props}
            />
        );
    });
})
describe('passing props', () => {
    test('NumberOptions passes props', () => {
        const wrapper = Enzyme.mount(
            <NumberOptions
                {...number_options_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(wrapper.props().minBound).toBe('0');
        expect(typeof wrapper.props().updateMinBound === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().confirmMinIsNumber === typeof mock_function).toBe(true);
        expect(wrapper.props().maxBound).toBe('10');
        expect(wrapper.props().decimalPlacement).toBe('0');
        expect(wrapper.props().chnCharType).toBe('sc');
        expect(typeof wrapper.props().updateMaxBound === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateDecimalPlacement === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().confirmMaxIsNumber === typeof mock_function).toBe(true);
        expect(wrapper.props().howMany).toBe('5');
        expect(typeof wrapper.props().updateHowMany === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateChnCharType === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().confirmHowMany === typeof mock_function).toBe(true);
    });
    test('MoreOptions passes props', () => {
        const wrapper = Enzyme.mount(
            <MoreOptions
                {...more_options_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(wrapper.props().questions).toStrictEqual({listen: false, readNumber: true, readCharacter: true})
        expect(wrapper.props().started).toBe(false);
        expect(typeof wrapper.props().onClickMoreOptions === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateQuestions === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateAnswers === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().resetQAndA === typeof mock_function).toBe(true);
    });
    test('Options passes props', () => {
        const wrapper = Enzyme.mount(
            <Options
                {...options_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(wrapper.props().questions).toStrictEqual({listen: false, readNumber: true, readCharacter: true})
        expect(wrapper.props().answers.speak).toBe(false);
        expect(wrapper.props().started).toBe(false);
        expect(wrapper.props().decimalPlacement).toBe('0');
        expect(wrapper.props().chnCharType).toBe('sc');
        expect(typeof wrapper.props().onClickMoreOptions === typeof mock_function).toBe(true);
        expect(wrapper.props().moreOptions).toBe(false);
        expect(typeof wrapper.props().updateDecimalPlacement === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateQuestions === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateAnswers === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateMinBound === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateMaxBound === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().confirmMinIsNumber === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().confirmMaxIsNumber === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().confirmHowMany === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().resetQAndA === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().onClickStart === typeof mock_function).toBe(true);
    });
    test('MenuBoard passes props', () => {
        const wrapper = Enzyme.mount(
            <MenuBoard
                {...menu_board_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(wrapper.props().minBound).toBe('0');
        expect(wrapper.props().maxBound).toBe('10');
        expect(wrapper.props().howMany).toBe('5');
        expect(wrapper.props().questions).toStrictEqual({listen: false, readNumber: true, readCharacter: true})
        expect(wrapper.props().answers.speak).toBe(false);
        expect(wrapper.props().started).toBe(false);
        expect(wrapper.props().decimalPlacement).toBe('0');
        expect(wrapper.props().chnCharType).toBe('sc');
        expect(typeof wrapper.props().onClickMoreOptions === typeof mock_function).toBe(true);
        expect(wrapper.props().moreOptions).toBe(false);
        expect(typeof wrapper.props().updateDecimalPlacement === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateQuestions === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateAnswers === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateMinBound === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateMinBoundBlur === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateMaxBound === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateMaxBoundBlur === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateHowMany === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateHowManyBlur === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateChnCharType === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().confirmMinIsNumber === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().confirmMaxIsNumber === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().confirmHowMany === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().resetQAndA === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().onClickStart === typeof mock_function).toBe(true);
    })
});
// TODO:: test onClickMoreOptions (MenuBoard)
// TODO:: click buttons with spy(?) to ensure button was clicked (NumberOptions, Options, MoreOptions)
// TODO:: check button colors change
// TODO:: check that max and min changes based on logic
describe('logic', () => {
    const red_color = '#cd071e';

    test('MoreOptions colors change based on props and clicks are noted', () => {
        const wrapper = Enzyme.mount(
            <MoreOptions
                {...more_options_props}
            />
        );
        // check color and backgroundColor of button before and after clicked
        let read_character_button = wrapper.find('#readCharacter');
        let read_number_button = wrapper.find('#readNumber');
        let listen_button = wrapper.find('#listen');
        read_character_button.simulate('click');
        // readCharacter true 
        expect(read_character_button.props().style.color).toBe('white');
        expect(read_character_button.props().style.backgroundColor).toBe(red_color);
        expect(more_options_props.updateQuestions).toHaveBeenCalledTimes(1);
        // readNumber true
        read_number_button.simulate('click');
        expect(read_number_button.props().style.color).toBe('white');
        expect(read_number_button.props().style.backgroundColor).toBe(red_color);
        expect(more_options_props.updateQuestions).toHaveBeenCalledTimes(2);
        // listen false 
        listen_button.simulate('click');
        expect(listen_button.props().style.color).toBe(red_color);
        expect(listen_button.props().style.backgroundColor).toBe('white');
        expect(more_options_props.updateQuestions).toHaveBeenCalledTimes(3);

        // reverse the colors in MoreOptions
        more_options_props.questions.readCharacter = false;
        more_options_props.questions.readNumber = false;
        more_options_props.questions.listen = true;
        const rev_color_wrapper = Enzyme.mount(
            <MoreOptions
                {...more_options_props}
            />
        );
        // check color and backgroundColor of button before and after clicked
        read_character_button = rev_color_wrapper.find('#readCharacter');
        read_number_button = rev_color_wrapper.find('#readNumber');
        listen_button = rev_color_wrapper.find('#listen');
        read_character_button.simulate('click');
        // readCharacter false
        expect(read_character_button.props().style.color).toBe(red_color);
        expect(read_character_button.props().style.backgroundColor).toBe('white');
        expect(more_options_props.updateQuestions).toHaveBeenCalledTimes(4);
        // readNumber false 
        read_number_button.simulate('click');
        expect(read_number_button.props().style.color).toBe(red_color);
        expect(read_number_button.props().style.backgroundColor).toBe('white');
        expect(more_options_props.updateQuestions).toHaveBeenCalledTimes(5);
        // listen true
        listen_button.simulate('click');
        expect(listen_button.props().style.color).toBe('white');
        expect(listen_button.props().style.backgroundColor).toBe(red_color);
        expect(more_options_props.updateQuestions).toHaveBeenCalledTimes(6);

        const hide_button = wrapper.find('#hideButton');
        hide_button.simulate('click');
        expect(more_options_props.onClickMoreOptions).toHaveBeenCalledTimes(1);
    });

    // TODO:: NumberOptions logic
});

describe('snapshots', () => {
    test('renders NumberOptions with isMobile false', () => {
        const wrapper = Enzyme.shallow(
            <NumberOptions
                {...number_options_props}
            />
        )
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders NumberOptions with isMobile true', () => {
        number_options_props.isMobile = true;
        const wrapper = Enzyme.shallow(
            <NumberOptions
                {...number_options_props}
            />
        )
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders MoreOptions with isMobile being false ', () => {
        const wrapper = Enzyme.shallow(
            <MoreOptions
                {...more_options_props}        
            />
        )
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders MoreOptions with isMobile being true', () => {
        more_options_props.isMobile = true;
        const wrapper = Enzyme.shallow(
            <MoreOptions
                {...more_options_props}        
            />
        )
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('MenuBoard renders when isMobile is false', () => {
        const wrapper = Enzyme.shallow(
            <MenuBoard
                {...menu_board_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('MenuBoard renders when isMobile is true', () => {
        menu_board_props.isMobile = true
        const wrapper = Enzyme.shallow(
            <MenuBoard
                {...menu_board_props}   
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})
