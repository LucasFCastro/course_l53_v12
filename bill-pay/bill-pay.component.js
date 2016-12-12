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
        {{status | statusGeneral}}
    </h3>
    <nav>
      <bill-pay-menu-component></bill-pay-menu-component>
    </nav>
    <router-view></router-view>
  `,

  data: function() {
    return {
      title: "Contas a pagar",
      status: false,
    }
  },
  http: {
      root: 'http://localhost:8080/api',
  },

    created: function() {
        this.$dispatch('changeStatus')
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
            this.$http.get('bills').then(function(response) {
              this.calculateStatus(response.data)
            })
        },

    },

events: {

    changeStatus() {
        this.updateStatus()
    }
}
});
