import React, { Component } from 'react'
import '../App.css'
import MenuBoard from './MenuBoard'
export default class MainBoard extends Component {
    constructor(props){
        super(props);
        // the values in questions and answers determine which options are pressed
        this.state = {
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
                    questions={this.state.questions} 
                    answers={this.state.answers}
                    updateQuestions={this.updateQuestions} 
                    updateAnswers={this.updateAnswers}
                    resetQAndA={this.resetQAndA}
                />
            </div>
        )
    }
}