//TodoReducer
let defaultState = [];

const todo = (state = defaultState, action) => {
    switch(action.type){
        case "ADD":
            let newItem = {
                id: Math.floor(Math.random() * new Date()),
                name: action.payload,
                complete: false
            };
            let newState2 = [...state, newItem];
            console.log(newState2)

            return newState2;
        case "DELETE":
            return state.filter((item) => {
                return item.id !== action.payload
            });
        case "TOGGLE":
            let newState =  [...state];
            let updateTodo = newState.map((item) => {
                return item.id === action.payload ? {
                    id: item.id,
                    name: item.name,
                    complete: !item.complete
                } : item
            });
            console.log(updateTodo)
            return updateTodo
        default:
            return state;
    }
    // when the store is created this function is called and inital state is set
}

export default todo