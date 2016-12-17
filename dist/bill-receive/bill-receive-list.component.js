"use strict";

window.billReceiveListComponent = Vue.extend({
  template: "\n    <style media=\"screen\">\n      .recebida{\n        color: green\n      }\n      .nao-recebida {\n        color: red\n      }\n    </style>\n    <table>\n      <thead>\n        <tr>\n          <th>Id</th>\n          <th>Vencimento</th>\n          <th>Nome da Conta</th>\n          <th>Valor</th>\n          <th>Recebida?</th>\n          <th>A\xE7\xF5es</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr v-for=\"bill in bills\">\n          <td>{{bill.id}}</td>\n          <td>{{bill.date_due | dateFormat 'pt-BR'}}</td>\n          <td>{{bill.name | nameCase}}</td>\n          <td>{{bill.value | numberCurrency 'pt-BR' 'BRL'}}</td>\n          <td :class=\"{'recebida' : bill.done, 'nao-recebida' : !bill.done}\">\n            {{bill.done | doneLabelReceive}}\n          </td>\n          <td><a v-link=\"{name: 'bill.receive.update', params: {id: bill.id}}\">Editar</a> | <a href=\"\" @click.prevent=\"deleteBill(bill)\">Excluir</a></td>\n        </tr>\n      </tbody>\n    </table>\n  ",
  data: function data() {
    return {
      bills: []
    };
  },
  created: function created() {
    this.$dispatch('getBillsReceive');
  },

  methods: {
    deleteBill: function deleteBill(bill) {
      var _this = this;

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
      }, function () {
        BillReceive.delete({ id: bill.id }).then(function () {
          _this.bills.$remove(bill.id);
          _this.$dispatch('getBillsReceive');
          _this.$dispatch('changeStatusReceive');
          swal("Excluída!", "A conta " + bill.name + " foi excluída com sucesso.", "success");
        });
      });
    }
  },
  events: {
    getBillsReceive: function getBillsReceive() {
      var _this2 = this;

      BillReceive.query().then(function (response) {
        return _this2.bills = response.data;
      });
    }
  }
});