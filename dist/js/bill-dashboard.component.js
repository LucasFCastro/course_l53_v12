'use strict';

window.billDashboard = Vue.extend({
	template: '\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<div class="col s12">\n\t\t\t\t\t<h5 class="center"><i class="material-icons">dashboard</i>Dashboard</h5>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="row">\n\t\t\t\t<div class="col s4">\n\t\t\t\t\t<div class="card red hoverable">\n\t\t\t\t\t\t<div class="card-content">\n\t\t\t\t\t\t\t<p><i class="material-icons">indeterminate_check_box</i>Total de contas a pagar</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="card-action white red-text">\n\t\t\t\t\t\t\t<h4>{{ totalBillPay | currency \'R$ \'}}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="col s4">\n\t\t\t\t\t<div class="card green hoverable">\n\t\t\t\t\t\t<div class="card-content">\n\t\t\t\t\t\t\t<p><i class="material-icons">add_box</i>Total de contas a receber</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="card-action white green-text">\n\t\t\t\t\t\t\t<h4>{{ totalBillReceive | currency \'R$ \'}}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="col s4">\n\t\t\t\t\t<div class="card blue hoverable">\n\t\t\t\t\t\t<div class="card-content">\n\t\t\t\t\t\t\t<p><i class="material-icons">monetization_on</i>Saldo (Receber - Pagar)</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="card-action white blue-text">\n\t\t\t\t\t\t\t<h4>{{ totalBillReceive - totalBillPay | currency \'R$ \'}}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t',
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