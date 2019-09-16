export const fetchTodoList =  () => {

    return async dispatch => {
        // dispatch action to show spinner
        dispatch(isLoading());
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


export const addTodoItem =  (title) => {
    return async dispatch => {
        // dispatch action to show spinner
        dispatch(isLoading());
        // after fetching data success, dispatch action to turn off spinner and show data
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method: 'post',
            body: JSON.stringify({
                userId: 1,
                title: title,
                completed: false
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const responseBody = await response.json();
        dispatch(addTodoSuccess(responseBody));

    };
}

export const toggleTodoItem =  (isCompleted, todoId) => {
    return async dispatch => {
        // dispatch action to show spinner
        dispatch(isLoading());
        // after fetching data success, dispatch action to turn off spinner and show data
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: isCompleted
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const responseBody = await response.json();
        dispatch(toggleTodoSuccess(responseBody));
    };
}

export const deleteTodo = (todoId) => {
    return async dispatch => {
        // dispatch action to show spinner
        dispatch(isLoading());
        // after fetching data success, dispatch action to turn off spinner and show data
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
            method: 'DELETE'
        });

        console.log(todoId)
        dispatch(deleteTodoSuccess(todoId));
    };
}


const isLoading = () => {
    return {
        type: "IS_LOADING"
    }
}

const fetchTodoSuccess = (data) => {
    return {
        type: "FETCH_SUCCESS",
        payload: data
    }
}

const addTodoSuccess = (data) => {
    return {
        type: "ADDED_SUCCESS",
        payload: data
    }
}

const toggleTodoSuccess = (data) => {
    return {
        type: "TOGGLE_SUCCESS",
        payload: data
    }
}

const deleteTodoSuccess = (data) => {
    return {
        type: "DELETED_SUCCESS",
        payload: data
    }
}