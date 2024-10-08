import React, { Component } from 'react'
import '../component-styles/MenuBoard.css'
import '../component-styles/MainBoard.css'
// TODO:: add ID to each button
const simplified_welcome_title = '准备好了吗?';
const traditional_welcome_title = '準備好了嗎?';
class MoreOptions extends Component {
    constructor(props){
        super(props);
        this.rChar = 'readCharacter';
        this.rNum = 'readNumber';
        this.listen = 'listen';
    }
    
    render(){
        
        const which_button = this.props.isMobile === false ? 'standard-button' : 'mobile-standard-button';
        return(
            <div className='flex-column'>
                    <p className={this.props.isMobile === false ? 'desktop-sub-titles': ''} 
                        style={{
                            margin: '8px 0px 0px 0px',
                            alignSelf:'center', 
                            color: 'rgb(235, 200, 5)'
                        }}>Questions</p>
                    <div className='flex-row margin-top'>
                        <button id='read-character' 
                            className={which_button} 
                            style={{
                                transitionDuration: '0.1s',
                                backgroundColor: this.props.questions.readCharacter ? '#cd071e' : 'white',
                                color: this.props.questions.readCharacter ? 'white' : '#cd071e'}} 
                            onClick={() => this.props.updateQuestions(this.rChar)}
                        >
                            read character
                        </button>
                        <div style={{marginLeft: '0.5em'}}></div>
                        <button id='read-number' 
                            className={which_button}
                            style={{
                                transitionDuration: '0.1s',
                                backgroundColor: this.props.questions.readNumber ? '#cd071e' : 'white',
                                color: this.props.questions.readNumber ? 'white' : '#cd071e'}} 
                            onClick={() => this.props.updateQuestions(this.rNum)}
                        >
                            read number
                        </button>
                        <div style={{marginLeft: '0.5em'}}></div>
                        <button id='listen' 
                            className={which_button}
                            style={{
                                transitionDuration: '0.1s',
                                backgroundColor: this.props.questions.listen ? '#cd071e' : 'white',
                                color: this.props.questions.listen ? 'white' : '#cd071e'}} 
                            onClick={() => this.props.updateQuestions(this.listen)}
                        >
                            listen
                        </button>
                    </div>
                <div className={'margin-top'} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button id='hide-button' onClick={this.props.onClickMoreOptions} className='underline-button' style={{textAlign: 'center'}}>hide</button>
                </div>
            </div>
        );
    }
}

