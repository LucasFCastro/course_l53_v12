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
	computed:{
		totalBillPay() {
			total = 0
			bills = this.$root.$children[0].billsPay
			for (var i = 0; i < bills.length; i++) {
				total = total + bills[i].value
			}
			return total
		},
		totalBillReceive() {
			total = 0
			bills = this.$root.$children[0].billsReceive
			for (var i = 0; i < bills.length; i++) {
				total = total + bills[i].value
			}
			return total
		}
	}
});
