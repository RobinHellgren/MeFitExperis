import './App.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import SignInPage from './Components/SignInPage';
import TestComponent from './Components/testDataComponent';
import SignUpPage from './Components/SignUpPage';
import ApplicationFrame from './Components/ApplicationFrame';
import LoggedInRoute from './Components/HOC/LoggedInRoute';
import ProfilePage from './Components/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ApplicationFrame />
        <h1>MeFit</h1>

          <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
            </Route>
            <Route path="/login" component={SignInPage} />
            <Route path="/register" component={SignUpPage} />
            <LoggedInRoute path="/dashboard" component={ TestComponent} />
            <LoggedInRoute path="/profile" component={ ProfilePage} />
          </Switch>
      </div>
    </BrowserRouter>

  );
}
export default App;
