import JwtToken from './jwt-token.js';
import auth from './auth.js';
import appConfig from './appConfig.js';

Vue.http.interceptors.push((request, next) => {
	request.headers.set('Authorization', JwtToken.getAuthorizationHeader());
	next();
});

Vue.http.interceptors.push((request, next) => {
	next((response) => {
		if (response.status === 401) {
			return JwtToken.refreshToken()
			.then(() => {
				return Vue.http(request);
			})
			.catch(() =>{
				auth.clearAuth();
				window.location.href = appConfig.login_url; // redirecionar
			});
		}
	});
});
