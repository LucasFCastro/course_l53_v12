'use strict';

window.billDashboard = Vue.extend({
	template: '\n\t\t<h1>Dashboard</h1>\n\t\t</br>\n\t\t<h3>Total de contas a pagar..: {{ totalBillPay | currency \'R$ \'}}</h3>\n\t\t</br>\n\t\t<h3>Total de contas a receber: {{ totalBillReceive | currency \'R$ \'}}</h3>\n\t\t</br>\n\t\t<h2>Saldo (Receber - Pagar)..: {{ totalBillReceive - totalBillPay | currency \'R$ \'}}</h2>\n\t\t</br>\n\t',
	data: function data() {
		return {
			totalBillPay: 0,
			totalBillReceive: 0
		};
	},
	created: function created() {
		this.$dispatch('changeInfo');
	},

	events: {
		changeInfo: function changeInfo() {
			var _this = this;

			BillPay.total().then(function (response) {
				return _this.totalBillPay = response.data.total;
			}), BillReceive.total().then(function (response) {
				return _this.totalBillReceive = response.data.total;
			});
		}
	}
});