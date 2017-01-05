import {Jwt} from './resources.js';
import localStorage from './localStorage.js';

export default {
	login(email, password) {
		return Jwt.accessToken(email, password)
			.then((response) => {
				localStorage.set('token', response.data.token);
				return response;
			});
	}
};
