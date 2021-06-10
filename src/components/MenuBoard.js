import React, { Component } from 'react'
import '../component-styles/MenuBoard.css'
import '../component-styles/MainBoard.css'

// TODO:: add ID to each button
class MoreOptions extends Component {
    constructor(props){
        super(props);
        this.rChar = 'readCharacter';
        this.rNum = 'readNumber';
        this.listen = 'listen';
    }

    componentWillUnmount() {
        this.props.resetQAndA();
    }

    render(){
        return(
            <div className='flex-column'>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <p className={'no-padding-margin'}>questions:</p>
                    <div style={{flexWrap: 'nowrap'}}>
                        <button 
                            style={{backgroundColor: this.props.questions.readCharacter ? '#07CDB6' : 'white'}} 
                            onClick={() => this.props.updateQuestions(this.rChar)}
                        >
                            read character
                        </button>
                        <button 
                            style={{backgroundColor: this.props.questions.readNumber ? '#07CDB6' : 'white'}} 
                            onClick={() => this.props.updateQuestions(this.rNum)}
                        >
                            read number
                        </button>
                        <button 
                            style={{backgroundColor: this.props.questions.listen ? '#07CDB6' : 'white'}} 
                            onClick={() => this.props.updateQuestions(this.listen)}
                        >
                            listen
                        </button>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <p className={'no-padding-margin'}>answers:</p>
                    <div style={{flexWrap: 'nowrap'}}>
                        <button 
                            style={{backgroundColor: this.props.answers.speak ? '#07CDB6' : 'white'}} 
                            onClick={this.props.updateAnswers}>speak</button>
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button onClick={this.props.onClickMoreOptions} className='underline-button' style={{textAlign: 'center'}}>hide</button>
                </div>
            </div>
        );
    }
}

function Options (props) {
   if (props.moreOptions === false) {
       return (
           <div className='flex-column'>
                <div className='row-flex-wrap' style={{alignItems: 'center', justifyContent: 'center'}}>
                    <p>range: </p>
                    <input 
                        name={'minBound'} 
                        value={props.minBound} 
                        onChange={props.updateMinBound} 
                        onKeyDown={props.confirmMinIsNumber}
                    />
                    <p>to</p>
                    <input 
                        name={'maxBound'}
                        value={props.maxBound}    
                        onChange={props.updateMaxBound}
                        onKeyDown={props.confirmMaxIsNumber}
                    />
                    <p>how many: </p>
                    <input 
                        name={'howMany'}
                        value={props.howMany}
                        onChange={props.updateHowMany}
                        onKeyDown={props.confirmHowMany}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button onClick={props.onClickMoreOptions} className='underline-button' style={{textAlign: 'center'}}>more options</button>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button 
                        style={{type: 'button', cursor: 'pointer'}}
                        onClick={props.onClickStart}
                    >
                        start
                    </button>
                </div>
           </div>
       )
   } 
   return (
            <div className="flex-column">
                <div className='row-flex-wrap' style={{alignItems: 'center', justifyContent: 'center'}}>
                    <p>range: </p>
                    <input 
                        name={'minBound'} 
                        value={props.minBound} 
                        onChange={props.updateMinBound} 
                        onKeyDown={props.confirmMinIsNumber}
                    />
                    <p>to</p>
                    <input 
                        name={'maxBound'}
                        value={props.maxBound}    
                        onChange={props.updateMaxBound}
                        onKeyDown={props.confirmMaxIsNumber}
                    />
                    <p>how many: </p>
                    <input 
                        name={'howMany'}
                        value={props.howMany}
                        onChange={props.updateHowMany}
                        onKeyDown={props.confirmHowMany}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <MoreOptions 
                        questions={props.questions} 
                        answers={props.answers} 
                        onClickMoreOptions={props.onClickMoreOptions} 
                        updateQuestions={props.updateQuestions}
                        updateAnswers={props.updateAnswers}
                        resetQAndA={props.resetQAndA}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button 
                        style={{type: 'button', cursor: 'pointer'}}
                        onClick={props.onClickStart}
                    >
                        start
                    </button>
                </div>
           </div>
   )
}
// props: {questions, answers}
export default class MenuBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moreOptions: false,
        }
        this.onClickMoreOptions = this.onClickMoreOptions.bind(this);
    }
    onClickMoreOptions() {
        this.setState((prevState) => {
            return ({
                    moreOptions: !prevState.moreOptions
            });
        });
    }
    render() {
        return (
            <div>
                <div className='welcome-text'>
                    准备好了吗？
                </div>
                <Options 
                    minBound={this.props.minBound}
                    maxBound={this.props.maxBound}
                    howMany={this.props.howMany}
                    questions={this.props.questions} 
                    answers={this.props.answers}
                    onClickMoreOptions={this.onClickMoreOptions} 
                    moreOptions={this.state.moreOptions} 
                    updateQuestions={this.props.updateQuestions}
                    updateAnswers={this.props.updateAnswers}
                    updateMinBound={this.props.updateMinBound}
                    updateMaxBound={this.props.updateMaxBound}
                    updateHowMany={this.props.updateHowMany}
                    confirmMinIsNumber={this.props.confirmMinIsNumber}
                    confirmMaxIsNumber={this.props.confirmMaxIsNumber}
                    confirmHowMany={this.props.confirmHowMany}
                    resetQAndA={this.props.resetQAndA}
                    onClickStart={this.props.onClickStart}
                />
            </div>
        )
    }
}