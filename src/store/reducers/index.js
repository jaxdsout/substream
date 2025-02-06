import {
    LOAD_CHOICE_FAIL,
    LOAD_CHOICE_SUCCESS,
    SEARCH_FAIL,
    SEARCH_SUCCESS,
    CLEAR_SEARCH,
    BACK_TO_RESULTS,
    CHANGE_FILTER,
    SET_SEARCH_STRING

} from '../actions/types'

const initialState = {
    results: [],
    choice: null,
    searchString: '',
    filter: 2,
    isLoading: false,
    region: 'US'

};

export default function rootReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SEARCH_SUCCESS:
            return {
                ...state,
                results: payload
            }
        case SEARCH_FAIL:
            return {
                ...state,
                results: []
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                searchString: '',
                choice: null,
                results: []
            }
        case LOAD_CHOICE_SUCCESS:
            return {
                ...state,
                choice: payload
            }
        case LOAD_CHOICE_FAIL:
            return {
                ...state
            }
        case BACK_TO_RESULTS:
            return {
                ...state,
                choice: null
            }
        case CHANGE_FILTER:
            return {
                ...state,
                filter: payload
            }
        case SET_SEARCH_STRING:
            return {
                ...state,
                searchString: payload
            }
        default:
            return state
    }

}