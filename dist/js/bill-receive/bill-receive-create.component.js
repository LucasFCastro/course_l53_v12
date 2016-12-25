"use strict";

module.exports = {
    template: "\n  <div class=\"container\">\n  <div class=\"row\">\n  <div class=\"col s12\">\n  <div class=\"card z-depth-3\">\n        <form @submit.prevent=\"submit\">\n            <h5 class=\"header-dialog\">{{title}}</h5>\n            <div class=\"card-content\">\n                <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                        <input type=\"text\" v-model=\"bill.date_due | dateFormat\" id=\"date_due\"\n                        placeholder=\"Informe a data\">\n                        <label class=\"active\" for=\"date_due\">Vencimento</label>\n                    </div>\n                    <div class=\"input-field col s6\">\n                        <input type=\"text\" id=\"value\" v-model=\"bill.value | numberCurrency\">\n                        <label class=\"active\" for=\"value\">Valor</label>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                        <label class=\"active\" for=\"name\">Nome</label>\n                        <select v-model=\"bill.name | nameCase\" class=\"browser-default\">\n                            <option value=\"\" disabled selected>Selecione uma op\xE7\xE3o</option>\n                            <option v-for=\"o in names\" :value=\"o | nameCase\">{{o}}</option>\n                        </select>\n                    </div>\n                    <div class=\"input-field col s6\">\n                      <input type=\"checkbox\" id=\"pago\" v-model=\"bill.done\">\n                      <label for=\"pago\"> Recebida?</label>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"input-field col s12\">\n                        <input type=\"submit\" value=\"Cadastrar\" class=\"btn btn-primary right waves-effect\">\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n    </div>\n    </div>\n    </div>  ",
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
};