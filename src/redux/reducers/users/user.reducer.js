import actionTypes from './users.actionTypes'
import initialState from './user.initialState'

const userReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case actionTypes.USERS_LOAD_START:
            return{
                ...state,
                isLoading:true,
                users:null,
                errorMessage:null,
            }

        case actionTypes.USERS_LOAD_SUCCESS:
                return{
                    ...state,
                    isLoading: false,
                    users: payload,
                }

        case actionTypes.USERS_LOAD_ERROR:
            return{
                ...state,
                isLoading:false,
                errorMessage: payload,
            }
    
    
        default:
            return{
                ...state
            }
    }
}

export default userReducer;