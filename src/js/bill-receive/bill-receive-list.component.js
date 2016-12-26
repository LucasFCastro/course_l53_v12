import {BillReceive} from '../resources';
import modalComponent from '../modal.component';

export default {
    components: {
        'modal':  modalComponent
    },
  template: `
  <div class="container">
      <div class="row">
          <div class="col s12">
               <a class="
                   btn-floating btn-large waves-effect waves-light
                   z-depth-3
                   right"
                   v-link="{name: 'bill.receive.create'}"><i class="material-icons">add</i></a>
           </div>
       </div>

       <div class="row">
            <table class="bordered responsive-table highlight z-depth-2">
              <thead>
                <tr>
                  <th class="center">Id</th>
                  <th>Vencimento</th>
                  <th class="center">Nome da Conta</th>
                  <th class="center">Valor</th>
                  <th class="center">Recebida?</th>
                  <th class="center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="bill in bills">
                  <td>{{bill.id}}</td>
                  <td>{{bill.date_due | dateFormat 'pt-BR'}}</td>
                  <td>{{bill.name | nameCase}}</td>
                  <td class="right">{{bill.value | numberCurrency 'pt-BR' 'BRL'}}</td>
                  <td class="center" :class="{'green-text' : bill.done, 'red-text' : !bill.done}">
                    {{bill.done | doneLabelReceive}}
                  </td>
                  <td>
                    <a v-link="{name: 'bill.receive.update', params: {id: bill.id}}">
                        <i class="material-icons">edit</i>
                    </a> |
                    <a href="" @click.prevent="openModalDelete(bill)">
                        <i class="material-icons">delete</i>
                    </a>
                </td>
                </tr>
              </tbody>
            </table>
        </div>
    </div>
    <modal :modal="modal">
        <div slot="content" v-if="billDelete">
            <h4 class="header-dialog">Mensagem de confirmação</h4>
            <div class="divider"></div>
            <p><strong>Deseja excluir esta conta?</strong></p>
            <p>nome: <strong>{{billDelete.name | nameCase}}</strong></p>
            <p>nome: <strong>{{billDelete.date_due | dateFormat}}</strong></p>
            <p>Valor: <strong>{{billDelete.value | numberCurrency 'pt-BR' 'BRL'}}</strong></p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill">Confirmar</button>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect grey lighten-2 waves-red modal-close modal-action">Cancelar</button>
        </div>
    </modal>
  `,
  data() {
    return {
      bills: [],
      billDelete: null,
      modal: {
          id: 'modal-delete'
      }
    }
  },
  created() {
    this.$dispatch('getBillsReceive')
  },
    methods: {
        openModalDelete(bill) {
            this.billDelete = bill;
            $('#modal-delete').modal('open');
        },
      deleteBill(bill){
           BillReceive.delete({id: this.billDelete.id}).then(() => {
               this.bills.$remove(this.billDelete.id)
               this.$dispatch('getBillsReceive')
               this.$dispatch('changeStatusReceive')
               swal("Excluída!", "A conta " + this.billDelete.name + " foi excluída com sucesso.", "success")
           })
        },
      },
      events: {
          getBillsReceive(){
              BillReceive.query().then((response) => this.bills = response.data)
          }
      }
};
