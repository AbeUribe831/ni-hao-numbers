import React, { Component } from 'react'
import '../App.css'
import MenuBoard from './MenuBoard'
import StudyBoard from './StudyBoard'

export default class MainBoard extends Component {
    constructor(props){
        super(props);
        // the values in questions and answers determine which options are pressed
        this.state = {
            minBound: '0',
            maxBound: '10',
            howMany: '15',
            questions: {
                readCharacter: true,
                readNumber: true,
                listen: true
            },
            answers: {speak: false},
            started: false 
        }
        this.updateQuestions = this.updateQuestions.bind(this);
        this.updateAnswers = this.updateAnswers.bind(this);
        this.resetQAndA = this.resetQAndA.bind(this);
        this.updateMinBound = this.updateMinBound.bind(this);
        this.updateMaxBound = this.updateMaxBound.bind(this);
        this.updateHowMany = this.updateHowMany.bind(this);
        this.confirmMinIsNumber = this.confirmMinIsNumber.bind(this);
        this.confirmMaxIsNumber = this.confirmMaxIsNumber.bind(this);
        this.confirmHowMany = this.confirmHowMany.bind(this);
        this.onClickStartedTrue = this.onClickStartedTrue.bind(this);
        this.onClickStartedFalse = this.onClickStartedFalse.bind(this);
    }

    
    confirmMaxIsValid() {
        const minBound = parseFloat(this.state.minBound);
        const maxBound =  parseFloat(this.state.maxBound);
            if (minBound >= maxBound) {
                this.setState((prevState) => ({
                    maxBound: (prevState.minBound + 1).toString()
                }));
            }
    }
    confirmMinIsNumber(event) {
        if ((event.key === 'Tab' || event.key ==='Enter') && (this.state.minBound === '' || isNaN(this.state.minBound))) {
            this.setState({
                minBound: '0'
            });
        }
    }
    confirmMaxIsNumber(event) {
        if ((event.key === 'Tab' || event.key ==='Enter') && (this.state.maxBound === '' || isNaN(this.state.maxBound) || parseFloat(this.state.minBound) >= parseFloat(this.state.maxBound))) {
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
            this.setState((prevState) => ({
                maxBound: (parseFloat(prevState.minBound) + 1).toString()
            }));
        }
    }
    resetQAndA() {
        if(this.state.started){
            this.setState({
                questions: {
                    readCharacter: true,
                    readNumber: true,
                    listen: true,
                },
            });
        }
        else {
            this.setState({
                questions: {
                    readCharacter: true,
                    readNumber: true,
                    listen: true,
                },
                answers: {speak: false}
            });
        }
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
    onClickStartedTrue() {
        this.setState({
            started: true
        });
    }
    onClickStartedFalse() {
        this.setState({
            started: false 
        });
    }
    render() {
        const started = this.state.started;
        if(!started) { 
            return (
                <div className='main-board'>
                    <MenuBoard 
                        minBound={this.state.minBound}
                        maxBound={this.state.maxBound}
                        howMany={this.state.howMany}
                        questions={this.state.questions} 
                        answers={this.state.answers}
                        updateQuestions={this.updateQuestions} 
                        updateAnswers={this.updateAnswers}
                        updateMinBound={this.updateMinBound}
                        updateMaxBound={this.updateMaxBound}
                        updateHowMany={this.updateHowMany}
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
            <div className='main-board'>
                <StudyBoard
                    minBound={this.state.minBound}
                    maxBound={this.state.maxBound} 
                    howMany={this.state.howMany}
                    questions={this.state.questions}
                    answers={this.state.answers}
                    onClickExit={this.onClickStartedFalse}
                    resetQAndA={this.resetQAndA}
                />
            </div>
        )
    }
}