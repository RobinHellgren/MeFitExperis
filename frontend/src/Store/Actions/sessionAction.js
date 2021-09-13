export const ACTION_SESSION_SET = '[session] SET'
export const ACTION_SESSION_INIT = '[session INIT'
export const ACTION_SESSION_CLEAR = '[session] CLEAR'
export const ACTION_SESSION_LOGOUT = '[session] LOGOUT'
export const ACTION_SESSION_EXPIRED = '[session] EXPIRED'


export const sessionSetAction = profile =>({
    type: ACTION_SESSION_SET,
    payload: profile
})


export const sessionInitAction = () =>({
    type: ACTION_SESSION_INIT
})


export const sessionClearAction = () => ({
    type: ACTION_SESSION_CLEAR
})


export const sessionLogoutAction = () => ({
    type: ACTION_SESSION_LOGOUT
})

export const sessionExpiredAction = () => ({
    type: ACTION_SESSION_EXPIRED
})

