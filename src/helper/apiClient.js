import axios from "axios";

const apiClient = () => {
	const { REACT_APP_API_URL } = process.env;
    console.log(REACT_APP_API_URL)

	const axiosInstance = axios.create({
		baseURL: 'http://198.251.68.141:8081/api/login?database=TEB',
		responseType: "json",
	});

	return axiosInstance;
};

export default apiClient;