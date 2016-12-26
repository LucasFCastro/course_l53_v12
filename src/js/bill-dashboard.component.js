import {BillPay, BillReceive} from './resources';

export default {
	template: `
		<div class="container">
			<div class="row">
				<div class="col s12">
					<h5 class="center"><i class="material-icons">dashboard</i>Dashboard</h5>
				</div>
			</div>
			<div class="row">
				<div class="col s4">
					<div class="card red hoverable">
						<div class="card-content">
							<p><i class="material-icons">indeterminate_check_box</i>Total de contas a pagar</p>
						</div>
						<div class="card-action white red-text">
							<h4>{{ totalBillPay | currency 'R$ '}}</h4>
						</div>
					</div>
				</div>
				<div class="col s4">
					<div class="card green hoverable">
						<div class="card-content">
							<p><i class="material-icons">add_box</i>Total de contas a receber</p>
						</div>
						<div class="card-action white green-text">
							<h4>{{ totalBillReceive | currency 'R$ '}}</h4>
						</div>
					</div>
				</div>
				<div class="col s4">
					<div class="card blue hoverable">
						<div class="card-content">
							<p><i class="material-icons">monetization_on</i>Saldo (Receber - Pagar)</p>
						</div>
						<div class="card-action white blue-text">
							<h4>{{ totalBillReceive - totalBillPay | currency 'R$ '}}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>

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
};
