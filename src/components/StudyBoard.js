import React, { Component } from "react";
import { base64StringToBlob } from "blob-util";
import '../component-styles/MenuBoard.css'
import '../component-styles/StudyBoard.css'
import '../component-styles/MainBoard.css'

const AnswerTypes = {'writeCharacter': 'write character', 'writeNumber': 'write number'};

function isOverflown(element, defaultHeight) {
    console.log(element);
    return element.scrollHeight > defaultHeight;
}

function adjustTextQuestion(textElementName) {
    let textElement = document.getElementById(textElementName);
    console.log('adjusted');
    if(textElement !== null) {
        console.log('will auto ', textElement)
        textElement.style.height = 'auto';
        if (isOverflown(textElement, 35)) {
            textElement.style.height = '64px';
        }
        else {
            textElement.style.height = '35px';
        }    
    }
}
/*--------------------------- Actual Components------------------------------------*/
function CurrentStep(props) {
   return(
       <p className={props.isMobile === false ? 'non-ui-desktop-text' : 'non-ui-text'}>{props.currentStep} / {props.totalSteps}</p>
   );
}
// else display props.question
// TODO:: create a new button for listening
// TODO:: on unmount stop audio (so audio doesn't play after submit is done)
class QuestionStep extends Component {
    constructor(props) {
        super(props);
        // we want a fixed height in em of the questions depending on the device type
        this.state = {
            height: this.props.isMobile ? 80 : 110 
        }
        // addding this event window to adjust the height of question div if the number is too long for its window
        window.addEventListener('resize', adjustTextQuestion('textQuestion'));
    }
    // pauses the audio if user goes to next number and do not pause audio if user is tying answer
       getSnapshotBeforeUpdate(prevProps, prevState) {
           if(prevProps.audio !== null && (prevProps.currentNumber !== this.props.currentNumber || prevProps.userAnswer === this.props.userAnswer)) {
               prevProps.audio.pause();
           }
           return null;
        }
       // only here to get rid of the warning for getSnapshotBeforeUpdate method
       componentDidUpdate() {
            return;
       }
        componentWillUnmount() {
            if (this.props.audio != null) {
                this.props.audio.pause();
            }
            window.removeEventListener('resize', adjustTextQuestion(document.getElementById('textQuestion')));
        }
        // plays or resets the audio when button in clicked
        playAudio() {
            if(!this.props.audio.paused) {
                this.props.audio.currentTime=0;
            }
            else {
                this.props.audio.play();
            }
        }
        render() {
            if (this.props.audio != null) {
                return (
                    <div style={{display:'flex', flexDirection:'column', alignItems: 'center', height: this.state.height + 'px'}}>
                        <button style={{ margin: '10px 0 0 0'}}
                            className={this.props.isMobile === false ? 'desktop-gg-play-button' : 'gg-play-button'}
                            onClick={() => this.playAudio() }>
                        </button>
                        <select 
                            name='listen-speed'
                            id='listen-speed'
                            defaultValue={'1'}
                            style={!this.props.isMobile ? {fontSize:'medium'}: {}}
                            onClick={(event) => this.props.audio.playbackRate=parseFloat(event.target.value)}>
                            <option value='0.5'>x0.5</option>
                            <option value='0.75'>x0.75</option>
                            <option value='1'>x1</option>
                        </select>
                    </div>
                );
            }
            return (
                <div style={{display:'flex', flexDirection:'column', alignItems: 'center', height: this.state.height + 'px', justifyContent: 'center'}}>
                    <p id='textQuestion' className={this.props.isMobile === false ? 'non-ui-desktop-text' : 'non-ui-text'} style={{textAlign:'center', color:'rgb(235, 200, 5)'}}>{this.props.currentNumber.question}</p>
                </div>
            );
        }
}

