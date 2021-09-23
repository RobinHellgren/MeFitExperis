import './App.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';
import ApplicationFrame from './Components/ApplicationFrame';
import LoggedInRoute from './Components/HOC/LoggedInRoute';
import ProfilePage from './Components/ProfilePage';
import Dashboard from './Components/DashboardPage';
import GoalComponent from './Components/GoalComponent';
import SetGoalComponent from './Components/SetGoalComponent';
import ExercisePage from './Components/ExercisePage';
import ExerciseListPage from './Components/ExerciseListPage';
import WorkoutListPage from './Components/WorkoutListPage';
import WorkoutPage from './Components/WorkoutPage';
import ProgramListPage from './Components/ProgramListPage';
import ProgramPage from './Components/ProgramPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ApplicationFrame />

          <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
            </Route>
            <Route path="/login" component={SignInPage} />
            <Route path="/register" component={SignUpPage} />
            <LoggedInRoute path="/dashboard" component={ Dashboard} />
            <LoggedInRoute path="/goals" component={ GoalComponent} />
            <LoggedInRoute path="/setgoal" component={ SetGoalComponent} />
            <LoggedInRoute path="/profile" component={ ProfilePage} />
            <LoggedInRoute path="/exercises/:exerciseId" component={ ExercisePage }/>
            <LoggedInRoute path="/workouts/:workoutId" component={ WorkoutPage }/>
            <LoggedInRoute path="/programs/:programId" component={ ProgramPage }/>
            <LoggedInRoute path="/exercises" component={ ExerciseListPage}/>
            <LoggedInRoute path="/workouts" component={ WorkoutListPage }/>
            <LoggedInRoute path="/programs" component={ ProgramListPage }/>
          </Switch>
      </div>
    </BrowserRouter>

  );
}
export default App;
