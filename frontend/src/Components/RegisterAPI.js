import { keys } from '../keys';

export const ResisterAPI = {
    register(userName, email, password, confirmPassword, firstName, lastName) {
        return fetch(key.REACT_APP_SERVER_URL + '/user')
        .then(async response => {
            if (!response.ok) {
                const { error = 'Unknown error' } = await response.json()
                throw new Error(error);
            }

            return response.json()
        })
    }
}