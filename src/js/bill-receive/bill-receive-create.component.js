module.exports = {
  template: `
  <div class="container">
  <div class="row">
  <div class="col s12">
  <div class="card z-depth-3">
        <form @submit.prevent="submit">
            <h5 class="header-dialog">{{title}}</h5>
            <div class="card-content">
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="bill.date_due | dateFormat" id="date_due"
                        placeholder="Informe a data">
                        <label class="active" for="date_due">Vencimento</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="text" id="value" v-model="bill.value | numberCurrency">
                        <label class="active" for="value">Valor</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <label class="active" for="name">Nome</label>
                        <select v-model="bill.name | nameCase" class="browser-default">
                            <option value="" disabled selected>Selecione uma opção</option>
                            <option v-for="o in names" :value="o | nameCase">{{o}}</option>
                        </select>
                    </div>
                    <div class="input-field col s6">
                      <input type="checkbox" id="pago" v-model="bill.done">
                      <label for="pago"> Recebida?</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="submit" value="Cadastrar" class="btn btn-primary right waves-effect">
                    </div>
                </div>
            </div>
        </form>
    </div>
    </div>
    </div>
    </div>  `,
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
};
