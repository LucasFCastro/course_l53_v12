window.billReceiveListComponent = Vue.extend({
  template: `
    <style media="screen">
      .recebida{
        color: green
      }
      .nao-recebida {
        color: red
      }
    </style>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Vencimento</th>
          <th>Nome da Conta</th>
          <th>Valor</th>
          <th>Recebida?</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bill in bills">
          <td>{{bill.id}}</td>
          <td>{{bill.date_due | dateFormat 'pt-BR'}}</td>
          <td>{{bill.name | nameCase}}</td>
          <td>{{bill.value | numberCurrency 'pt-BR' 'BRL'}}</td>
          <td :class="{'recebida' : bill.done, 'nao-recebida' : !bill.done}">
            {{bill.done | doneLabelReceive}}
          </td>
          <td><a v-link="{name: 'bill.receive.update', params: {id: bill.id}}">Editar</a> | <a href="" @click.prevent="deleteBill(bill)">Excluir</a></td>
        </tr>
      </tbody>
    </table>
  `,
  data() {
    return {
      bills: []
    }
  },
  created() {
    this.$dispatch('getBillsReceive')
  },
    methods: {
      deleteBill(bill){
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
           () => {
               BillReceive.delete({id: bill.id}).then(() => {
                   this.bills.$remove(bill.id)
                   this.$dispatch('getBillsReceive')
                   this.$dispatch('changeStatusReceive')
                   swal("Excluída!", "A conta " + bill.name + " foi excluída com sucesso.", "success")
               })
           });
        },
      },
      events: {
          getBillsReceive(){
              BillReceive.query().then((response) => this.bills = response.data)
          }
      }
});
