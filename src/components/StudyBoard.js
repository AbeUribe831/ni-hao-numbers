import React, { Component } from "react";
import { base64StringToBlob, blobToBase64String } from "blob-util";
import '../component-styles/MenuBoard.css'
import '../component-styles/StudyBoard.css'
import '../component-styles/MainBoard.css'

const AnswerTypes = {'writeCharacter': 'write character', 'writeNumber': 'write number'};

/*--------------------------- Actual Components------------------------------------*/
function CurrentStep(props) {
   return(
       <p className='non-ui-text'>{props.currentStep} / {props.totalSteps}</p>
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
            <button style={{margin: '12px 0 0 0'}}
                className='gg-play-button'
                onClick={() => audio.play() }>
                
            </button>
        );
    }
    return (
        <p className='non-ui-text' style={{textAlign:'center', color:'rgb(235, 200, 5)'}}>{props.currentNumber.question}</p>
    );
}

// change the answer title based on answer type 
function AnswerStep(props) {
    return(
        <div style={{width: '100%', display:'flex', flexDirection:'column' , alignItems: 'center'}}>
            <p style={{textAlign:'center'}} className='non-ui-text'>{AnswerTypes[props.answerType]}</p>
            <input style={{ width:'90%', textAlign: 'center'}}
            name={'answer'}
            value={props.userAnswer}
            onChange={props.updateUserAnswer}
            />
        </div>
    );
}

