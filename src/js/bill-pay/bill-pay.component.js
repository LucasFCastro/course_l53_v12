window.billPayComponent = Vue.extend({
  template: `
    <div class="container">
       <h5>{{title}}</h5>
        <b :class="{'blue-text': status < 0, 'green-text': status == 0, 'red-text': status > 0}">
            {{status | statusBillPay}}
        </b>
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
