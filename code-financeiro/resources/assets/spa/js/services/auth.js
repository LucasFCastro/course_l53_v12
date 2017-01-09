import localStorage from './localStorage.js';
import {Jwt, User} from './resources.js';

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
				localStorage.set(TOKEN, response.data.token);
				afterLogin(response);
				return response;
			});
	},
	logout(){
		let afterLogout = () => {
			localStorage.remove(TOKEN);
			localStorage.remove(USER);
		};
		return Jwt.logout()
			.then(afterLogout())
			.catch(afterLogout());
	},
	getAuthorizationHeader(){
		return `Bearer ${localStorage.get(TOKEN)}`;
	},
	user(){
		return localStorage.getObject(USER);
	}
};
