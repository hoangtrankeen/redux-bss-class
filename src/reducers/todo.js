//TodoReducer
let defaultState = {
    todoList: [],
    isFetching: false,
};

// Can also use this technique to update state
// return {
//      ...state,
//      state.todoList: action.payload,
//      isFetching: false
//    }

const todo = (state = defaultState, action) => {
    switch(action.type){
        case "IS_FETCHING":
            return Object.assign({}, state, {
                isFetching: true
            });
        case "FETCH_SUCCESS":
            return Object.assign({}, state, {
                todoList: action.payload,
                isFetching: false
            });

        default:
            return state;
    }
    // when the store is created this function is called and inital state is set
}

export default todo