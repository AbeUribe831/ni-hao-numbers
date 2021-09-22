/**
 * @jest-environment jsdom
 */
import React from 'react';
import { CurrentStep } from '../components/StudyBoard';
import { QuestionStep } from '../components/StudyBoard';
import { AnswerStep } from '../components/StudyBoard';
import { Buttons } from '../components/StudyBoard';
import { Loader } from '../components/StudyBoard';
import { EndPage } from '../components/StudyBoard';
import { StudyBoard } from '../components/StudyBoard';
import {shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { base64StringToBlob } from 'blob-util';
// use fetch-mock instead of nock because it mocks fetch calls. nock mocks xmlhttpreqeusts
import fetch_mock, { spy } from 'fetch-mock';
import { queryByTestId } from '@testing-library/react';

Enzyme.configure({adapter: new Adapter()});

let current_step_props;
let study_board_props;
let end_page_props;
let question_step_props;
let answer_step_props;
let button_props
const mock_function = jest.fn();

const url = 'http://localhost:5000'
const post_url = '/studyboardSetup'

beforeEach(() => {
    question_step_props = {
        isMobile: false,
        currentNumber: {
            listen: null,
            answer: '9',
            answer_type: 'writeNumber',
            questions: '九'
        },
        audio: null,
        userAnswer: ''
    };

    current_step_props = {
        isMobile: false,
        currentStep: 1,
        totalSteps: 2
    };

    answer_step_props = {
        isMobile: false,
        answerType: 'writeCharacter',
        onEnterSubmit: jest.fn(),
        updateUserAnswer: jest.fn(),
        userAnswer: '',
    };

    button_props = {
        isMobile: false,
        onClickExit: jest.fn(),
        onClickSubmit: jest.fn()
    };

    end_page_props = {
        isMobile: false,
        wrongAnswers: [
            {
                practiceQuestion: {
                    answer: '9',
                    answer_type: 'writeNumber',
                    listen: null,
                    question: '九'
                },
                step: 1,
                wrongAnswers: '7'
            }],
        totalCorrect: '2',
        howMany: '3',
        onClickExit: jest.fn(),
        createAudio: jest.fn()
    }

    study_board_props = {
        answers: {
            speak: false
        },
        chnCharType: 'sc',
        decimalPlacement: '0',
        howMany: '1',
        isMobile: false,
        loading: false,
        maxBound: '10',
        minBound: '0',
        onClickExit: jest.fn(),
        questions: {
            listen: true,
            readCharacter: true,
            readNumber: true
        },
        resetQAndA: jest.fn(),
        updateLoading: jest.fn()
    }
});

afterEach (() => {
    jest.clearAllMocks();
    fetch_mock.restore();
})
describe('rendering components', () => {
    test('rendering CurrentStep', () => {
        const wrapper = shallow(
            <CurrentStep
                {...current_step_props}
            />
        );
    });

    test('rendering QusetionStep', () => {
        const wrapper = shallow(
            <QuestionStep
                {...question_step_props}
            />
        );
    });

    test('rendering AnswerStep', () => {
        const wrapper = shallow(
            <AnswerStep
                {...answer_step_props}
            />
        );
    });

    test('rendering Button', () => {
        const wrapper = shallow(
            <Buttons
                {...button_props}
            />
        );
    });

    test('rendering Loader', () => {
        const wrapper = shallow(<Loader />);
    });

    test('rendering EndPage', () => {
        const wrapper = shallow(
            <EndPage
                {...end_page_props}
            />
        );
    });

    test('rendering StudyBoard', () => {
        fetch_mock.postOnce(url + post_url, {
            body: [{
                    listen: null,
                    answer: '9',
                    answer_type: 'writeNumber',
                    questions: '九'
                }]
            })
        const wraper = shallow(
            <StudyBoard
                {...study_board_props}
            />
        );
    });
});

describe('passing props', () => {
    test('passing props to CurrentStep', () => {
        const wrapper = mount(
            <CurrentStep
                {...current_step_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(wrapper.props().currentStep).toBe(1);
        expect(wrapper.props().totalSteps).toBe(2);
    });

    test('passing props to QustionStep', () => {
        const wrapper = mount(
            <QuestionStep
                {...question_step_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(wrapper.props().currentNumber).toStrictEqual({
            listen: null,
            answer: '9',
            answer_type: 'writeNumber',
            questions: '九'
        });
        expect(wrapper.props().audio).toBeNull();
        expect(wrapper.props().userAnswer).toBe('');
    });

    test('passing props to AnswerStep', () => {
        const wrapper = mount(
            <AnswerStep
                {...answer_step_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(wrapper.props().answerType).toBe('writeCharacter');
        expect(typeof wrapper.props().onEnterSubmit === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateUserAnswer === typeof mock_function).toBe(true);
        expect(wrapper.props().userAnswer).toBe('');
    });

    test('passing props to Buttons', () => {
        const wrapper = mount(
            <Buttons
                {...button_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(typeof wrapper.props().onClickExit === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().onClickSubmit === typeof mock_function).toBe(true);
    });
    // endpage studyboard
    test('passing props to EndPage', () => {
        const wrapper = mount(
            <EndPage
                {...end_page_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(wrapper.props().wrongAnswers).toStrictEqual(
            [
                {
                    practiceQuestion: {
                        answer: '9',
                        answer_type: 'writeNumber',
                        listen: null,
                        question: '九'
                    },
                    step: 1,
                    wrongAnswers: '7'
                }]
        );
        expect(wrapper.props().totalCorrect).toBe('2');
        expect(wrapper.props().howMany).toBe('3');
        expect(typeof wrapper.props().onClickExit === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().createAudio === typeof mock_function).toBe(true);
    });

    test('passing props to StudyBoard', () => {
        fetch_mock.postOnce(url + post_url, {
            body: [{
                    listen: null,
                    answer: '9',
                    answer_type: 'writeNumber',
                    questions: '九'
                }]
            });
        const wrapper = mount(
            <StudyBoard
                {...study_board_props}
            />
        );
        expect(wrapper.props().isMobile).toBe(false);
        expect(wrapper.props().chnCharType).toBe('sc');
        expect(wrapper.props().decimalPlacement).toBe('0');
        expect(wrapper.props().howMany).toBe('1');
        expect(wrapper.props().loading).toBe(false);
        expect(wrapper.props().maxBound).toBe('10');
        expect(wrapper.props().minBound).toBe('0');
        expect(typeof wrapper.props().onClickExit === typeof mock_function).toBe(true);
        expect(wrapper.props().questions).toStrictEqual({
            listen: true,
            readCharacter: true,
            readNumber: true
        });
        expect(typeof wrapper.props().resetQAndA === typeof mock_function).toBe(true);
        expect(typeof wrapper.props().updateLoading === typeof mock_function).toBe(true);

    });
})
// test states here 
// No CurrentStep
describe('logic', () => {
    window.URL.createObjectURL = jest.fn();

    afterEach(() => {
        window.URL.createObjectURL.mockReset();
        jest.resetAllMocks();
    });
    // QuestionStep change listen speed, click to play audio, no button if listen = null
    // TODO:: figure out how to test changePlayback select
    // TODO:: test getSnapshotBeforeUpdate and componentWillUpdate
    test('QuestionStep logic for playing audio ', () => {
        // need to mock URL functions to test logic of question_step_props
        window.URL.createObjectURL = jest.fn(() => 'some stuff');
        question_step_props.currentNumber = {
            listen: btoa('asdkfjl;asfewiruofdasfljkssv'),
            answer: '9',
            answer_type: 'writeNumber',
            questions: null
        };
        question_step_props.audio = new Audio(URL.createObjectURL(base64StringToBlob(question_step_props.currentNumber.listen)));
        const wrapper = mount(
            <QuestionStep
                {...question_step_props}
            />
        );
        // set mocks for play audio
        let paused = true;
        window.HTMLMediaElement.prototype.play = jest.fn(() => {
            paused = !paused;
        });
        Object.defineProperty(global.window.HTMLMediaElement.prototype, 'paused', {
            get() {
                return paused 
            }
        })
        // wrapper.props().audio.play = jest.fn();
        const play_audio_button = wrapper.find('#play-audio');
        expect(play_audio_button.exists()).toBe(true);

        const spy_on_play_audio = jest.spyOn(wrapper.instance(), 'playAudio');
        // click audio button, check playAudio() was called
        play_audio_button.simulate('click');
        expect(spy_on_play_audio).toBeCalledTimes(1);
        play_audio_button.simulate('click');
        expect(spy_on_play_audio).toBeCalledTimes(2);
        expect(paused).toBe(false);
        // check that audio resets
        expect(wrapper.props().audio.currentTime).toBe(0)
    });
    // AnswerStep (update userAnswer)
    test('AnswerStep logic for pressing enter', () => {
        const wrapper = mount(
            <AnswerStep
                {...answer_step_props}
            />
        );
        const input = wrapper.find('input'); 
        input.simulate('keypress', {key: 'Enter'});
        expect(wrapper.props().onEnterSubmit).toBeCalledTimes(1);
        input.simulate('change', {target: {value: '9'}});
        expect(wrapper.props().updateUserAnswer).toBeCalledTimes(1);
    });
    // Buttons (check props methods called on onClick)
    test('Button logic clicks', () => {
        const wrapper = mount(
            <Buttons
                {...button_props}
            />
        );
        const exit_button = wrapper.find('#exit-button');
        const submit_button = wrapper.find('#submit-button');
        exit_button.simulate('click');
        submit_button.simulate('click');
        expect(wrapper.props().onClickExit).toBeCalledTimes(1);
        expect(wrapper.props().onClickSubmit).toBeCalledTimes(1);
    });
    // Loader component methods
    // EndPage
    test('EndPage logic works for both end page and review page', () => {
        // create object with pause object for the sake of mocking 
        end_page_props.createAudio = jest.fn(() => {
           return { pause: jest.fn()}
        });
        end_page_props.wrongAnswers.push({
            practiceQuestion: {
                answer: '八十一',
                answer_type: 'writeCharacter',
                listen: null,
                question: '81'
            },
            step: 2,
            wrongAnswers: '八十'
        });
        // one error with audio 
        end_page_props.wrongAnswers.push({
            practiceQuestion: {
                answer: '10',
                answer_type: 'writeNumber',
                listen: btoa('aksjdflas;kjfklasdfjlaksdjf'),
                question: null 
            },
            step: 5,
            wrongAnswers: '12'
        });
        end_page_props.totalCorrect = '3';
        end_page_props.howMany = '6';
        const wrapper = mount(
            <EndPage
                {...end_page_props}
            />
        );
        const review_button = wrapper.find('#review-button');
        expect(review_button.exists()).toBe(true);
        review_button.simulate('click');
        // this show that the review button works
        expect(wrapper.instance().state.reviewInstance).toBeGreaterThan(-1);
        // check that the prev, exit and next button exist
        expect(wrapper.instance().state.reviewInstance).toBe(0)
        let prev_button = wrapper.find('#previous-button'); 
        let next_button = wrapper.find('#next-button');
        expect(prev_button.props().style.visibility).toBe('hidden');
        expect(next_button.props().style.visibility).toBe('visible');
        // test that clicking prev will not do anything to the state
        prev_button.simulate('click');
        expect(wrapper.instance().state.reviewInstance).toBe(0)
        next_button.simulate('click');
        // test that both buttons appear after next is clicked
        expect(wrapper.instance().state.reviewInstance).toBe(1)
        prev_button = wrapper.find('#previous-button');
        next_button = wrapper.find('#next-button');
        expect(prev_button.props().style.visibility).toBe('visible');
        expect(next_button.props().style.visibility).toBe('visible');
        next_button.simulate('click');
        // test that prev doesn't appear after next button is clicked
        expect(wrapper.instance().state.reviewInstance).toBe(2);
        prev_button = wrapper.find('#previous-button');
        next_button = wrapper.find('#next-button'); 
        expect(prev_button.props().style.visibility).toBe('visible');
        expect(next_button.props().style.visibility).toBe('hidden');
        prev_button.simulate('click');
        // test that previous button works
        expect(wrapper.instance().state.reviewInstance).toBe(1);
        prev_button = wrapper.find('#previous-button');
        next_button = wrapper.find('#next-button');
        expect(prev_button.props().style.visibility).toBe('visible');
        expect(next_button.props().style.visibility).toBe('visible');
        // test exit button
        const exit_to_home_button = wrapper.find('#exit-to-home-button');
        expect(exit_to_home_button.exists()).toBe(true);
        exit_to_home_button.simulate('click');
        expect(wrapper.props().onClickExit).toBeCalledTimes(1);
    });
    // EndPage when there are no wrong answers
    test('EndPage when there is nothing to review', () => {
        end_page_props.wrongAnswers.pop();
        end_page_props.totalCorrect = '3';
        const wrapper = mount(
            <EndPage
                {...end_page_props}
            />
        );
        expect(wrapper.find('#review-button').exists()).toBe(false);
    });
    // StudyBoard
    test('StudyBoard to EndPage with no wrong answers', () => {
        // bypass fetch and the promises after
        fetch_mock.postOnce(url + post_url, Promise.resolve('value'));
        //fetch_mock.postOnce(url + post_url, Promise.resolve('value').then(response => {return Promise.resolve(response)}).then(response => {return Promise.resolve(response)}).catch((err) => {console.log(err)}));
        const wrapper = mount(
            <StudyBoard
                {...study_board_props}
            />
        );
        wrapper.setState({
            currentStep: 1,
            practiceQuestions: [{
                    listen: null,
                    answer: '9',
                    answer_type: 'writeNumber',
                    questions: '九'
            }]
        })
        // questions 
        expect(wrapper.find('#text-question').exists()).toBe(true);
        expect(wrapper.find('#exit-to-home-button').exists()).toBe(false);
        expect(wrapper.instance().state.currentStep).toBe(1);
        expect(wrapper.instance().state.totalCorrect).toBe(0);
        // added the correct answer
        wrapper.find('#user-answer').simulate('change', {target: {value: '9'}});
        wrapper.find('#submit-button').simulate('click');
        expect(wrapper.instance().state.currentStep).toBe(2);
        expect(wrapper.instance().state.totalCorrect).toBe(1);
        expect(wrapper.find('#end-text').exists()).toBe(true);
        expect(wrapper.find('#text-question').exists()).toBe(false);
        expect(wrapper.find('#review-button').exists()).toBe(false);
    });
    test('StudyBoard to EndPage with a wrong answer', () => {
        // bypass fetch and the promises after
        fetch_mock.postOnce(url + post_url, Promise.resolve('value'));
        //fetch_mock.postOnce(url + post_url, Promise.resolve('value').then(response => {return Promise.resolve(response)}).then(response => {return Promise.resolve(response)}).catch((err) => {console.log(err)}));
        const wrapper = mount(
            <StudyBoard
                {...study_board_props}
            />
        );
        wrapper.setState({
            currentStep: 1,
            practiceQuestions: [{
                    listen: null,
                    answer: '9',
                    answer_type: 'writeNumber',
                    questions: '九'
            }]
        })
        // questions 
        expect(wrapper.find('#text-question').exists()).toBe(true);
        expect(wrapper.find('#exit-to-home-button').exists()).toBe(false);
        expect(wrapper.instance().state.currentStep).toBe(1);
        expect(wrapper.instance().state.totalCorrect).toBe(0);
        // added the correct answer
        wrapper.find('#user-answer').simulate('change', {target: {value: '10'}});
        wrapper.find('#submit-button').simulate('click');
        expect(wrapper.instance().state.currentStep).toBe(2);
        expect(wrapper.instance().state.totalCorrect).toBe(0);
        expect(wrapper.find('#end-text').exists()).toBe(true);
        expect(wrapper.find('#text-question').exists()).toBe(false);
        expect(wrapper.find('#review-button').exists()).toBe(true);
    });
})
// TODO:: add snapshots for EndPage (for end page and review page) and StudyBoard
describe('snapshots', () => {
    test('renders CurrentStep with isMobile false', () => {
        const wrapper = shallow(
            <CurrentStep
                {...current_step_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders CurrentStep with isMobile true', () => {
        current_step_props.isMobile = true;
        const wrapper = shallow(
            <CurrentStep
                {...current_step_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders QuestionStep with isMobile false', () => {
        const wrapper = shallow(
            <QuestionStep
                {...question_step_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders QuestionStep with isMobile true', () => {
        question_step_props.isMobile = true;
        const wrapper = shallow(
            <QuestionStep
                {...question_step_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders AnswerStep with isMobile false', () => {
        const wrapper = shallow(
            <AnswerStep
                {...answer_step_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders AnswerStep with isMobile false', () => {
        answer_step_props.isMobile = true;
        const wrapper = shallow(
            <AnswerStep
                {...answer_step_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders Buttons with isMobile false', () => {
        const wrapper = shallow(
            <Buttons
                {...button_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders Buttons with isMobile true', () => {
        button_props.isMobile = true;
        const wrapper = shallow(
            <Buttons
                {...button_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders Loader', () => {
        const wrapper = shallow(
            <Loader/>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('renders StudyBoard', () => {
        fetch_mock.postOnce(url + post_url, Promise.resolve('value'));
        //fetch_mock.postOnce(url + post_url, Promise.resolve('value').then(response => {return Promise.resolve(response)}).then(response => {return Promise.resolve(response)}).catch((err) => {console.log(err)}));
        const wrapper = shallow(
            <StudyBoard
                {...study_board_props}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})