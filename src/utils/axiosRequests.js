import axios from 'axios';

// eslint-disable-next-line no-undef
const appURL = process.env.REACT_APP_URL;

const getData = (url) => {
	try {
		return axios.get(appURL + url);
	} catch (e) {
		console.log(e);
	}
};
const postData = (url, data) => {
	try {
		return axios.post(appURL + url, data);
	} catch (e) {
		console.log(e);
	}
};
const putData = (url, data) => {
	try {
		return axios.put(appURL + url, data);
	} catch (e) {
		console.log(e);
	}
};
const deleteData = (url, data) => {
	try {
		return axios.delete(appURL + url, data);
	} catch (e) {
		console.log(e);
	}
};

const axiosRequests = {
	getData,
	postData,
	putData,
	deleteData,
};

export default axiosRequests;
