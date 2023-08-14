import UserServices from '../../../services/users.service';
import actions from './user.actions'

export const loadUsersAsync = () => (dispatch) => {
    dispatch(actions.userLoadStart());

    UserServices.getAllUsers()
    .then((response) => dispatch(actions.userLoadSuccess(response.data)))
    .catch((error) => dispatch(actions.userLoadError(error.message)))
}