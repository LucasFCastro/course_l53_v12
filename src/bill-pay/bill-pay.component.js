window.billPayComponent = Vue.extend({
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

    <div class="section">
       <div class="container">
           <h5>{{title}}</h5>
           <div class="row">
               <div class="col s6">
                    <b :class="{'sem-conta': status < 0, 'nada-a-pagar': status == 0, 'nao-paga': status > 0}">
                        {{status | statusBillPay}}
                    </b>
                </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
  `,

  data() {
    return {
      title: "Contas a Pagar",
      status: false,
    }
  },
    created() {
        this.$dispatch('changeStatusPay')
    },

    methods: {

        calculateStatus(bills) {
            if (bills.length == 0) {
                this.status = -1
            }
            else {
                let count = 0;
                for(let i in bills){
                    if (!bills[i].done) {
                        count++;
                    }
                }
                this.status = count
            }
        },

        updateStatus(){
            BillPay.query().then((response) => this.calculateStatus(response.data))
        },

    },

events: {
    changeStatusPay() {
        this.updateStatus()
        this.$dispatch('changeInfo');
    }
  }
});