function NumberOptions(props) {
    return (
        <div className='flex-column' >
            <div className='flex-row margin-top'>
                <div className='flex-column'>            
                    <p className={props.isMobile === true ? 'sub-titles' : 'desktop-sub-titles'}>From</p>
                    <input id='min-bound' className={props.isMobile === true ? '' : 'desktop-input'}
                        name={'minBound'} 
                        value={props.minBound} 
                        onChange={props.updateMinBound} 
                        onKeyDown={props.confirmMinIsNumber}
                        onBlur={props.updateMinBoundBlur}
                    />
                </div>
                <div style={{marginLeft: '1em'}}></div>
                <div className='flex-column'>
                    <p className={props.isMobile === true ? 'sub-titles' : 'desktop-sub-titles'} >To</p>
                    <input id='max-bound' className={props.isMobile === true ? '' : 'desktop-input'}
                        name={'maxBound'}
                        value={props.maxBound}    
                        onChange={props.updateMaxBound}
                        onKeyDown={props.confirmMaxIsNumber}
                        onBlur={props.updateMaxBoundBlur}
                    />
                </div>
                <div style={{marginLeft: '1em'}}></div>
                <div className='flex-column'>
                    <p className={props.isMobile === true ? 'sub-titles' : 'desktop-sub-titles'}>How Many</p>
                    <input id='how-many' className={props.isMobile === true ? '' : 'desktop-input'}
                        name={'howMany'}
                        value={props.howMany}
                        onChange={props.updateHowMany}
                        onKeyDown={props.confirmHowMany}
                        onBlur={props.updateHowManyBlur}
                    />
                </div>
            </div>
            <div className='flex-row margin-top'>
                <div className='flex-column'>
                    <p className={props.isMobile === true ? 'sub-titles' : 'desktop-sub-titles'}>Decimal</p>
                    <select 
                        className={props.isMobile === true ? '' : 'desktop-input'}
                        name="decimal" value={props.decimalPlacement} onChange={props.updateDecimalPlacement} id="decimal">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div style={{marginLeft: '1em'}}></div>
                <div className='flex-column'>
                    <p className={props.isMobile === true ? 'sub-titles' : 'desktop-sub-titles'}>Characters</p>
                    <select className={props.isMobile === true ? '' : 'desktop-input'}
                        name="chinese-character-type" value={props.chnCharType} onChange={props.updateChnCharType} id="chinese-character-type" >
                        <option value="sc">简体</option>
                        <option value="tc">繁體</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function Options (props) {
   const which_button = props.isMobile === false ? 'standard-button' : 'mobile-standard-button';
   if (props.moreOptions === false) {
       return (
           <div className='flex-column' style={(props.isMobile === false) ? {width: '100%'}: {}}>
                <NumberOptions
                    isMobile={props.isMobile}
                    minBound={props.minBound}
                    updateMinBound={props.updateMinBound}
                    updateMinBoundBlur={props.updateMinBoundBlur}
                    confirmMinIsNumber={props.confirmMinIsNumber}
                    maxBound={props.maxBound}
                    decimalPlacement={props.decimalPlacement}
                    chnCharType={props.chnCharType}
                    updateMaxBound={props.updateMaxBound}
                    updateMaxBoundBlur={props.updateMaxBoundBlur}
                    updateDecimalPlacement={props.updateDecimalPlacement}
                    confirmMaxIsNumber={props.confirmMaxIsNumber}
                    howMany={props.howMany}
                    updateHowMany={props.updateHowMany}
                    updateHowManyBlur={props.updateHowManyBlur}
                    updateChnCharType={props.updateChnCharType}
                    confirmHowMany={props.confirmHowMany}
                />
                <div className='margin-top' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button id='more-options-button' onClick={props.onClickMoreOptions} className='underline-button'>
                        more options
                    </button>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button 
                        id='start-button'
                        className={which_button}
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
            <div className="flex-column" style={(props.isMobile === false) ? {width: '100%'}: {}}>
                 <NumberOptions
                    isMobile={props.isMobile}
                    minBound={props.minBound}
                    updateMinBound={props.updateMinBound}
                    updateMinBoundBlur={props.updateMinBoundBlur}
                    confirmMinIsNumber={props.confirmMinIsNumber}
                    maxBound={props.maxBound}
                    decimalPlacement={props.decimalPlacement}
                    chnCharType={props.chnCharType}
                    updateMaxBound={props.updateMaxBound}
                    updateMaxBoundBlur={props.updateMaxBoundBlur}
                    updateDecimalPlacement={props.updateDecimalPlacement}
                    confirmMaxIsNumber={props.confirmMaxIsNumber}
                    howMany={props.howMany}
                    updateHowMany={props.updateHowMany}
                    updateHowManyBlur={props.updateHowManyBlur}
                    updateChnCharType={props.updateChnCharType}
                    confirmHowMany={props.confirmHowMany}
                />
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <MoreOptions 
                        isMobile={props.isMobile}
                        questions={props.questions} 
                        started={props.started}
                        onClickMoreOptions={props.onClickMoreOptions} 
                        updateQuestions={props.updateQuestions}
                        updateAnswers={props.updateAnswers}
                        resetQAndA={props.resetQAndA}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button 
                        id='start-button' 
                        className={which_button}
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
class MenuBoard extends Component {
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
        if(this.props.isMobile === true) {
            return (
            <div>
                <div id='welcome-text' className='welcome-text'>
                    {this.props.chnCharType === 'sc'? simplified_welcome_title : traditional_welcome_title}
                </div>
                <div>
                    <Options 
                        isMobile={this.props.isMobile}
                        minBound={this.props.minBound}
                        maxBound={this.props.maxBound}
                        howMany={this.props.howMany}
                        questions={this.props.questions} 
                        started={this.props.started}
                        decimalPlacement={this.props.decimalPlacement}
                        chnCharType={this.props.chnCharType}
                        onClickMoreOptions={this.onClickMoreOptions} 
                        moreOptions={this.state.moreOptions} 
                        updateDecimalPlacement={this.props.updateDecimalPlacement}
                        updateQuestions={this.props.updateQuestions}
                        updateAnswers={this.props.updateAnswers}
                        updateMinBound={this.props.updateMinBound}
                        updateMinBoundBlur={this.props.updateMinBoundBlur}
                        updateMaxBound={this.props.updateMaxBound}
                        updateMaxBoundBlur={this.props.updateMaxBoundBlur}
                        updateHowMany={this.props.updateHowMany}
                        updateHowManyBlur={this.props.updateHowManyBlur}
                        updateChnCharType={this.props.updateChnCharType}
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
        return (
                
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div id='welcome-text' className='welcome-text' style={{display:'flex', flex:'1',alignItems:'flex-end', color: 'white', textAlign: 'center', paddingBottom: '0px', fontSize:'4em'}}>
                    {this.props.chnCharType === 'sc'? simplified_welcome_title : traditional_welcome_title}
                </div>
                <div style={{flex:'3'}}>
                    <Options 
                        isMobile={this.props.isMobile}
                        minBound={this.props.minBound}
                        maxBound={this.props.maxBound}
                        howMany={this.props.howMany}
                        questions={this.props.questions} 
                        started={this.props.started}
                        decimalPlacement={this.props.decimalPlacement}
                        chnCharType={this.props.chnCharType}
                        onClickMoreOptions={this.onClickMoreOptions} 
                        moreOptions={this.state.moreOptions} 
                        updateDecimalPlacement={this.props.updateDecimalPlacement}
                        updateQuestions={this.props.updateQuestions}
                        updateAnswers={this.props.updateAnswers}
                        updateMinBound={this.props.updateMinBound}
                        updateMinBoundBlur={this.props.updateMinBoundBlur}
                        updateMaxBound={this.props.updateMaxBound}
                        updateMaxBoundBlur={this.props.updateMaxBoundBlur}
                        updateHowMany={this.props.updateHowMany}
                        updateHowManyBlur={this.props.updateHowManyBlur}
                        updateChnCharType={this.props.updateChnCharType}
                        confirmMinIsNumber={this.props.confirmMinIsNumber}
                        confirmMaxIsNumber={this.props.confirmMaxIsNumber}
                        confirmHowMany={this.props.confirmHowMany}
                        resetQAndA={this.props.resetQAndA}
                        onClickStart={this.props.onClickStart}
                    /></div>
                </div>
        )
    }
}

export {
    MoreOptions,
    NumberOptions,
    Options,
    MenuBoard
}