import axios from "axios";
 
	const token = localStorage.getItem('authToken')

	const getInstance =  axios.create({
			baseURL: 'http://localhost:5000',
			headers: {  Authorization: `Bearer ${token}` }
		});

// 	const instance = axios.create({
// 		baseURL: 'http://localhost:5000',
// 	});
	
// export default instance;


export default getInstance;