import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './Components/Login';
import Secured from './Components/Secured';
import TestComponent from './Components/testDataComponent';
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
          <TestComponent/>
          <Route exact path="/" component={Login} />
          <Route path="/secured" component={Secured} />
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
