import {Jwt} from './resources.js';
import localStorage from './localStorage.js';
import {User} from '../services/resources.js'

const TOKEN = 'token';
const USER = 'user';

const afterLogin = (response) => {
	User.get()
		.then((response) => localStorage.setObject(USER, response.data))
};

export default {
	login(email, password) {
		return Jwt.accessToken(email, password)
			.then((response) => {
				afterLogin(response);
				localStorage.set(TOKEN, response.data.token);
				return response;
			});
	},
	getAuthorizationHeader(){
		return `Bearer ${localStorage.get(TOKEN)}`;
	},
	user(){
		return localStorage.getObject(USER);
	}
};
