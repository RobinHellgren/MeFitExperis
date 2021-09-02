export const TEST_ACTION_FETCH = "[test] FETCHING"
export const TEST_ACTION_SET_DATA = "[test] SET DATA"

export const testActionFetch = () => ({
    type: TEST_ACTION_FETCH,
})

export const testActionSet = (data) => ({
    type: TEST_ACTION_SET_DATA,
    payload: data
})