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
  http: {
      root: 'http://localhost:8080/api',
  },
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
      this.bill = this.$http.get('bills/' + this.$route.params.id)
      .then(function(response) {
          this.bill = response.data;
      })
  }
},
  methods: {
    submit(){
      if (this.title == 'Criando Conta') {
          this.$http.post('bills', this.bill)
          .then(function(response) {
              this.$dispatch('changeStatus')
              this.$router.go({
                name: 'bill.pay.list'
              })
          })
      } else {
          this.$http.put('bills/'+this.bill.id, this.bill)
          .then(function(response) {
              this.$dispatch('changeStatus')
              this.$router.go({
                name: 'bill.pay.list'
              })
          })
      }
    }
  }
});
