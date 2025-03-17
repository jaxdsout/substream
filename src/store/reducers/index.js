import {
    LOAD_CHOICE_FAIL,
    LOAD_CHOICE_SUCCESS,
    SEARCH_FAIL,
    SEARCH_SUCCESS,
    CLEAR_STREAM,
    RESET_CHOICE,
    CHANGE_FILTER,
    SET_SEARCH_STRING

} from '../actions/types'

const initialState = {
    results: [],
    choice: null,
    searchString: '',
    filter: 2,
    isLoaded: false,
    region: 'US'

};

export default function rootReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SEARCH_SUCCESS:
            return {
                ...state,
                results: payload,
                isLoaded: true
            }
        case SEARCH_FAIL:
            return {
                ...state,
                results: [],
                isLoaded: false
            }
        case CLEAR_STREAM:
            return {
                ...state,
                results: [],
                choice: null,
                searchString: '',
                filter: 2,
                isLoaded: false,
                region: 'US'
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
        case RESET_CHOICE:
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