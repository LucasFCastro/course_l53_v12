'use strict';

window.billPayListComponent = Vue.extend({
    components: {
        'modal': modalComponent
    },
    template: '\n    <style media="screen">\n      .paga{\n        color: green\n      }\n      .nao-paga {\n        color: red\n      }\n    </style>\n    <div class="container">\n        <div class="row">\n            <div class="col s12">\n                 <a class="\n                     btn-floating btn-large waves-effect waves-light\n                     z-depth-3\n                     right"\n                     v-link="{name: \'bill.pay.create\'}"><i class="material-icons">add</i></a>\n             </div>\n         </div>\n\n         <div class="row">\n            <table class="bordered responsive-table highlight z-depth-2">\n              <thead>\n                <tr>\n                  <th class="center">Id</th>\n                  <th>Vencimento</th>\n                  <th>Nome da Conta</th>\n                  <th class="center">Valor</th>\n                  <th class="center">Status</th>\n                  <th class="center">A\xE7\xF5es</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr v-for="bill in bills">\n                  <td class="center">{{bill.id}}</td>\n                  <td>{{bill.date_due | dateFormat \'pt-BR\'}}</td>\n                  <td>{{bill.name | nameCase}}</td>\n                  <td class="right">{{bill.value | numberCurrency \'pt-BR\' \'BRL\'}}</td>\n                  <td class="center" :class="{\'paga\' : bill.done, \'nao-paga\' : !bill.done}">\n                    {{bill.done | doneLabelPay}}\n                  </td>\n                  <td class="center">\n                    <a v-link="{name: \'bill.pay.update\', params: {id: bill.id}}">\n                        <i class="material-icons">edit</i>\n                    </a> |\n                    <a href="" @click.prevent="openModalDelete(bill)">\n                        <i class="material-icons">delete</i>\n                    </a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n        </div>\n    </div>\n    <modal :modal="modal">\n        <div slot="content">\n            <h4 class="header">Mensagem de confirma\xE7\xE3o</h4>\n            <div class="divider"></div>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <p>nome: <strong>{{billDelete.name | nameCase}}</strong></p>\n            <p>nome: <strong>{{billDelete.date_due | dateFormat}}</strong></p>\n            <p>Valor: <strong>{{billDelete.value | numberCurrency \'pt-BR\' \'BRL\'}}</strong></p>\n            <div class="divider"></div>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill">Confirmar</button>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n        </div>\n    </modal>\n  ',
    data: function data() {
        return {
            bills: [],
            billDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created: function created() {
        this.$dispatch('getBillsPay');
    },

    methods: {
        openModalDelete: function openModalDelete(bill) {
            this.billDelete = bill;
            $('#modal-delete').modal('open');
        },
        deleteBill: function deleteBill() {
            var _this = this;

            BillPay.delete({ id: this.billDelete.id }).then(function () {
                _this.bills.$remove(_this.billDelete.id);
                _this.$dispatch('getBillsPay');
                _this.$dispatch('changeStatusPay');
                swal("Excluída!", "A conta " + _this.billDelete.name + " foi excluída com sucesso.", "success");
                _this.billDelete = null;
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