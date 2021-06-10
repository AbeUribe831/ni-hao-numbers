import { Component } from "react";
import '../component-styles/MenuBoard.css'
import '../component-styles/StudyBoard.css'

const AnswerTypes = ['writeCharacter', 'writeNumber', 'speak'];

function getRandomInclusiveInt(min, max) {
    var minNum = parseInt(min);
    var maxNum = parseInt(max);
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}
function getRandomInclusiveFloat(min, max) {
    var minNum = parseFloat(min);
    var maxNum = parseFloat(max);
    return Math.random() * (maxNum - minNum + 1) + minNum;
}

function CurrentStep(props) {
   return(
       <p styles={{fontSize: '2em'}}>{props.currentStep} / {props.totalSteps}</p>
   );
}

function QuestionStep(props) {
    return (
        <p>{props.currentNumber}</p>
    );
}

function Buttons(props) {
    return (
        <div className='row-flex-wrap' >
            <button className='basic-button' onClick={props.onClickExit}>Exit</button>
            <div style={{marginLeft: '0.5em', marginRight: '0.5em'}}/>
            <button className='basic-button'>Sumbit</button>
        </div>
    );
}

function getAnswerType(questionType, speakBool) {
   let randomNum;
   // range from 0-2 or 0-1
   let range = 1 + (speakBool ? 1 : 0);
   do {
        randomNum = getRandomInclusiveInt(0, range);
   } while (
       (questionType === 'readCharacter' && AnswerTypes[randomNum] === 'writeCharacter') ||
       (questionType === 'readNumber' && AnswerTypes[randomNum] === 'writeNumber') ||
       (questionType === 'listen' && AnswerTypes[randomNum] === 'speak')
    );
    return AnswerTypes[randomNum];

}
// TODO:: logic to pair answer type with question type
export default class StudyBoard extends Component {
    constructor(props){
        super(props);
        
        // get the valid questions in a list 
        let validQuestions = [];
        Object.entries(this.props.questions).forEach(([key, value]) => {
            if(value) {
                validQuestions.push(key);
            }
        });

        const sizeOfList = this.props.howMany;
        let minBound = this.props.minBound;
        let maxBound = this.props.maxBound;
        const isFloat = minBound.includes('.') | maxBound.includes('.');
        let practiceQuestions = [];
        let randomNum;
        let questionType;
        const speak = this.props.answers.speak;
        for(let i = 0; i < sizeOfList; i++) {
            questionType = validQuestions[getRandomInclusiveInt(0, validQuestions.length - 1)];
            if(isFloat) {
                randomNum = getRandomInclusiveFloat(minBound, maxBound);
            }
            else {
                randomNum = getRandomInclusiveInt(minBound, maxBound);
            }
            practiceQuestions.push({
                number: randomNum,
                questionType: questionType,
                answerType: getAnswerType(questionType, speak)
            });
        }
        this.state = {
            currentStep: 1,
            practiceQuestions: practiceQuestions,
        }
    }
    componentWillUnmount() {
        this.props.resetQAndA();
    }
    render() {
        const currentStep = this.state.currentStep;
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                <CurrentStep 
                    currentStep={currentStep}
                    totalSteps={this.props.howMany}
                />
                <QuestionStep
                    currentNumber={this.state.practiceQuestions[currentStep - 1].number}
                />
                <p>Answers</p>
                <Buttons 
                    onClickExit={this.props.onClickExit}
                />
            </div>
        )
    }
}