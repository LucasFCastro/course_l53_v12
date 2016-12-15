window.billDashboard = Vue.extend({
	template: `
		<h1>Dashboard</h1>
		</br>
		<h3>Total de contas a pagar..: {{ totalBillPay | currency 'R$ '}}</h3>
		</br>
		<h3>Total de contas a receber: {{ totalBillReceive | currency 'R$ '}}</h3>
		</br>
		<h2>Saldo (Receber - Pagar)..: {{ totalBillReceive - totalBillPay | currency 'R$ '}}</h2>
		</br>
	`,
	data() {
		return {
			totalBillPay: 0,
			totalBillReceive: 0,
		}
	},
	created() {
		this.$dispatch('changeInfo');
	},
	events: {
		changeInfo() {
			BillPay.total().then((response) => this.totalBillPay = response.data.total),
			BillReceive.total().then((response) => this.totalBillReceive = response.data.total)
		}
	},
});
