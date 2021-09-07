import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SignInPage from './Components/SignInPage';
import Secured from './Components/Secured';
import TestComponent from './Components/testDataComponent';
import SignUpPage from './Components/SignUpPage';
function App() {
  return (
    <div className="App">
      <h1>MeFit</h1>
      <BrowserRouter>
        <div className="container">
          <ul>
            <li><Link to="/">public component</Link></li>
            <li><Link to="/secured">secured component</Link></li>
          </ul>
          <Route exact path="/" component={SignInPage} />
          <Route path="/secured" component={Secured} />
          <Route path="/signup" component={SignUpPage} />
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