function Buttons(props) {
    return (
        <div style={{display:'flex', flexDirection:'row'}} >
            <button className='start-button exit-submit-color' onClick={props.onClickExit}>Exit</button>
            <div style={{marginLeft: '0.5em', marginRight: '0.5em'}}/>
            <button 
                className='start-button exit-submit-color' 
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
            <p style={{fontSize: '2em', textAlign: 'center', color: 'white'}}>Loading{this.state.idle_animation}</p>
        )
    }
}
// param: wrongAnswers: object array
// param: howMany: string
function ReviewPage(props) {
    return (
        <div className='white-text' 
            style={{width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'}}
        >
            <CurrentStep
                currentStep={props.wrongAnswers}
            />
        </div>
    ); 
}
class EndPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reviewInstance: -1
        }
        this.startReview = this.startReview.bind(this);
        this.nextReview = this.nextReview.bind(this);
        this.prevReview = this.prevReview.bind(this);
    }
    startReview() {
        this.setState({
            reviewInstance: 0
        });
    }
    nextReview() {
        if(this.state.reviewInstance < this.props.wrongAnswers.length - 1) {
            this.setState((prevState) =>({
                reviewInstance: prevState.reviewInstance + 1
            }));
        }
    }
    prevReview() {
        if(this.state.reviewInstance > 0) {
            this.setState((prevState) =>({
                reviewInstance: prevState.reviewInstance - 1
            }));
        }
    }
    render() {
        if(this.state.reviewInstance == -1) {
            return (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p style={{
                        textAlign: 'center',
                        color: 'rgb(235, 200, 5)',
                        fontSize: '2.5em',
                        marginBottom: '0px'
                    }}>
                        非常好!!!
                    </p>
                    <p style={{
                        marginTop: '20px',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: '1.5em'
                    }}>
                        {this.props.totalCorrect} / {this.props.howMany} correct
                    </p>
                    {this.props.totalCorrect != this.props.howMany && (
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button 
                                className='start-button exit-submit-color'
                                onClick={this.props.onClickExit}>Exit</button>
                            <div style={{paddingLeft:'1em'}}/>
                            <button
                                className='start-button exit-submit-color'
                                onClick={this.startReview}
                            >
                                Review
                            </button>
                        </div>
                    )}
                    {this.props.totalCorrect == this.props.howMany && (
                        <button
                            className='start-button exit-submit-color'
                            onClick={this.props.onClickExit}>Exit</button>
                    )}
                </div>
            );
        }
        else {
            console.log(this.state.reviewInstance)
            const wrongAnswer = this.props.wrongAnswers[this.state.reviewInstance];
            return (
                <div className='white-text' 
                    style={{
                        width: '100%', 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'}}
                >
                    <CurrentStep
                        currentStep={wrongAnswer.step}
                        totalSteps={this.props.howMany}
                    />
                    <QuestionStep
                        currentNumber={wrongAnswer.practiceQuestion}
                    />
                    <div style={{textAlign: 'center'}}>
                        <p className='non-ui-text'>{AnswerTypes[wrongAnswer.practiceQuestion['answer_type']]}</p>
                        <p className='non-ui-text' style={{color:'red'}}>{wrongAnswer.wrongAnswer}</p>
                        <p className='non-ui-text'>correct answer</p>
                        <p className='non-ui-text' style={{marginBottom:'0.5em'}}>{wrongAnswer.practiceQuestion['answer']}</p>
                    </div>
                    <div style={{display:'flex', flexDirection: 'row'}}>
                        <button className='review-buttons' onClick={this.prevReview} 
                            style={(this.state.reviewInstance != 0) ? 
                                {marginRight: '0.5em', visibility:'visible'}
                                :{marginRight: '0.5em', visibility:'hidden'}}>
                                &laquo; prev 
                        </button>
                        <button
                            className='review-buttons'
                            onClick={this.props.onClickExit}>Exit</button>
                            <button className='review-buttons' onClick={this.nextReview}
                                style={(this.state.reviewInstance != this.props.wrongAnswers.length - 1) ? 
                                    {marginLeft: '0.5em', visibility:'visible'}
                                    :{marginLeft: '0.5em', visibility: 'hidden'}}>
                                next &raquo;
                            </button>
                    </div>
                </div>
            );
        }
    }
}
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
        let practiceQuestions = [];
        
        this.state = {
            currentStep: -1,
            totalCorrect: 0,
            practiceQuestions: practiceQuestions,
            wrongAnswers: [],
            userAnswer: ''
        }
        // TODO:: after practiceQuestions is filled use a promise to either get translated questions and answers or call onClickExit
        
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.updateUserAnswer = this.updateUserAnswer.bind(this);
    }
    onClickSubmit() {
        const userAnswer = this.state.userAnswer;
        const correctAnswer = this.state.practiceQuestions[this.state.currentStep - 1]['answer'];
        if(userAnswer == correctAnswer) {
            this.setState((prevState) => ({
                totalCorrect: prevState.totalCorrect + 1,
                currentStep: prevState.currentStep + 1,
                userAnswer: ''
            }));
        }
        else {
            this.setState((prevState) => ({
                currentStep: prevState.currentStep + 1,
                wrongAnswers: [...prevState.wrongAnswers, {
                    'practiceQuestion': prevState.practiceQuestions[prevState.currentStep - 1],
                    'wrongAnswer': prevState.userAnswer,
                    'step': prevState.currentStep
                }],
                userAnswer: ''
            }));
        }
    }
    updateUserAnswer(event) {
        this.setState({
            userAnswer: event.target.value 
        });
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
        const currentStep = this.state.currentStep;
        if(this.props.loading || currentStep === -1) {
            return (
                <Loader/>
            );
        }
        const howMany = parseInt(this.props.howMany);
        if (currentStep <= howMany) {
            // const currentNumber = this.state.practiceQuestions[currentStep - 1].number;
            const currentNumber = this.state.practiceQuestions[currentStep - 1];
            return (
                <div className='white-text' 
                    style={{
                        width: '100%', 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'}}
                >
                    <CurrentStep 
                        currentStep={currentStep}
                        totalSteps={this.props.howMany}
                    />
                    <QuestionStep
                        currentNumber={currentNumber}
                    />
                    <AnswerStep
                        answerType={currentNumber.answer_type}
                        userAnswer={this.state.userAnswer}
                        updateUserAnswer={this.updateUserAnswer}
                    />
                    <div style={{marginTop:'1em'}}/>
                    <Buttons 
                        onClickExit={this.props.onClickExit}
                        onClickSubmit={this.onClickSubmit}
                    />
                </div>
            ) 
        } 
        return(
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                    <EndPage 
                        onClickExit={this.props.onClickExit}
                        howMany={this.props.howMany}    
                        totalCorrect={this.state.totalCorrect}
                        wrongAnswers={this.state.wrongAnswers}
                    />
                </div>

        )
    }
}