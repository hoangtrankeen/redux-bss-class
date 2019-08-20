//Action Creator
export const handleAddTodo = (item, dispatch) => {
    dispatch({
        type: "ADD",
        payload: item
    });
}

export const  handleDelete = (item, dispatch) => {
    dispatch({
        type: "DELETE",
        payload: item
    });
}

export const  toggleTodo = (item, dispatch) => {
    dispatch({
        type: "TOGGLE",
        payload: item
    })
}