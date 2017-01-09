import auth from './auth.js';

Vue.http.interceptors.push((request, next) => {
	request.headers.set('Authorization', auth.getAuthorizationHeader());
	next();
});

Vue.http.interceptors.push((request, next) => {
	next((response) => {
		if (response.status === 401) {
			return auth.refreshToken().then(() => {
				return Vue.http(request);
			});
		}
	});
});
