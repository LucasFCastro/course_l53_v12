import './bootstrap';
import billComponent from './bill.component';
import billDashboard from './bill-dashboard.component';
import billPayComponent from './bill-pay/bill-pay.component';
import billPayListComponent from './bill-pay/bill-pay-list.component';
import billPayCreateComponent from './bill-pay/bill-pay-create.component';
import billReceiveComponent from './bill-receive/bill-receive.component';
import billReceiveListComponent from './bill-receive/bill-receive-list.component';
import billReceiveCreateComponent from './bill-receive/bill-receive-create.component';
import VueRouter from 'vue-router';

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
