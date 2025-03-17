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

import axios from 'axios';

export const auto_search = (searchString, filter, region) => async (dispatch) => {
    try {
        const string = encodeURIComponent(searchString);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/autocomplete-search/?apiKey=${process.env.REACT_APP_KEY}&search_value=${string}&search_type=${filter}&region=${region}}`);
        dispatch({ type: SEARCH_SUCCESS, payload: res.data.results });
    } catch (err) {
        dispatch({ type: SEARCH_FAIL });
    }
};

export const load_choice = (choice_id, region) => async (dispatch) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/title/${choice_id}/details/?apiKey=${process.env.REACT_APP_KEY}&append_to_response=sources&regions=${region}`);
        dispatch({ type: LOAD_CHOICE_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: LOAD_CHOICE_FAIL });
    }
};

export const clear_stream = () => dispatch => {
    dispatch({
        type: CLEAR_STREAM
    });
    return Promise.resolve();
};

export const reset_choice = () => dispatch => {
    dispatch({
        type: RESET_CHOICE
    });
    return Promise.resolve();
}

export const change_filter = (value) => dispatch => {
    dispatch({
        type: CHANGE_FILTER, payload: value
    });
    return Promise.resolve();
}

export const set_search_string = (value) => dispatch => {
    dispatch({
        type: SET_SEARCH_STRING, payload: value
    });
    return Promise.resolve();
}






