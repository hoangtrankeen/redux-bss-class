//TodoReducer
let defaultState = {
    todoList: [],
    isLoading: false,
};

// Can also use this technique to update state
// return {
//      ...state,
//      state.todoList: action.payload,
//      isFetching: false
//    }

const todo = (state = defaultState, action) => {
    switch(action.type){
        case "IS_LOADING":
            return Object.assign({}, state, {
                isLoading: true
            });
        case "FETCH_SUCCESS":
            return Object.assign({}, state, {
                todoList: action.payload.slice(1,10),
                isLoading: false
            });
        case "ADDED_SUCCESS":
            return Object.assign({}, state, {
                todoList: [
                    ...state.todoList,
                    action.payload
                ],
                isLoading: false
            });
        case "TOGGLE_SUCCESS":
            const todo = [...state.todoList];
            const updateTodo = todo.map((item) => {
                return item.id === action.payload.id ? {
                    id: action.payload.id,
                    userId: action.payload.userId,
                    title: action.payload.title,
                    completed: action.payload.completed
                } : item
            });
            return Object.assign({}, state, {
                todoList: updateTodo,
                isLoading: false
            });

        case "DELETED_SUCCESS":
            const todoList = [...state.todoList];
            const newTodo = todoList.filter((item) => {
                return item.id !== action.payload
            })
            return Object.assign({}, state, {
                todoList: newTodo,
                isLoading: false
            });

        default:
            return state;
    }
    // when the store is created this function is called and inital state is set
}

export default todo