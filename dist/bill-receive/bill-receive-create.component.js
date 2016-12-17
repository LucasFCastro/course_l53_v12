"use strict";

window.billReceiveCreateComponent = Vue.extend({
  template: "\n    <form @submit.prevent=\"submit\">\n        <h3>{{title}}</h3>\n        <label for=\"date_due\">Vencimento</label>\n        <input type=\"text\" v-model=\"bill.date_due | dateFormat\" id=\"date_due\">\n        <br/>\n        <br/>\n        <label for=\"name\">Nome</label>\n        <select v-model=\"bill.name | nameCase\">\n          <option v-for=\"o in names\" :value=\"o | nameCase\">{{o}}</option>\n        </select>\n        <br/>\n        <br/>\n        <label for=\"value\">Valor</label>\n        <input type=\"text\" id=\"value\" v-model=\"bill.value | numberCurrency\">\n        <br/>\n        <br/>\n        <label for=\"pago\">Recebida</label>\n        <input type=\"checkbox\" id=\"pago\" v-model=\"bill.done\"> {{bill.done | doneLabelReceive}}\n        <br/>\n        <br/>\n        <input type=\"submit\" value=\"Cadastrar\">\n    </form>\n  ",
  data: function data() {
    return {
      title: '',
      names: ["Aula de Matemática", "Aula de Lógica Matemácita", "Aulão ENEM", "Site Pessoal", "Licença Sistema de Laboratório"],
      bill: new BillReceiveClass()
    };
  },
  created: function created() {
    var _this = this;

    if (this.$route.name == 'bill.receive.create') {
      this.title = 'Criando Conta';
      this.bill = new BillReceiveClass();
    } else {
      this.title = 'Editando Conta';
      BillReceive.get({ id: this.$route.params.id }).then(function (response) {
        return _this.bill = new BillReceiveClass(response.data);
      });
    }
  },

  methods: {
    submit: function submit() {
      var _this2 = this;

      if (this.title == 'Criando Conta') {
        BillReceive.save({}, this.bill.toJSON()).then(function (response) {
          _this2.$dispatch('changeStatusReceive');
          _this2.$router.go({
            name: 'bill.receive.list'
          });
        });
      } else {
        BillReceive.update({ id: this.bill.id }, this.bill.toJSON()).then(function (response) {
          _this2.$dispatch('changeStatusReceive');
          _this2.$router.go({
            name: 'bill.receive.list'
          });
        });
      }
    }
  }
});