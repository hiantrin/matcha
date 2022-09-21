import axios from "axios";
 

	const getInstance= (tok) =>  axios.create({
			baseURL: 'http://localhost:5000',
			headers: {  Authorization: `Bearer ${tok}` }
		});

export default getInstance;