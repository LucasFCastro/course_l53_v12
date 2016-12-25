"use strict";

module.exports = {
    template: "\n  <div class=\"container\">\n  <div class=\"row\">\n  <div class=\"col s12\">\n  <div class=\"card z-depth-3\">\n\n      <form @submit.prevent=\"submit\">\n          <h5 class=\"header-dialog\">{{title}}</h5>\n          <div class=\"card-content\">\n\n              <div class=\"row\">\n                  <div class=\"input-field col s6\">\n                      <input type=\"text\" v-model=\"bill.date_due | dateFormat\" id=\"date_due\"\n                      placeholder=\"Informe a data\">\n                      <label class=\"active\" for=\"date_due\">Vencimento</label>\n                  </div>\n                  <div class=\"input-field col s6\">\n                      <input type=\"text\" id=\"value\" v-model=\"bill.value | numberCurrency\">\n                      <label class=\"active\" for=\"value\">Valor</label>\n                  </div>\n              </div>\n\n              <div class=\"row\">\n                  <div class=\"input-field col s6\">\n                      <label class=\"active\" for=\"name\">Nome</label>\n                      <select v-model=\"bill.name | nameCase\" class=\"browser-default\">\n                          <option value=\"\" disabled selected>Selecione uma op\xE7\xE3o</option>\n                          <option v-for=\"o in names\" :value=\"o | nameCase\">{{o}}</option>\n                      </select>\n                  </div>\n                  <div class=\"input-field col s6\">\n                    <input type=\"checkbox\" id=\"pago\" v-model=\"bill.done\">\n                    <label for=\"pago\"> Pago?</label>\n                  </div>\n              </div>\n\n              <div class=\"row\">\n                  <div class=\"input-field col s12\">\n                      <input type=\"submit\" value=\"Cadastrar\" class=\"btn btn-primary right waves-effect\">\n                  </div>\n              </div>\n          </div>\n      </form>\n  </div>\n  </div>\n  </div>\n  </div>\n  ",
    data: function data() {
        return {
            title: '',
            names: ["Conta de Luz", "Conta de Água", "Conta de Telefone", "Colégio", "Cartão de Crédito"],
            bill: new BillPayClass()
        };
    },
    created: function created() {
        var _this = this;

        if (this.$route.name == 'bill.pay.create') {
            this.title = 'Criando Conta';
            this.bill = new BillPayClass();
        } else {
            this.title = 'Editando Conta';
            BillPay.get({ id: this.$route.params.id }).then(function (response) {
                return _this.bill = new BillPayClass(response.data);
            });
        }
        $(document).ready(function () {
            $('select').material_select();
        });
    },

    methods: {
        submit: function submit() {
            var _this2 = this;

            if (this.title == 'Criando Conta') {
                BillPay.save({}, this.bill.toJSON()).then(function (response) {
                    swal("Inclusão!", "Conta incluída com sucesso.", "success");
                    _this2.$dispatch('changeStatusPay');
                    _this2.$router.go({
                        name: 'bill.pay.list'
                    });
                });
            } else {
                BillPay.update({ id: this.bill.id }, this.bill.toJSON()).then(function (response) {
                    swal("Alteração!", "Conta atualizada com sucesso.", "success");
                    _this2.$dispatch('changeStatusPay');
                    _this2.$router.go({
                        name: 'bill.pay.list'
                    });
                });
            }
        }
    }
};