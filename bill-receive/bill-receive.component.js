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
    <h3 :class=statusLabel>{{status}}</h3>
    <nav>
      <bill-receive-menu-component></bill-receive-menu-component>
    </nav>
    <router-view></router-view>
  `,

  data: function() {
    return {
      title: "Contas a Receber",
    }
  },
  computed: {
    status() {
      var count = 0;
      bills = this.$root.$children[0].billsReceive;
      if (!bills) {
         return "Nenhuma conta cadastrada."
      }
      for(var i in bills){
        if (!bills[i].done) {
          count++;
        }
      }
      return !count? "Nenhuma conta a receber" : "Existem " + count + " a serem recebidas"
    },
    statusLabel(){
      bills = this.$root.$children[0].billsReceive;
      if (bills.length == 0) {
        return 'sem-conta'
      }
      var count = 0;
      for(var i in bills){
        if (!bills[i].done) {
          count++;
        }
      }
      return !count? "nada-a-receber" : "nao-recebida"
    }
  }
});
