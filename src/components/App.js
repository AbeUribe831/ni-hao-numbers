import React, {Component} from 'react';
import '../component-styles/App.css';
import MainBoard from './MainBoard'
import Resources from './Resources'
import {
    BrowserRouter,
    Link,
    Route
} from 'react-router-dom'

// App will manage the state to pass between routes, including login

// Have nav component with signin button for signin component and home page
// main page is main board 
// signin is signup component
// TODO:: add a css class to add a container for the main board / signin
// change Eng button to select div

// will treat (0, 1224px] as mobile / tablet
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_mobile: window.matchMedia("(max-width: 800px)").matches,
    }
    this.highlightClickedPage = this.highlightClickedPage.bind(this); 
  }
  componentDidMount() {
    const handler = e => this.setState({is_mobile: e.matches});
    window.matchMedia("(max-width: 800px)").addEventListener('change', handler);
  }
  // changle color to the current page
  highlightClickedPage(table_id) {
    var table_row = document.getElementById('mobile-nav-bar-table').rows[0];
    console.log(table_id)
    console.log(table_row);
    for (var i = 0; i < table_row.cells.length; i++) {
      if(table_id === table_row.cells[i].id) {
        table_row.cells[i].lastChild.style.color = '#cd071e';
      }
      else {
        table_row.cells[i].lastChild.style.color = 'white';
      }
    }
  }
  // add flex of main body in the main board
  render() {
  return (
    <div style={{height: '100%'}}>
      {!this.state.is_mobile && (
        <p>not mobile</p>
      )}
      {this.state.is_mobile && (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <div className='header-bar' style={{flex:'0 1 3em'}}>
            <p style={{fontFamily:'KaiTi, sans-serif', textAlign: 'center', color: 'white'}}>你 好 numbers</p>
          </div>
            <BrowserRouter>
              <Route exact path='/' component={MainBoard}/>
              <Route path='/resources' component={Resources}/> 
             <nav>
                <table id='mobile-nav-bar-table' style={{flex:'1', paddingBottom: '0.5em'}}className='mobile-nav-bar'>
                  <tbody>
                    <tr>
                      <th id='home-th' ><Link onClick={() => this.highlightClickedPage('home-th')} style={{color: '#cd071e'}} to='/'>Home</Link></th>
                      <th id='resources-th'><Link onClick={() => this.highlightClickedPage('resources-th')} style={{color: 'white'}} to='/resources'>Resources</Link></th>
                    </tr>
                  </tbody>
                </table>
              </nav>
            </BrowserRouter>
        </div>
      )}
   </div>
  );
  }
}
/*
function App() {
  return (
    <div>
     <ul className="nav-bar">
            <BrowserRouter>
                <nav>
                    <li className="nav-bar-item black-hover"><Link className="nav-bar-link" to='/'>Ni Hao Hao</Link></li>
                    <li className="float-right end"><Link className="nav-bar-link"to='/signin'>Resources</Link></li>
                    <li className="float-right black-hover"><Link className="nav-bar-link"to='/eng'>Eng</Link></li>
                </nav>

                <Route exact path='/' component={MainBoard}/>
                <Route path='/signin' component={Resources}/>
            </BrowserRouter>
        </ul> 
    </div>
  );
}
*/
export default App;
