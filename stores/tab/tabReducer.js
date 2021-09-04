import { SET_SELECTED_TAB } from "./tabActions";

const tabReducer = (state = { selectedTab: '' }, action) => {
    switch (action.type) {
        case SET_SELECTED_TAB:
            return {
                ...state,
                selectedTab: action.payload.selectedTab,
            }
        default:
            return state
    }
}

export default tabReducer