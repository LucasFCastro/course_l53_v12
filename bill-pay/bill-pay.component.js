window.billPayComponent = Vue.extend({
  components: {
    'bill-pay-menu-component': billPayMenuComponent
  },
  template: `
    <style media="screen">
      .nao-paga {
        color: red
      }
      .sem-conta {
        color: gray
      }
      .nada-a-pagar {
        color: blue
      }
    </style>

    <h1>{{title}}</h1>
    <h3 :class="{'sem-conta': status < 0, 'nada-a-pagar': status == 0, 'nao-paga': status > 0}">
        {{status | statusBillPay}}
    </h3>
    <nav>
      <bill-pay-menu-component></bill-pay-menu-component>
    </nav>
    <router-view></router-view>
  `,

  data: function() {
    return {
      title: "Contas a Pagar",
      status: false,
    }
  },
    created: function() {
        this.$dispatch('changeStatusPay')
    },

    methods: {

        calculateStatus(bills) {
            if (bills.length == 0) {
                this.status = -1
            }
            else {
                var count = 0;
                for(var i in bills){
                    if (!bills[i].done) {
                        count++;
                    }
                }
                this.status = count
            }
        },

        updateStatus(){
            var self = this
            BillPay.query().then(function(response) {
              self.calculateStatus(response.data)
            })
        },

    },

events: {

    changeStatusPay() {
        this.updateStatus()
        this.$dispatch('changeInfo');
    }
}
});
