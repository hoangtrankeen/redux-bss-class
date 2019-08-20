// FilterReducer
import {VISIBILITY_FILTERS} from "../constant";

const initialFilter = VISIBILITY_FILTERS.ALL;

const  visibilityFilter = (state = initialFilter, action) => {
    switch (action.type) {
        case "SET_FILTER":
            return action.payload.filter
        default:
            return state
    }
}

export default visibilityFilter