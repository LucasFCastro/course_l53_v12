Vue.http.options.root = 'http://localhost:8080/api';

window.Bill = Vue.resource('bills{/id}',{},{
	total : {
		method: 'GET',
		url: 'bills/total'
	}
});
