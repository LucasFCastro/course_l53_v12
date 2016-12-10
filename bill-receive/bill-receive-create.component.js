window.billReceiveCreateComponent = Vue.extend({
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
        <label for="pago">Recebida</label>
        <input type="checkbox" id="pago" v-model="bill.done">
        <br/>
        <br/>
        <input type="submit" value="Cadastrar">
    </form>
  `,
  data: function () {
      return {
        title: '',
        names: [
          "Aula de Matemática",
          "Aula de Lógica Matemácita",
          "Aulão ENEM",
          "Site Pessoal",
          "Licença Sistema de Laboratório",
        ],
        bill: {
          date_due:'',
          name:'',
          value: 0
        }
      }
  },
  created: function () {
    if (this.$route.name == 'bill.receive.create') {
        this.title = 'Criando Conta'
        this.bill = {
          date_due:'',
          name:'',
          value: 0
        }
    } else {
      this.title = 'Editando Conta'
      this.bill = this.$root.$children[0].billsReceive[this.$route.params.index]
  }
},
  methods: {
    submit(){
      if (this.title == 'Criando Conta') {
        this.$root.$children[0].billsReceive.push(this.bill)
      } else {

      }
      this.$router.go({
        name: 'bill.receive.list'
      })
    }
  }
});
