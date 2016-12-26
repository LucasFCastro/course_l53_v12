require('../sass/app.scss');
require('./filters');
require('./resources');
// require('./bill-pay-class');
// require('./bill-receive-class');
require(
		[	'./bill.component',
			'./bill-dashboard.component',
			'./bill-pay/bill-pay.component',
			'./bill-pay/bill-pay-create.component',
			'./bill-pay/bill-pay-list.component',
			'./bill-receive/bill-receive.component',
			'./bill-receive/bill-receive-create.component',
			'./bill-receive/bill-receive-list.component.js',
		],
		function(
			billComponent,
			billDashboard,
			billPayComponent,
			billPayCreateComponent,
			billPayListComponent,
			billReceiveComponent,
			billReceiveCreateComponent,
			billReceiveListComponent,
		) {
	let router = new VueRouter();
	router.map({
		'/dashboard' : {
			name: 'bills.dashboard',
			component: billDashboard
		},
		'/bills-pay' : {
			name: 'bills.pay',
			component: billPayComponent,
			subRoutes: {
				'/': {
					name: 'bill.pay.list',
					component: billPayListComponent
				},
				'/create': {
					name: 'bill.pay.create',
					component: billPayCreateComponent
				},
				'/:id/update': {
					name: 'bill.pay.update',
					component: billPayCreateComponent
				},
			}
		},
		'/bills-receive': {
			name: 'bills.receive',
			component: billReceiveComponent,
			subRoutes: {
				'/': {
					name: 'bill.receive.list',
					component: billReceiveListComponent
				},
				'/create': {
					name: 'bill.receive.create',
					component: billReceiveCreateComponent
				},
				'/:id/update': {
					name: 'bill.receive.update',
					component: billReceiveCreateComponent
				},
			}
		},
		'*' : {
			component: billDashboard
		}
	});
	router.start({
		components: {
			'bill-component' : billComponent
		}
	},'#app');

	router.redirect({
		'*' : '/dashboard'
	});
})
