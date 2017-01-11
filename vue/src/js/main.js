import './bootstrap';
import billComponent from './bill.vue';
import billDashboard from './bill-dashboard.vue';
import billPayComponent from './bill-pay/bill-pay.vue';
import billPayListComponent from './bill-pay/bill-pay-list.vue';
import billPayCreateComponent from './bill-pay/bill-pay-create.vue';
import billReceiveComponent from './bill-receive/bill-receive.vue';
import billReceiveListComponent from './bill-receive/bill-receive-list.vue';
import billReceiveCreateComponent from './bill-receive/bill-receive-create.vue';
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
