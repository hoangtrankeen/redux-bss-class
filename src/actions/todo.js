export const fetchTodoList =  () => {

    return async dispatch => {
        // dispatch action to show spinner
        dispatch(isFetchingTodo());

        // after fetching data success, dispatch action to turn off spinner and show data
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
            const responseBody = await response.json();
            dispatch(fetchTodoSuccess(responseBody));
        }
        catch(err)  {
            console.log(err.message);
        }

    };
}


const isFetchingTodo = () => {
    return {
        type: "IS_FETCHING"
    }
}

const fetchTodoSuccess = (data) => {
    return {
        type: "FETCH_SUCCESS",
        payload: data
    }
}