export const setFilter = (filter,dispatch) => {
    dispatch({
        type: 'SET_FILTER',
        payload: {filter}
    })};