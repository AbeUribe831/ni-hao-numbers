import React, { Component } from 'react'
import '../component-styles/MainBoard.css'
import { MenuBoard } from './MenuBoard'
import StudyBoard from './StudyBoard'

// add a loading state 
export default class MainBoard extends Component {
    constructor(props){
        super(props);
        // the values in questions and answers determine which options are pressed
        this.state = {
            minBound: '0',
            maxBound: '10',
            howMany: '15',
            decimalPlacement: '0',
            chnCharType: 'sc',
            questions: {
                readCharacter: true,
                readNumber: true,
                listen: true
            },
            answers: {speak: false},
            loading: false,
            started: false 
        }
        this.updateQuestions = this.updateQuestions.bind(this);
        this.updateAnswers = this.updateAnswers.bind(this);
        this.resetQAndA = this.resetQAndA.bind(this);
        this.updateDecimalPlacement = this.updateDecimalPlacement.bind(this);
        this.updateMinBound = this.updateMinBound.bind(this);
        this.updateMinBoundBlur = this.updateMinBoundBlur.bind(this);
        this.updateMaxBound = this.updateMaxBound.bind(this);
        this.updateMaxBoundBlur = this.updateMaxBoundBlur.bind(this);
        this.updateHowMany = this.updateHowMany.bind(this);
        this.updateHowManyBlur = this.updateHowManyBlur.bind(this);
        this.updateLoading = this.updateLoading.bind(this);
        this.updateChnCharType = this.updateChnCharType.bind(this);
        this.confirmMinIsNumber = this.confirmMinIsNumber.bind(this);
        this.confirmMaxIsNumber = this.confirmMaxIsNumber.bind(this);
        this.confirmHowMany = this.confirmHowMany.bind(this);
        this.onClickStartedTrue = this.onClickStartedTrue.bind(this);
        this.onClickStartedFalse = this.onClickStartedFalse.bind(this);
    }

