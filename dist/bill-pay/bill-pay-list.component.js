"use strict";

window.billPayListComponent = Vue.extend({
  template: "\n    <style media=\"screen\">\n      .paga{\n        color: green\n      }\n      .nao-paga {\n        color: red\n      }\n    </style>\n    <table>\n      <thead>\n        <tr>\n          <th>Id</th>\n          <th>Vencimento</th>\n          <th>Nome da Conta</th>\n          <th>Valor</th>\n          <th>Paga?</th>\n          <th>A\xE7\xF5es</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr v-for=\"bill in bills\">\n          <td>{{bill.id}}</td>\n          <td>{{bill.date_due | dateFormat}}</td>\n          <td>{{bill.name}}</td>\n          <td>{{bill.value | numberCurrency}}</td>\n          <td :class=\"{'paga' : bill.done, 'nao-paga' : !bill.done}\">\n            {{bill.done | doneLabelPay}}\n          </td>\n          <td><a v-link=\"{name: 'bill.pay.update', params: {id: bill.id}}\">Editar</a> | <a href=\"\" @click.prevent=\"deleteBill(bill)\">Excluir</a></td>\n        </tr>\n      </tbody>\n    </table>\n  ",
  data: function data() {
    return {
      bills: []
    };
  },
  created: function created() {
    this.$dispatch('getBillsPay');
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
        BillPay.delete({ id: bill.id }).then(function () {
          _this.bills.$remove(bill.id);
          _this.$dispatch('getBillsPay');
          _this.$dispatch('changeStatusPay');
          swal("Excluída!", "A conta " + bill.name + " foi excluída com sucesso.", "success");
        });
      });
    }
  },
  events: {
    getBillsPay: function getBillsPay() {
      var _this2 = this;

      BillPay.query().then(function (response) {
        _this2.bills = response.data;
      });
    }
  }
});