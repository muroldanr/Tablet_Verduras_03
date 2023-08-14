import actionsTypes from './users.actionTypes'


const userLoadStart = () => ({
    type: actionsTypes.USERS_LOAD_START
})

const userLoadSuccess = (users) => ({
    type: actionsTypes.USERS_LOAD_SUCCESS,
    payload: users,
})

const userLoadError = (errorMessage) => ({
    type: actionsTypes.USERS_LOAD_ERROR,
    payload: errorMessage,
})

export default {
    userLoadStart,
    userLoadSuccess,
    userLoadError
}