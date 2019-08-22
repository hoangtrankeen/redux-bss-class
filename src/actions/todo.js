//Action Creator
export const handleAddTodo = (item) => {
   return {
       type: "ADD",
       payload: item
   }
}

export const  handleDelete = (item) => {
    return {
        type: "DELETE",
        payload: item
    };
}

export const  toggleTodo = (item) => {
    return {
        type: "TOGGLE",
        payload: item
    }
}