import React, { Component } from 'react'
import '../App.css'
import MenuBoard from './MenuBoard'
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
        this.confirmMinIsNumber = this.confirmMinIsNumber.bind(this);
        this.confirmMaxIsNumber = this.confirmMaxIsNumber.bind(this);
    }

    confirmMaxIsValid() {
        const minBound = parseFloat(this.state.minBound);
        const maxBound =  parseFloat(this.state.maxBound);
            if (minBound >= maxBound) {
                this.setState((prevState) => ({
                    maxBound: (minBound + 1).toString()
                }));
            }
    }
    confirmMinIsNumber(event) {
        if ((event.key === 'Tab' || event.key ==='Enter') && (!this.state.minBound || isNaN(this.state.minBound))) {
            this.setState({
                minBound: '0'
            });
        }
    }
    confirmMaxIsNumber(event) {
        if ((event.key === 'Tab' || event.key ==='Enter') && (!this.state.maxBound || isNaN(this.state.maxBound) || parseFloat(this.state.minBound) >= parseFloat(this.state.maxBound))) {
            this.setState((prevState) => ({
                maxBound: (parseFloat(prevState.minBound) + 1).toString()
            }));
 
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
        this.setState({
            questions: {
                readCharacter: true,
                readNumber: true,
                listen: true,
            },
            answers: {speak: false},
            started: false
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
    render() {
        return (
            <div className="main-board">
                <MenuBoard 
                    minBound={this.state.minBound}
                    maxBound={this.state.maxBound}
                    questions={this.state.questions} 
                    answers={this.state.answers}
                    updateQuestions={this.updateQuestions} 
                    updateAnswers={this.updateAnswers}
                    updateMinBound={this.updateMinBound}
                    updateMaxBound={this.updateMaxBound}
                    confirmMinIsNumber={this.confirmMinIsNumber}
                    confirmMaxIsNumber={this.confirmMaxIsNumber}
                    resetQAndA={this.resetQAndA}
                />
            </div>
        )
    }
}