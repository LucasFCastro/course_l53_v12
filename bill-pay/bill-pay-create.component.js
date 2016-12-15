window.billPayCreateComponent = Vue.extend({
  template: `
    <form @submit.prevent="submit">
        <h3>{{title}}</h3>
        <label for="date_due">Vencimento</label>
        <input type="text" v-model="bill.date_due" id="date_due">
        <br/>
        <br/>
        <label for="name">Nome</label>
        <select v-model="bill.name">
          <option v-for="o in names" :value="o">{{o}}</option>
        </select>
        <br/>
        <br/>
        <label for="value">Valor</label>
        <input type="text" id="value" v-model="bill.value">
        <br/>
        <br/>
        <label for="pago">Paga</label>
        <input type="checkbox" id="pago" v-model="bill.done"> {{bill.done | doneLabelPay}}
        <br/>
        <br/>
        <input type="submit" value="Cadastrar">
    </form>
  `,
  data: function () {
      return {
        title: '',
        names: [
          "Conta de Luz",
          "Conta de Água",
          "Conta de Telefone",
          "Colégio",
          "Cartão de Crédito",
        ],
        bill: {
          date_due:'',
          name:'',
          value: 0
        }
      }
  },
  created: function () {
    if (this.$route.name == 'bill.pay.create') {
        this.title = 'Criando Conta'
        this.bill = {
          date_due:'',
          name:'',
          value: 0
        }
    } else {
      this.title = 'Editando Conta'
      var self = this
      BillPay.get({id: this.$route.params.id})
      .then(function(response) {
          self.bill = response.data;
      })
  }
},
  methods: {
    submit(){
        var self = this
        if (this.title == 'Criando Conta') {

          BillPay.save({}, this.bill)
          .then(function(response) {
              self.$dispatch('changeStatusPay')
              self.$router.go({
                name: 'bill.pay.list'
              })
          })
      } else {
          BillPay.update({id: this.bill.id}, this.bill)
          .then(function(response) {
              self.$dispatch('changeStatusPay')
              self.$router.go({
                name: 'bill.pay.list'
              })
          })
      }
    }
  }
});
