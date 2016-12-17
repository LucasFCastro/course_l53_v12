window.billPayCreateComponent = Vue.extend({
  template: `
    <form @submit.prevent="submit">
        <h3>{{title}}</h3>
        <label for="date_due">Vencimento</label>
        <input type="text" v-model="bill.date_due | dateFormat" id="date_due">
        <br/>
        <br/>
        <label for="name">Nome</label>
        <select v-model="bill.name | nameCase">
          <option v-for="o in names" :value="o | nameCase">{{o}}</option>
        </select>
        <br/>
        <br/>
        <label for="value">Valor</label>
        <input type="text" id="value" v-model="bill.value | numberCurrency">
        <br/>
        <br/>
        <label for="pago">Paga</label>
        <input type="checkbox" id="pago" v-model="bill.done"> {{bill.done | doneLabelPay}}
        <br/>
        <br/>
        <input type="submit" value="Cadastrar">
    </form>
  `,
  data() {
      return {
        title: '',
        names: [
          "Conta de Luz",
          "Conta de Água",
          "Conta de Telefone",
          "Colégio",
          "Cartão de Crédito",
        ],
        bill: new BillPayClass()
      }
  },
  created() {
    if (this.$route.name == 'bill.pay.create') {
        this.title = 'Criando Conta'
        this.bill = new BillPayClass()
    } else {
      this.title = 'Editando Conta'
      BillPay.get({id: this.$route.params.id})
      .then((response) => this.bill = new BillPayClass(response.data))
  }
},
  methods: {
    submit(){
        if (this.title == 'Criando Conta') {
          BillPay.save({}, this.bill.toJSON())
          .then((response) => {
              this.$dispatch('changeStatusPay')
              this.$router.go({
                name: 'bill.pay.list'
              })
          })
      } else {
          BillPay.update({id: this.bill.id}, this.bill.toJSON())
          .then((response) => {
              this.$dispatch('changeStatusPay')
              this.$router.go({
                name: 'bill.pay.list'
              })
          })
      }
    }
  }
});
