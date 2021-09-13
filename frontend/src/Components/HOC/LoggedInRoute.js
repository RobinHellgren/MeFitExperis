import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';


const LoggedInRoute = props => {

    const { loggedIn } = useSelector(state => state.sessionReducer);


    if (!loggedIn) {
        return <Redirect to="/login" />
    } else {
        return <Route {...props} />
    }

}


export default LoggedInRoute;
