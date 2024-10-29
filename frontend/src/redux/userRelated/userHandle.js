import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

// New reusable API request function
const apiRequest = async (method, url, data = null) => {
    const config = {
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        data,
    };
    return await axios(config);
};

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await apiRequest('post', `${process.env.REACT_APP_BASE_URL}/${role}Login`, fields);
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error));
        console.log('here');
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await apiRequest('post', `${process.env.REACT_APP_BASE_URL}/${role}Reg`, fields);
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else if (result.data.school) {
            dispatch(stuffAdded());
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error));
        // console.log('here error');
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await apiRequest('get', `${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await apiRequest('delete', `${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await apiRequest('put', `${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields);
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await apiRequest('post', `${process.env.REACT_APP_BASE_URL}/${address}Create`, fields);
        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
}; 