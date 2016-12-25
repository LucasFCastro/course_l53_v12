'use strict';

var modalComponent = require('../modal.component');
module.exports = {
    components: {
        'modal': modalComponent
    },
    template: '\n  <div class="container">\n      <div class="row">\n          <div class="col s12">\n               <a class="\n                   btn-floating btn-large waves-effect waves-light\n                   z-depth-3\n                   right"\n                   v-link="{name: \'bill.receive.create\'}"><i class="material-icons">add</i></a>\n           </div>\n       </div>\n\n       <div class="row">\n            <table class="bordered responsive-table highlight z-depth-2">\n              <thead>\n                <tr>\n                  <th class="center">Id</th>\n                  <th>Vencimento</th>\n                  <th class="center">Nome da Conta</th>\n                  <th class="center">Valor</th>\n                  <th class="center">Recebida?</th>\n                  <th class="center">A\xE7\xF5es</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr v-for="bill in bills">\n                  <td>{{bill.id}}</td>\n                  <td>{{bill.date_due | dateFormat \'pt-BR\'}}</td>\n                  <td>{{bill.name | nameCase}}</td>\n                  <td class="right">{{bill.value | numberCurrency \'pt-BR\' \'BRL\'}}</td>\n                  <td class="center" :class="{\'green-text\' : bill.done, \'red-text\' : !bill.done}">\n                    {{bill.done | doneLabelReceive}}\n                  </td>\n                  <td>\n                    <a v-link="{name: \'bill.receive.update\', params: {id: bill.id}}">\n                        <i class="material-icons">edit</i>\n                    </a> |\n                    <a href="" @click.prevent="openModalDelete(bill)">\n                        <i class="material-icons">delete</i>\n                    </a>\n                </td>\n                </tr>\n              </tbody>\n            </table>\n        </div>\n    </div>\n    <modal :modal="modal">\n        <div slot="content">\n            <h4 class="header-dialog">Mensagem de confirma\xE7\xE3o</h4>\n            <div class="divider"></div>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <p>nome: <strong>{{billDelete.name | nameCase}}</strong></p>\n            <p>nome: <strong>{{billDelete.date_due | dateFormat}}</strong></p>\n            <p>Valor: <strong>{{billDelete.value | numberCurrency \'pt-BR\' \'BRL\'}}</strong></p>\n            <div class="divider"></div>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill">Confirmar</button>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect grey lighten-2 waves-red modal-close modal-action">Cancelar</button>\n        </div>\n    </modal>\n  ',
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
        this.$dispatch('getBillsReceive');
    },

    methods: {
        openModalDelete: function openModalDelete(bill) {
            this.billDelete = bill;
            $('#modal-delete').modal('open');
        },
        deleteBill: function deleteBill(bill) {
            var _this = this;

            BillReceive.delete({ id: this.billDelete.id }).then(function () {
                _this.bills.$remove(_this.billDelete.id);
                _this.$dispatch('getBillsReceive');
                _this.$dispatch('changeStatusReceive');
                swal("Excluída!", "A conta " + _this.billDelete.name + " foi excluída com sucesso.", "success");
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
};