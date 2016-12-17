window.billReceiveCreateComponent = Vue.extend({
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
        <label for="pago">Recebida</label>
        <input type="checkbox" id="pago" v-model="bill.done"> {{bill.done | doneLabelReceive}}
        <br/>
        <br/>
        <input type="submit" value="Cadastrar">
    </form>
  `,
  data() {
      return {
        title: '',
        names: [
          "Aula de Matemática",
          "Aula de Lógica Matemácita",
          "Aulão ENEM",
          "Site Pessoal",
          "Licença Sistema de Laboratório",
        ],
        bill: new BillReceiveClass()
      }
  },
  created() {
    if (this.$route.name == 'bill.receive.create') {
        this.title = 'Criando Conta'
        this.bill = new BillReceiveClass()
    } else {
      this.title = 'Editando Conta'
      BillReceive.get({id: this.$route.params.id})
      .then((response) => this.bill = new BillReceiveClass(response.data))
  }
},
  methods: {
      submit(){
          if (this.title == 'Criando Conta') {
            BillReceive.save({}, this.bill.toJSON())
            .then((response) => {
                this.$dispatch('changeStatusReceive')
                this.$router.go({
                  name: 'bill.receive.list'
                })
            })
        } else {
            BillReceive.update({id: this.bill.id}, this.bill.toJSON())
            .then((response) => {
                this.$dispatch('changeStatusReceive')
                this.$router.go({
                  name: 'bill.receive.list'
                })
            })
        }
      }
  }
});
