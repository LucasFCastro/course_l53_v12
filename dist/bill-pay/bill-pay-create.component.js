"use strict";

window.billPayCreateComponent = Vue.extend({
  template: "\n    <form @submit.prevent=\"submit\">\n        <h3>{{title}}</h3>\n        <label for=\"date_due\">Vencimento</label>\n        <input type=\"text\" v-model=\"bill.date_due\" id=\"date_due\">\n        <br/>\n        <br/>\n        <label for=\"name\">Nome</label>\n        <select v-model=\"bill.name\">\n          <option v-for=\"o in names\" :value=\"o\">{{o}}</option>\n        </select>\n        <br/>\n        <br/>\n        <label for=\"value\">Valor</label>\n        <input type=\"text\" id=\"value\" v-model=\"bill.value\">\n        <br/>\n        <br/>\n        <label for=\"pago\">Paga</label>\n        <input type=\"checkbox\" id=\"pago\" v-model=\"bill.done\"> {{bill.done | doneLabelPay}}\n        <br/>\n        <br/>\n        <input type=\"submit\" value=\"Cadastrar\">\n    </form>\n  ",
  data: function data() {
    return {
      title: '',
      names: ["Conta de Luz", "Conta de Água", "Conta de Telefone", "Colégio", "Cartão de Crédito"],
      bill: {
        date_due: '',
        name: '',
        value: 0
      }
    };
  },
  created: function created() {
    var _this = this;

    if (this.$route.name == 'bill.pay.create') {
      this.title = 'Criando Conta';
      this.bill = {
        date_due: '',
        name: '',
        value: 0
      };
    } else {
      this.title = 'Editando Conta';
      BillPay.get({ id: this.$route.params.id }).then(function (response) {
        return _this.bill = response.data;
      });
    }
  },

  methods: {
    submit: function submit() {
      var _this2 = this;

      if (this.title == 'Criando Conta') {
        BillPay.save({}, this.bill).then(function (response) {
          _this2.$dispatch('changeStatusPay');
          _this2.$router.go({
            name: 'bill.pay.list'
          });
        });
      } else {
        BillPay.update({ id: this.bill.id }, this.bill).then(function (response) {
          _this2.$dispatch('changeStatusPay');
          _this2.$router.go({
            name: 'bill.pay.list'
          });
        });
      }
    }
  }
});