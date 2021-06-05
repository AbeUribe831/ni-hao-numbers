import React, { Component } from 'react'
import '../component-styles/MenuBoard.css'
import '../component-styles/MainBoard.css'
// TODO:: on update change the background color of each button
// TODO:: make an OnClick method to update state of MainBoard
// TODO:: add ID to each button
function MoreOptions(props) {
    return(
        <div className='flex-column'>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <p className={'no-padding-margin'}>questions:</p>
                <div style={{flexWrap: 'nowrap'}}>
                    <button>read character</button>
                    <button>read number</button>
                    <button>listen</button>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <p className={'no-padding-margin'}>answers:</p>
                <div style={{flexWrap: 'nowrap'}}>
                    <button>speak</button>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <button onClick={props.onClickMoreOptions} className='underline-button' style={{textAlign: 'center'}}>hide</button>
            </div>
        </div>
    )
}

function Options (props) {
   if (props.moreOptions === false) {
       return (
           <div className='flex-column'>
                <div className='row-flex-wrap' style={{alignItems: 'center', justifyContent: 'center'}}>
                    <p>range: </p>
                    <input type={'number'} name={'start'} />
                    <p>to</p>
                    <input type={'number'} name={'end'} />
                    <p>how many: </p>
                    <input type={'number'} name={'howMany'} />
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button onClick={props.onClickMoreOptions} className='underline-button' style={{textAlign: 'center'}}>more options</button>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button style={{type: 'button', cursor: 'pointer'}}>start</button>
                </div>
           </div>
       )
   } 
   return (
            <div className="flex-column">
                <div className='row-flex-wrap' style={{alignItems: 'center', justifyContent: 'center'}}>
                    <p>range: </p>
                    <input type={'number'} name={'start'} />
                    <p>to</p>
                    <input type={'number'} name={'end'} />
                    <p>how many: </p>
                    <input type={'number'} name={'howMany'} />
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <MoreOptions onClickMoreOptions={props.onClickMoreOptions} />
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <button style={{type: 'button', cursor: 'pointer'}}>start</button>
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
            // hide the other options
            if (prevState.moreOptions === true){
                this.props.updateQuestionsAndAnswers(
                    ['chars', 'num', 'listen'],
                    []);
            }
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
                <Options questions={this.props.questions} answers={this.props.answers} onClickMoreOptions={this.onClickMoreOptions} moreOptions={this.state.moreOptions} />
            </div>
        )
    }
}