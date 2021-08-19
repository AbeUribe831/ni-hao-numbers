import React, {Component} from 'react';
import '../component-styles/App.css';
import MainBoard from './MainBoard'
import Resources from './Resources'
import {
    BrowserRouter,
    NavLink,
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
      hide_mobile_nav: false
    }
    this.highlightClickedPage = this.highlightClickedPage.bind(this); 
    this.hideMobileNav = this.hideMobileNav.bind(this);
  }
  componentDidMount() {
    const handler = e => this.setState({is_mobile: e.matches});
    window.matchMedia("(max-width: 800px)").addEventListener('change', handler);
  }
  hideMobileNav(bool_val) {
    this.setState({
      hide_mobile_nav: bool_val
    });
  }
  // changle color to the current page
  highlightClickedPage(table_id) {
    var table_row = document.getElementById('mobile-nav-bar-table').rows[0];
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
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
          <BrowserRouter>
            <Route exact path='/'>
              <MainBoard isMobile={this.state.is_mobile}/>
            </Route>
            <Route path='/resources' component={Resources}/>
            <div className="header-bar">
            <NavLink  style={{color: 'white', fontFamily:'serif', marginLeft: '0.3em', fontSize:'1.5em'}} to='/'>你 好 numbers</NavLink>
            <NavLink  style={window.location.href.match(/\/resources$/g) != null ? 
              {textDecoration:'underline 1px white', color: 'white', float: 'right', marginTop: '0.3em', marginRight: '0.3em', fontFamily: 'serif', fontSize:'1.5em'} 
              : {textDecoration: 'none', color: 'white', float: 'right',  marginTop: '0.3em', marginRight: '0.5em', fontFamily: 'serif', fontSize:'1.5em'}} to='/resources'>Resources</NavLink>
            </div> 
         </BrowserRouter>
        </div>
      )}
      {this.state.is_mobile && (
        <div style={{height: '100%'}}>
          <div className='header-bar'>
            <p style={{margin: '0', marginTop:'0.3em', fontSize:'1.5em', fontFamily:'serif', textAlign: 'center', color: 'white'}}>你 好 numbers</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
            <BrowserRouter>
              <Route exact path='/'>
                <MainBoard hideMobileNav={this.hideMobileNav}/>
              </Route> 
              <Route path='/resources' component={Resources}/> 
            {!this.state.hide_mobile_nav && (
            <nav>
                <table id='mobile-nav-bar-table' className='mobile-nav-bar'>
                  <tbody>
                    <tr>
                      <th id='home-th' ><NavLink onClick={() => this.highlightClickedPage('home-th')} style={window.location.href.match(/\/$/g) != null ? {color: '#cd071e'} : {color: 'white'}} to='/'>Home</NavLink></th>
                      <th id='resources-th'><NavLink onClick={() => this.highlightClickedPage('resources-th')} style={window.location.href.match(/\/resources$/g) != null ? {color: '#cd071e'} : {color: 'white'}} to='/resources'>Resources</NavLink></th>
                    </tr>
                  </tbody>
                </table>
              </nav>
              )}
            </BrowserRouter>
          </div>
      </div>
      )}
   </div>
  );
  }
}

export default App;
