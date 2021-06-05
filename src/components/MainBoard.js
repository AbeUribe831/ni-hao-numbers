import React, { Component } from 'react'
import '../App.css'
import MenuBoard from './MenuBoard'
export default class MainBoard extends Component {
    constructor(props){
        super(props);
        // the values in questions and answers determine which options are pressed
        this.state = {
            questions: ['char, num, listen'],
            answers: [],
            started: false 
        }
        this.updateQuestionsAndAnswers = this.updateQuestionsAndAnswers.bind(this);
    }
    updateQuestionsAndAnswers(questions, answers) {
        this.setState(() =>({
            questions: questions,
            answers: answers
        }));
    }
    render() {
        return (
            <div className="main-board">
                <MenuBoard questions={this.state.questions} answers={this.state.answers} updateQuestionsAndAnswers={this.updateQuestionsAndAnswers}/>
            </div>
        )
    }
}