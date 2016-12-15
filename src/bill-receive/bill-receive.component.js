window.billReceiveComponent = Vue.extend({
  components: {
    'bill-receive-menu-component': billReceiveMenuComponent
  },
  template: `
    <style media="screen">
      .nao-recebida {
        color: red
      }
      .sem-conta {
        color: gray
      }
      .nada-a-receber {
        color: blue
      }
    </style>

    <h1>{{title}}</h1>
    <h3 :class="{'sem-conta': status < 0, 'nada-a-receber': status == 0, 'nao-recebida': status > 0}">
        {{status | statusBillReceive}}
    </h3>
    <nav>
      <bill-receive-menu-component></bill-receive-menu-component>
    </nav>
    <router-view></router-view>
  `,

  data() {
    return {
      title: "Contas a Receber",
      status: false,
    }
  },
    created() {
        this.$dispatch('changeStatusReceive')
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
            BillReceive.query().then((response) => this.calculateStatus(response.data))
        },

    },

events: {

    changeStatusReceive() {
        this.updateStatus()
        this.$dispatch('changeInfo');
    }
}
});
