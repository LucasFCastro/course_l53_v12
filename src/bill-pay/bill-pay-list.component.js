window.billPayListComponent = Vue.extend({
  template: `
    <style media="screen">
      .paga{
        color: green
      }
      .nao-paga {
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
          <th>Paga?</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bill in bills">
          <td>{{bill.id}}</td>
          <td>{{bill.date_due | dateFormat}}</td>
          <td>{{bill.name}}</td>
          <td>{{bill.value | numberCurrency}}</td>
          <td :class="{'paga' : bill.done, 'nao-paga' : !bill.done}">
            {{bill.done | doneLabelPay}}
          </td>
          <td><a v-link="{name: 'bill.pay.update', params: {id: bill.id}}">Editar</a> | <a href="" @click.prevent="deleteBill(bill)">Excluir</a></td>
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
    this.$dispatch('getBillsPay')
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
             BillPay.delete({id: bill.id}).then(() => {
                 this.bills.$remove(bill.id)
                 this.$dispatch('getBillsPay')
                 this.$dispatch('changeStatusPay')
                 swal("Excluída!", "A conta " + bill.name + " foi excluída com sucesso.", "success")
             })
         });
      },
    },
    events: {
        getBillsPay(){
            BillPay.query().then((response) => {
                this.bills = response.data;
            })
        }
    }
});
