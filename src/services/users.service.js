import apiClient from "../helper/apiClient";

class UserServices {
    getAllUsers = () => apiClient().post("LOGIN");
}

export default new UserServices()





