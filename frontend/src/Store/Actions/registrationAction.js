export const ACTION_REGISTRATION_ATTEMPTING = '[registration] ATTEMPT';
export const ACTION_REGISTRATION_SUCCESS = '[registration] SUCCESS';
export const ACTION_REGISTRATION_FAIL = '[registration] FAIL';

export const registrationAttemptAction = user => ({
    type: ACTION_REGISTRATION_ATTEMPTING,
    payload: user
})

export const registrationSuccessAction = profile => ({
    type: ACTION_REGISTRATION_SUCCESS,
    payload: profile
})

export const registrationErrorAction = error => ({
    type: ACTION_REGISTRATION_FAIL,
    payload: error
})