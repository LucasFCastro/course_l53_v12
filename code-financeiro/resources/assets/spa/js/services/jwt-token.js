import localStorage from './localStorage.js';
import {Jwt, User} from './resources.js';

const TOKEN = 'token';
export default {
	get token(){
		return localStorage.get(TOKEN);
	},
	set token(value){
		return value ? localStorage.set(TOKEN, value) : localStorage.remove(TOKEN);
	},
	accessToken(email, password){
		return Jwt.accessToken(email, password)
			.then((response) => {
				this.token = response.data.token;
				return response;
			});
	},
	refreshToken(){
		return Jwt.refreshToken().then((response) => {
			this.token = response.data.token;
			return response;
		});

	},
	revokeToken(){
		let aftertRevokeToken = () => {
			this.token = null;
		};
		return Jwt.logout()
			.then(aftertRevokeToken())
			.catch(aftertRevokeToken());

	},
	getAuthorizationHeader(){
		return `Bearer ${localStorage.get(TOKEN)}`;
	}
}
