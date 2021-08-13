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
    
    render(){
        return(
            <div className='flex-column'>
                    <p className={'no-padding-margin margin-top'} style={{fontWeight: 'bold', alignSelf:'center', color: 'white'}}>Questions</p>
                    <div className='flex-row margin-top'>
                        <button className='question-button' 
                            style={{
                                backgroundColor: this.props.questions.readCharacter ? '#cd071e' : 'white',
                                color: this.props.questions.readCharacter ? 'white' : '#cd071e'}} 
                            onClick={() => this.props.updateQuestions(this.rChar)}
                        >
                            read character
                        </button>
                        <div style={{marginLeft: '0.5em'}}></div>
                        <button className='question-button'
                            style={{
                                backgroundColor: this.props.questions.readNumber ? '#cd071e' : 'white',
                                color: this.props.questions.readNumber ? 'white' : '#cd071e'}} 
                            onClick={() => this.props.updateQuestions(this.rNum)}
                        >
                            read number
                        </button>
                        <div style={{marginLeft: '0.5em'}}></div>
                        <button className='question-button'
                            style={{
                                backgroundColor: this.props.questions.listen ? '#cd071e' : 'white',
                                color: this.props.questions.listen ? 'white' : '#cd071e'}} 
                            onClick={() => this.props.updateQuestions(this.listen)}
                        >
                            listen
                        </button>
                    </div>
                <div className={'margin-top'} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button onClick={this.props.onClickMoreOptions} className='underline-button' style={{textAlign: 'center'}}>hide</button>
                </div>
            </div>
        );
    }
}

function NumberOptions(props) {
    return (
        <div className='flex-column'>
            <div className='flex-row margin-top'>
                <div className='flex-column'>            
                    <p className='sub-titles'>From</p>
                    <input
                        name={'minBound'} 
                        value={props.minBound} 
                        onChange={props.updateMinBound} 
                        onKeyDown={props.confirmMinIsNumber}
                    />
                </div>
                <div style={{marginLeft: '1em'}}></div>
                <div className='flex-column'>
                    <p className='sub-titles'>To</p>
                    <input
                        name={'maxBound'}
                        value={props.maxBound}    
                        onChange={props.updateMaxBound}
                        onKeyDown={props.confirmMaxIsNumber}
                    />
                </div>
                <div style={{marginLeft: '1em'}}></div>
                <div className='flex-column'>
                    <p className='sub-titles'>How Many</p>
                    <input
                        name={'howMany'}
                        value={props.howMany}
                        onChange={props.updateHowMany}
                        onKeyDown={props.confirmHowMany}
                    />
                </div>
            </div>
            <div className='flex-row margin-top'>
                <div className='flex-column'>
                    <p className='sub-titles'>Decimal</p>
                    <select name="decimal" value={props.decimalPlacement} onChange={props.updateDecimalPlacement} id="decimal">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div style={{marginLeft: '1em'}}></div>
                <div className='flex-column'>
                    <p className='sub-titles'>Characters</p>
                    <select name="chinese-character-type"   id="chinese-character-type">
                        <option value="simplified">简体</option>
                        <option value="traditional">繁體</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function Options (props) {
   if (props.moreOptions === false) {
       return (
           <div className='flex-column'>
                <NumberOptions
                    minBound={props.minBound}
                    updateMinBound={props.updateMinBound}
                    confirmMinIsNumber={props.confirmMinIsNumber}
                    maxBound={props.maxBound}
                    decimalPlacement={props.decimalPlacement}
                    updateMaxBound={props.updateMaxBound}
                    updateDecimalPlacement={props.updateDecimalPlacement}
                    confirmMaxIsNumber={props.confirmMaxIsNumber}
                    howMany={props.howMany}
                    updateHowMany={props.updateHowMany}
                    confirmHowMany={props.confirmHowMany}
                />
                <div className='margin-top' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button onClick={props.onClickMoreOptions} className='underline-button'>
                        more options
                    </button>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button className='question-button'
                        style={{color: 'white', backgroundColor: '#cd071e', type: 'button', cursor: 'pointer'}}
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
                 <NumberOptions
                    minBound={props.minBound}
                    updateMinBound={props.updateMinBound}
                    confirmMinIsNumber={props.confirmMinIsNumber}
                    maxBound={props.maxBound}
                    updateDecimalPlacement={props.updateDecimalPlacement}
                    updateMaxBound={props.updateMaxBound}
                    confirmMaxIsNumber={props.confirmMaxIsNumber}
                    howMany={props.howMany}
                    updateHowMany={props.updateHowMany}
                    confirmHowMany={props.confirmHowMany}
                />
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <MoreOptions 
                        questions={props.questions} 
                        answers={props.answers} 
                        started={props.started}
                        onClickMoreOptions={props.onClickMoreOptions} 
                        updateQuestions={props.updateQuestions}
                        updateAnswers={props.updateAnswers}
                        resetQAndA={props.resetQAndA}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button className='question-button'
                        style={{color: 'white', backgroundColor: '#cd071e', type: 'button', cursor: 'pointer'}}
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
        this.props.resetQAndA();
    }
    // in from add : <form onClick={this.method}
    render() {
        return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{flexDirection: 'column'}}>
                <div className='welcome-text'>
                    准备好了吗？
                </div>
                    <Options 
                        minBound={this.props.minBound}
                        maxBound={this.props.maxBound}
                        howMany={this.props.howMany}
                        questions={this.props.questions} 
                        answers={this.props.answers}
                        started={this.props.started}
                        decimalPlacement={this.props.decimalPlacement}
                        onClickMoreOptions={this.onClickMoreOptions} 
                        moreOptions={this.state.moreOptions} 
                        updateDecimalPlacement={this.props.updateDecimalPlacement}
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
            </div>
        )
    }
}