Vue.filter('doneLabel', function(value) {
  if (value == 1) {
    return 'Paga'
  }
  return 'Não Paga'
});

var app = new Vue({
  el: "#app",
  data: {
    title: "Contas a receber",
    menus: [
      {id: 0, name: "Listar Contas"},
      {id: 1, name: "Criar Conta"},
    ],
    activedView: 0,
    formType: "Cadastro de Contas",
    bill: {
      date_due:'',
      name:'',
      value: 0
    },
    bills:[
      {date_due: "10/12/2016", name: "Conta de Luz", value: 425.99, done: 1},
      {date_due: "01/11/2016", name: "Conta de Água", value: 64.82, done: 0},
      {date_due: "10/12/2016", name: "Conta de Telefone", value: 85.00, done: 0},
      {date_due: "05/12/2016", name: "Colégio", value: 488.00, done: 1},
      {date_due: "21/11/2016", name: "Cartão de Crédito", value: 2800.00, done: 0},
    ],
    names: [
      "Conta de Luz",
      "Conta de Água",
      "Conta de Telefone",
      "Colégio",
      "Cartão de Crédito",
    ]
  },
  computed: {
    status() {
      var count = 0;
      if (!this.bills) {
         return "Nenhuma conta cadastrada."
      }
      for(var i in this.bills){
        if (!this.bills[i].done) {
          count++;
        }
      }
      return !count? "Nenhuma conta a pagar" : "Existem " + count + " a serem pagas"
    },
    statusLabel(){
      if (this.bills.length == 0) {
        return 'sem-conta'
      }
      var count = 0;
      for(var i in this.bills){
        if (!this.bills[i].done) {
          count++;
        }
      }
      return !count? "nada-a-pagar" : "nao-paga"
    }
  },
  methods: {
    showView(number) {
      this.activedView = number
      if(number == 1) {
        this.formType = "Cadastrando Conta"
        this.inicializeBill()
      }
    },
    loadView(bill){
      this.formType = "Editando Conta"
      this.bill = bill
      this.activedView = 1
    },
    deleteBill(bill, id){
      bills = this.bills
      swal({
        title: "Excluir Conta",
        text: "Deseja excluir esta conta " + bill.name + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        closeOnConfirm: false,
        html: false
      },
        function(){
          bills.splice(id, 1)
          swal("Excluída!",
          "A conta " + bill.name + " foi excluída com sucesso.",
          "success")
        });
    },
    submit(){
      if(this.formType == "Cadastrando Conta"){
        this.bills.push(this.bill)
      }
      this.activedView = 0
    },
    inicializeBill(){
      console.log('zerando bill');
      this.bill = {
        date_due:'',
        name:'',
        value: 0
      }
    }
  }
});

app.$watch('title', function (novo, old) {
  console.log(old);
  console.log(novo);
});
