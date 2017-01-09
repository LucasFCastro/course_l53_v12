import JwtToken from './jwt-token.js';
import localStorage from './localStorage.js';
import {User} from './resources.js';

const USER = 'user';

const afterLogin = (response) => {
	User.get()
		.then((response) => localStorage.setObject(USER, response.data))
};

export default {
	login(email, password) {
		return JwtToken.accessToken(email, password)
			.then((response) => {
				afterLogin(response);
				return response;
			});
	},
	logout(){
		let afterLogout = () => {
			this.clearAuth()
		};
		return JwtToken.revokeToken()
			.then(afterLogout())
			.catch(afterLogout());
	},
	user(){
		return localStorage.getObject(USER);
	},
	check(){
		return JwtToken.token ? true : false;
	},
	clearAuth(){
		localStorage.remove(USER);
	}
};
