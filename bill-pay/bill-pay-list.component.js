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
          <td>{{bill.date_due}}</td>
          <td>{{bill.name}}</td>
          <td>{{bill.value | currency 'R$ '}}</td>
          <td :class="{'paga' : bill.done, 'nao-paga' : !bill.done}">
            {{bill.done | doneLabelPay}}
          </td>
          <td><a v-link="{name: 'bill.pay.update', params: {id: bill.id}}">Editar</a> | <a href="" @click.prevent="deleteBill(bill)">Excluir</a></td>
        </tr>
      </tbody>
    </table>
  `,
  data: function () {
    return {
      bills: []
    }
  },
  created: function () {
    this.$dispatch('getBillsPay')
  },
  methods: {
    deleteBill(bill){
        if (confirm('Deseja excluir esta conta?')){
            var self = this
            BillPay.delete({id: bill.id}).then(function() {
                self.bills.$remove(bill.id)
                self.$dispatch('getBillsPay')
                self.$dispatch('changeStatusPay')
                swal("Excluída!", "A conta " + bill.name + " foi excluída com sucesso.", "success")
            })
        }

        },
    },
    events: {
        getBillsPay(){
            var self = this
            BillPay.query().then(function(response) {
                self.bills = response.data;
            })
        }
    }
});
