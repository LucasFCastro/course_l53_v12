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
        <input type="checkbox" id="pago" v-model="bill.done"> {{bill.done | doneLabelReceive}}
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
      var self = this
      BillReceive.get({id: this.$route.params.id})
      .then(function(response) {
          self.bill = response.data;
      })
  }
},
  methods: {
      submit(){
          var self = this
          if (this.title == 'Criando Conta') {
            BillReceive.save({}, this.bill)
            .then(function(response) {
                self.$dispatch('changeStatusReceive')
                self.$router.go({
                  name: 'bill.receive.list'
                })
            })
        } else {
            BillReceive.update({id: this.bill.id}, this.bill)
            .then(function(response) {
                self.$dispatch('changeStatusReceive')
                self.$router.go({
                  name: 'bill.receive.list'
                })
            })
        }
      }
  }
});
