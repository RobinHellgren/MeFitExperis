import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

//Checks if the user is logged in and allowed enter pages.
const LoggedInRoute = props => {

    const { loggedIn } = useSelector(state => state.sessionReducer);


    if (!loggedIn) {
        return <Redirect to="/login" />
    } else {
        return <Route {...props} />
    }

}


export default LoggedInRoute;