// change the answer title based on answer type 
function AnswerStep(props) {
    return(
        <div style={{width: '100%', display:'flex', flexDirection:'column' , alignItems: 'center'}}>
            <p style={{textAlign:'center'}} className={props.isMobile === false ? 'non-ui-desktop-text' : 'non-ui-text'}>{AnswerTypes[props.answerType]}</p>
            <input style={props.isMobile === false ? {width:'90%', textAlign: 'center', fontSize: '2.5em'} : {width:'90%', textAlign: 'center', fontSize: '1.5em'}}
            name={'answer'}
            value={props.userAnswer}
            onChange={props.updateUserAnswer}
            onKeyPress={(e) => {if(e.key === 'Enter') {props.onEnterSubmit()}}}
            />
        </div>
    );
}

function Buttons(props) {
    const which_button = props.isMobile === false ? 'standard-button exit-submit-color' : 'mobile-standard-button exit-submit-color';
    return (
        <div style={{display:'flex', flexDirection:'row'}} >
            <button className={which_button} onClick={props.onClickExit}>Exit</button>
            <div style={{marginLeft: '0.5em', marginRight: '0.5em'}}/>
            <button 
                className={which_button} 
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
        const which_button = this.props.isMobile === false ? 'standard-button exit-submit-color' : 'mobile-standard-button exit-submit-color';
        if(this.state.reviewInstance === -1) {
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
                    {this.props.totalCorrect !== this.props.howMany && (
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button 
                                className={which_button}
                                onClick={this.props.onClickExit}>Exit</button>
                            <div style={{paddingLeft:'1em'}}/>
                            <button
                                className={which_button}
                                onClick={this.startReview}
                            >
                                Review
                            </button>
                        </div>
                    )}
                    {this.props.totalCorrect === this.props.howMany && (
                        <button
                            className={which_button}
                            onClick={this.props.onClickExit}>Exit</button>
                    )}
                </div>
            );
        }
        // the review UI
        else {
            const desktop_review_button = this.props.isMobile === false;
            const wrongAnswer = this.props.wrongAnswers[this.state.reviewInstance];
            return (
                <div className='white-text center-aligned-flex' >
                    <CurrentStep
                        isMobile={this.props.isMobile}
                        currentStep={wrongAnswer.step}
                        totalSteps={this.props.howMany}
                    />
                    <QuestionStep
                        isMobile={this.props.isMobile}
                        currentNumber={wrongAnswer.practiceQuestion}
                        audio={this.props.createAudio(wrongAnswer.practiceQuestion)}
                        userAnswer={wrongAnswer.wrongAnswer}
                    />
                    {desktop_review_button && (
                        <div className='center-aligned-flex'>
                            <div style={{textAlign: 'center'}}>
                                <p className='non-ui-desktop-text'>{AnswerTypes[wrongAnswer.practiceQuestion['answer_type']]}</p>
                                <p className='non-ui-desktop-text' style={{color:'red'}}>{wrongAnswer.wrongAnswer}</p>
                                <p className='non-ui-desktop-text'>correct answer</p>
                                <p className='non-ui-desktop-text' style={{marginBottom:'0.5em', color: '#1338c6'}}>{wrongAnswer.practiceQuestion['answer']}</p>
                            </div>
                            <div style={{display:'flex', flexDirection: 'row', paddingBottom: '1em'}}>
                                    
                                <button className='desktop-review-button' onClick={this.prevReview} 
                                    style={(this.state.reviewInstance !== 0) ? 
                                        {marginRight: '0.5em', visibility:'visible'}
                                        :{marginRight: '0.5em', visibility:'hidden'}}>
                                        &laquo; prev 
                                </button>
                                <button
                                    className='desktop-review-button'
                                    onClick={this.props.onClickExit}>
                                    Exit
                                </button>
                                <button className='desktop-review-button' onClick={this.nextReview}
                                    style={(this.state.reviewInstance !== this.props.wrongAnswers.length - 1) ? 
                                        {marginLeft: '0.5em', visibility:'visible'}
                                        :{marginLeft: '0.5em', visibility: 'hidden'}}>
                                    next &raquo;
                                </button>
                            </div>
                        </div>
                    )}
                    {!desktop_review_button && (
                        <div className='center-aligned-flex'>
                            <div style={{textAlign: 'center'}}>
                                <p className='non-ui-text'>{AnswerTypes[wrongAnswer.practiceQuestion['answer_type']]}</p>
                                <p className='non-ui-text' style={{color:'red'}}>{wrongAnswer.wrongAnswer}</p>
                                <p className='non-ui-text'>correct answer</p>
                                <p className='non-ui-text' style={{marginBottom:'0.5em'}}>{wrongAnswer.practiceQuestion['answer']}</p>
                            </div>
                            <div style={{display:'flex', flexDirection: 'row', paddingBottom: '1em'}}>
                                    
                                <button className='mobile-standard-button exit-submit-color' onClick={this.prevReview} 
                                    style={(this.state.reviewInstance !== 0) ? 
                                        {marginRight: '0.5em', visibility:'visible'}
                                        :{marginRight: '0.5em', visibility:'hidden'}}>
                                        &laquo; prev 
                                </button>
                                <button
                                    className='mobile-standard-button exit-submit-color'
                                    onClick={this.props.onClickExit}>
                                    Exit
                                </button>
                                <button className='mobile-standard-button exit-submit-color' onClick={this.nextReview}
                                    style={(this.state.reviewInstance !== this.props.wrongAnswers.length - 1) ? 
                                        {marginLeft: '0.5em', visibility:'visible'}
                                        :{marginLeft: '0.5em', visibility: 'hidden'}}>
                                    next &raquo;
                                </button>
                            </div>
                        </div>
                    )}
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
        this.createAudio = this.createAudio.bind(this);
    }
    onClickSubmit() {
        const userAnswer = this.state.userAnswer;
        const correctAnswer = this.state.practiceQuestions[this.state.currentStep - 1]['answer'];
        if(userAnswer === correctAnswer) {
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
            .then(response => {
                if (response.status >= 400 && response.status <= 500) {
                    //throw response.statusText;
                   throw response.text();
                }
                console.log(response.status)
                console.log(response)
                return response.json()
            }).then(translated_data => {
                console.log('translated data ',translated_data)
                this.setState(() => ({
                    currentStep: 1,
                    practiceQuestions: translated_data,
                }));
                this.props.updateLoading();
            }).catch(e => {
                // used for network error
                if(e instanceof TypeError) {
                    console.log(e)
                }
                else {
                    e.then(value => {
                        console.log(value)
                    });
                }
                // testing this line
                this.props.updateLoading();
                this.props.onClickExit();
            });
    }
    componentWillUnmount() {
        this.props.resetQAndA();
    }

    createAudio(currentNumber) {
        if(currentNumber.listen != null) {
            // convert base64 string to Audio via blob -> url -> audio
            const base64Audio = currentNumber.listen;
            const blob = base64StringToBlob(base64Audio);
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            return audio;
        }
        return null;
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
            const audio = this.createAudio(currentNumber);
            return (
                <div className='white-text' 
                    style={{
                        width: '100%', 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'}}
                >
                    <CurrentStep 
                        isMobile={this.props.isMobile}
                        currentStep={currentStep}
                        totalSteps={this.props.howMany}
                    />
                    <QuestionStep
                        isMobile={this.props.isMobile}
                        currentNumber={currentNumber}
                        audio={audio}
                        userAnswer={this.state.userAnswer}
                    />
                    <AnswerStep
                        isMobile={this.props.isMobile}
                        answerType={currentNumber.answer_type}
                        userAnswer={this.state.userAnswer}
                        updateUserAnswer={this.updateUserAnswer}
                        onEnterSubmit={this.onClickSubmit}
                    />
                    <div style={{marginTop:'1em'}}/>
                    <Buttons 
                        isMobile={this.props.isMobile}
                        onClickExit={this.props.onClickExit}
                        onClickSubmit={this.onClickSubmit}
                    />
                </div>
            ) 
        } 
        return(
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                    <EndPage 
                        isMobile={this.props.isMobile}
                        onClickExit={this.props.onClickExit}
                        howMany={this.props.howMany}    
                        totalCorrect={this.state.totalCorrect}
                        wrongAnswers={this.state.wrongAnswers}
                        createAudio={this.createAudio}
                    />
                </div>

        )
    }
}