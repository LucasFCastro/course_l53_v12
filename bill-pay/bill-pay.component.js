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
    <h3 :class=statusLabel>{{status}}</h3>
    <nav>
      <bill-pay-menu-component></bill-pay-menu-component>
    </nav>
    <router-view></router-view>
  `,

  data: function() {
    return {
      title: "Contas a pagar",
    }
  },
  computed: {
    status() {
      var count = 0;
      bills = this.$root.$children[0].billsPay;
      if (!bills) {
         return "Nenhuma conta cadastrada."
      }
      for(var i in bills){
        // if (!this.$children[1].bills[i].done) {
        if (!bills[i].done) {
          count++;
        }
      }
      return !count? "Nenhuma conta a pagar" : "Existem " + count + " a serem pagas"
    },
    statusLabel(){
      bills = this.$root.$children[0].billsPay;
      if (bills.length == 0) {
        return 'sem-conta'
      }
      var count = 0;
      for(var i in bills){
        if (!bills[i].done) {
          count++;
        }
      }
      return !count? "nada-a-pagar" : "nao-paga"
    }
  }
});
