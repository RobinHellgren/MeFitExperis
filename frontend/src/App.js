import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SignInPage from './Components/SignInPage';
import Secured from './Components/Secured';
import TestComponent from './Components/testDataComponent';
import SignUpPage from './Components/SignUpPage';
import ApplicationFrame from './Components/ApplicationFrame';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ApplicationFrame/>
      <h1>MeFit</h1>
      
        <div className="container">
          <ul>
            <li><Link to="/">public component</Link></li>
            <li><Link to="/secured">secured component</Link></li>
          </ul>
          <Route exact path="/login" component={SignInPage} />
          <Route exact path="/dashboard" component={SignInPage} />
          <Route path="/secured" component={Secured} />
          <Route path="/register" component={SignUpPage} />
          <Route path="/testframe" component={ApplicationFrame} />
        </div>
       
    </div>
    </BrowserRouter>
 
  );
}
export default App;