    // TODO:: modify to work with largest and smallest number
    confirmMaxIsValid() {
        const minBound = parseFloat(this.state.minBound);
        const maxBound =  parseFloat(this.state.maxBound);
            if (minBound > maxBound) {
                this.setState(() => ({
                    maxBound: (minBound + 1).toString()
                }));
            }
    }
    /*
    All these confirm methods are for clicking Tab or Enter
    */
    confirmMinIsNumber(event) {
        if ((event.key === 'Tab' || event.key ==='Enter') && (this.state.minBound === '' || isNaN(this.state.minBound))) {
            this.setState({
                minBound: '0'
            });
        }
    }
    confirmMaxIsNumber(event) {
        if ((event.key === 'Tab' || event.key ==='Enter') && (this.state.maxBound === '' || isNaN(this.state.maxBound) || parseFloat(this.state.minBound) > parseFloat(this.state.maxBound))) {
            this.setState((prevState) => ({
                maxBound: (parseFloat(prevState.minBound) + 1).toString()
            }));
 
        }
    }
    confirmHowMany(event) {
        if ((event.key === 'Tab' || event.key ==='Enter') && (this.state.howMany === '' || parseInt(this.state.howMany)  < 1)) {
            this.setState({
                howMany: '1'
            });
        }
    }
    updateHowManyBlur(event) {
        if(event.target.value === '') {
            this.setState({
                howMany: '1'
            });
        }
    }
    /*
    Update methodschecks that the input is a number or empty (empty to allow user to type in a new number)
    */
    updateHowMany(event) {
        let allNumRegex = /^[\d]*$/g;
        if (event.target.value.match(allNumRegex)) {
            this.setState({
                howMany: event.target.value
            }, () => {
                if (parseInt(this.state.howMany) > 50) {
                    this.setState({
                        howMany: '50'
                    });
                }
            });
        }
        else {
            this.setState({
                howMany: '1'
            });
        }
    }
    updateMinBoundBlur(event) {
        const minBound = parseFloat(event.target.value);
        if(isNaN(event.target.value) || minBound < -9999999999999.99) {
            this.setState(() => ({
                minBound: '0'
            }));
        }
    }
    // TODO:: add a limit to min -9,999,999,999,999.99
    updateMinBound(event)
    {
        let allNumRegex = /^[-]{0,1}[\0\d]*[.]{0,1}[\0\d]*$/g;
        if (event.target.value.match(allNumRegex)) {
            this.setState({
                minBound: event.target.value
            }, () => {
                this.confirmMaxIsValid()
            });
        }
        else {
            this.setState({
                minBound: '0'
            });
        }
    }
    // used to update max_bound when focus is lost (example: empty 'To' div and clicking out of the div)
    updateMaxBoundBlur(event) {
        const minBound = parseFloat(this.state.minBound);
        const maxBound = parseFloat(event.target.value);
        if(isNaN(event.target.value) || maxBound > 9999999999999.99 || minBound > maxBound) {
            this.setState((prevState) => ({
                maxBound: (parseFloat(prevState.minBound) + 1).toString()
            }));
        }

    }
    // keeps MaxBound as a number but doesn't check if it is less than min bound
    // this allows user to modify the number uninterrupted until: types a non number character, out of focus, clicks enter, or tab
    updateMaxBound(event)
    {
        // let regex = /^[-]{0,1}[\0\d]*$/g;
        let allNumRegex = /^[-]{0,1}[\0\d]*[.]{0,1}[\0\d]*$/g;
        if (event.target.value.match(allNumRegex)) {
            this.setState({
                maxBound: event.target.value
            });
        }
        else {
            this.setState((prevState) => { 
                return {
                    maxBound: parseFloat(prevState.minBound) + 1
                }
            });
        }
    }
    // TODO:: determine whether to toggle the loading or set true/false
    updateLoading() {
        this.setState((prevState) =>({
            loading: !prevState.loading
        }));
    }
    resetQAndA() {
        this.setState({
            questions: {
                readCharacter: true,
                readNumber: true,
                listen: true,
            },
            answers: {speak: false}
        });
    }
    updateDecimalPlacement(event) {
        this.setState({
            decimalPlacement: event.target.value 
        });
    }
    updateQuestions(question) {
        if (question === 'readCharacter') {
            this.setState((prevState) =>({
                questions: {
                    readCharacter: !prevState.questions.readCharacter,
                    readNumber: prevState.questions.readNumber,
                    listen: prevState.questions.listen
                }
            }));
        }
        else if (question === 'readNumber') {
            this.setState((prevState) =>({
                questions: {
                    readCharacter: prevState.questions.readCharacter,
                    readNumber: !prevState.questions.readNumber,
                    listen: prevState.questions.listen
                }
            }));
        }
        else if (question === 'listen') {
            this.setState((prevState) =>({
                questions: {
                    readCharacter: prevState.questions.readCharacter,
                    readNumber: prevState.questions.readNumber,
                    listen: !prevState.questions.listen
                }
            }));
        }
    }
    updateAnswers() {
        this.setState((prevState) => ({
            answers: {speak: !prevState.answers.speak}
        }));
    }
    updateChnCharType(event) {
        this.setState({
            chnCharType: event.target.value
        });
    }
    onClickStartedTrue() {
        this.setState({
            started: true
        });
        if(this.props.isMobile) {
            this.props.hideMobileNav(true);
        }
    }
    onClickStartedFalse() {
        this.setState({
            started: false 
        });
        if(this.props.isMobile) {
            this.props.hideMobileNav(false);
        }
    }
    render() {
        const started = this.state.started;
        if(!started) { 
            return (
                <div className='main-board' style={{paddingTop: '3em'}}>
                    <MenuBoard 
                        isMobile={this.props.isMobile}
                        minBound={this.state.minBound}
                        maxBound={this.state.maxBound}
                        howMany={this.state.howMany}
                        questions={this.state.questions} 
                        answers={this.state.answers}
                        started={this.state.started}
                        decimalPlacement={this.state.decimalPlacement}
                        chnCharType={this.state.chnCharType}
                        updateDecimalPlacement={this.updateDecimalPlacement}
                        updateQuestions={this.updateQuestions} 
                        updateAnswers={this.updateAnswers}
                        updateMinBound={this.updateMinBound}
                        updateMinBoundBlur={this.updateMinBoundBlur}
                        updateMaxBound={this.updateMaxBound}
                        updateMaxBoundBlur={this.updateMaxBoundBlur}
                        updateHowMany={this.updateHowMany}
                        updateHowManyBlur={this.updateHowManyBlur}
                        updateChnCharType={this.updateChnCharType}
                        confirmMinIsNumber={this.confirmMinIsNumber}
                        confirmMaxIsNumber={this.confirmMaxIsNumber}
                        confirmHowMany={this.confirmHowMany}
                        resetQAndA={this.resetQAndA}
                        onClickStart={this.onClickStartedTrue}
                    />
                </div>
            )
        }
        return (
            <div className='main-board' style={{paddingTop: '5em'}}>
                <StudyBoard
                    isMobile={this.props.isMobile}
                    minBound={this.state.minBound}
                    maxBound={this.state.maxBound} 
                    howMany={this.state.howMany}
                    questions={this.state.questions}
                    answers={this.state.answers}
                    loading={this.state.loading}
                    chnCharType={this.state.chnCharType}
                    decimalPlacement={this.state.decimalPlacement}
                    onClickExit={this.onClickStartedFalse}
                    updateLoading={this.updateLoading}
                    resetQAndA={this.resetQAndA}
                />
            </div>
        )
    }
}