import { Component } from "react";
import { base64StringToBlob, blobToBase64String } from "blob-util";
import '../component-styles/MenuBoard.css'
import '../component-styles/StudyBoard.css'

const AnswerTypes = ['writeCharacter', 'writeNumber', 'speak'];

function getRandomInclusiveInt(min, max) {
    var minNum = parseInt(min);
    var maxNum = parseInt(max);
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}
// TODO:: figure out either having a set decimal percision or user decided or input based
function getRandomInclusiveFloat(min, max) {
    var minNum = parseFloat(min);
    var maxNum = parseFloat(max);
    return Math.random() * (maxNum - minNum + 1) + minNum;
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
/*--------------------------- Actual Components------------------------------------*/
function CurrentStep(props) {
   return(
       <p styles={{fontSize: '2em'}}>{props.currentStep} / {props.totalSteps}</p>
   );
}
// else display props.question
// TODO:: create a new button for listening
// TODO:: on unmount stop audio (so audio doesn't play after submit is done)
function QuestionStep(props) {
    console.log(props);
    if(props.currentNumber.listen != null) {
        // convert base64 string to Audio via blob -> url -> audio
        const base64Audio = props.currentNumber.listen;
        console.log(atob(base64Audio));
        const blob = base64StringToBlob(base64Audio);
        console.log(blob);
        const url = URL.createObjectURL(blob);
        console.log(url);
        const audio = new Audio(url);
        
        return (
            <button 
                className='basic-button'
                onClick={() => audio.play() }>
                Play
            </button>
        );
    }
    return (
        <p>{props.currentNumber.question}</p>
    );
}

function Buttons(props) {
    return (
        <div className='row-flex-wrap' >
            <button className='basic-button' onClick={props.onClickExit}>Exit</button>
            <div style={{marginLeft: '0.5em', marginRight: '0.5em'}}/>
            <button 
                className='basic-button'
                onClick={props.onClickSubmit}>Sumbit</button>
        </div>
    );
}
class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idle_animation: '.'
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            if(this.state.idle_animation.length >= 3) {
                this.setState({
                    idle_animation:'.'
                });
            }
            else {
                this.setState((prevState) => ({
                    idle_animation: prevState.idle_animation + '.'
                }));
            }
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <p>Loading{this.state.idle_animation}</p>
        )
    }
}
function EndPage(props) {
    return (
        <div>
            <p>非常好</p>
            <button 
                className='basic-button'
                onClick={props.onClickExit}>Exit</button>
        </div>
    )
}
// TODO:: make user answer a state updated by Answer component
// TODO:: get numbers from google translate
// TODO:: add a loading page between StudyBoard and post mount
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
        // creates list of objects that contain the each number the user will practice with along with the 
        // type of question: like read the numbers as arabic numberal or chineses characters or listening audio
        // type of answers: either speaking, writing numbers as characters, or write numbers arabic numerals
        const sizeOfList = this.props.howMany;
        let minBound = this.props.minBound;
        let maxBound = this.props.maxBound;
        let decimalPlacement = this.props.decimalPlacement;
        let practiceQuestions = [];
        /*
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
                question_type: questionType,
                answer_type: getAnswerType(questionType, speak)
            });
        }
        */
        this.state = {
            currentNumber: 0,
            practiceQuestions: practiceQuestions
        }
        // TODO:: after practiceQuestions is filled use a promise to either get translated questions and answers or call onClickExit
        
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }
    onClickSubmit() {
        this.setState((prevState) => ({
            currentStep: prevState.currentStep + 1
        }));
    }
    componentDidMount() {
        /*
        const requestOptions = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({practice_questions: this.state.practiceQuestions})
        };
        */
       const requestOptions = {
           method: "POST",
           mode: "cors",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
                min_bound: this.props.minBound,
                max_bound: this.props.maxBound,
                how_many: this.props.howMany,
                decimal_placement: this.props.decimalPlacement,
                questions: this.props.questions,
                answers: this.props.answers,
                chn_char_type: this.props.chnCharType

           })
        }
        this.props.updateLoading();
        fetch('http://localhost:5000/studyboardSetup', requestOptions)
            .then(response => response.json())
            .then(translated_data => {
                console.log(translated_data);
                this.setState(() => ({
                    currentStep: 1,
                    practiceQuestions: translated_data,
                }));
                this.props.updateLoading();
            }).catch(e => {
                console.log(e);
                this.props.onClickExit();
            });
    }
    componentWillUnmount() {
        this.props.resetQAndA();
    }
    render() {
        if(this.props.loading) {
            return (
                <Loader/>
            );
        }
        const currentStep = this.state.currentStep;
        const howMany = parseInt(this.props.howMany);
        if (currentStep <= howMany) {
            // const currentNumber = this.state.practiceQuestions[currentStep - 1].number;
            const currentNumber = this.state.practiceQuestions[currentStep - 1];
            return (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                    <CurrentStep 
                        currentStep={currentStep}
                        totalSteps={this.props.howMany}
                    />
                    <QuestionStep
                        currentNumber={currentNumber}
                    />
                    <p>Answers</p>
                    <Buttons 
                        onClickExit={this.props.onClickExit}
                        onClickSubmit={this.onClickSubmit}
                    />
                </div>
            ) 
        } 
        return(
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                    <EndPage onClickExit={this.props.onClickExit} />
                </div>

        )
    }
}