window.billDashboard = Vue.extend({
	template: `
		<h1>Dashboard</h1>
		</br>
		<h3>Total de contas a pagar..: {{ totalBillPay | currency 'R$ '}}</h3>
		</br>
		<h3>Total de contas a receber: {{ totalBillReceive | currency 'R$ '}}</h3>
		</br>
		<h3>Saldo (Receber - Pagar)..: {{ totalBillReceive - totalBillPay | currency 'R$ '}}</h3>
		</br>
	`,
	data: function () {
		return {
			totalBillPay: 0,
			totalBillReceive: 0,
		}
	},
	created: function () {
		this.$dispatch('changeInfo');
	},
	events: {
		changeInfo() {
			var self = this
			BillPay.total().then(function(response) {
				self.totalBillPay = response.data.total
			}),
			BillReceive.total().then(function(response) {
				self.totalBillReceive = response.data.total
			})
		}
	},
});
