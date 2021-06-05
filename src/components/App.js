import '../component-styles/App.css';
import MainBoard from './MainBoard'
import Login from './Login'
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
function App() {
  return (
    <div>
     <ul className="nav-bar">
            <BrowserRouter>
                <nav>
                    <li className="nav-bar-item black-hover"><Link className="nav-bar-link" to='/'>Ni Hao Hao</Link></li>
                    <li className="float-right end"><Link className="nav-bar-link"to='/signin'>Sign In</Link></li>
                    <li className="float-right black-hover"><Link className="nav-bar-link"to='/eng'>Eng</Link></li>
                </nav>

                <Route exact path='/' component={MainBoard}/>
                <Route path='/signin' component={Login}/>
            </BrowserRouter>
        </ul> 
    </div>
  );
}

export default App;
