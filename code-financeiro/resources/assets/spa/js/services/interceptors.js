import auth from './auth.js';

Vue.http.interceptors.push((request, next) => {
	request.headers.set('Authorization', auth.getAuthorizationHeader());
	next();
});
