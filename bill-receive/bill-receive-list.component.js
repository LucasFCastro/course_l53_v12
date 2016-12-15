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
          <td>{{bill.date_due}}</td>
          <td>{{bill.name}}</td>
          <td>{{bill.value | currency 'R$ '}}</td>
          <td :class="{'recebida' : bill.done, 'nao-recebida' : !bill.done}">
            {{bill.done | doneLabelReceive}}
          </td>
          <td><a v-link="{name: 'bill.receive.update', params: {id: bill.id}}">Editar</a> | <a href="" @click.prevent="deleteBill(bill)">Excluir</a></td>
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
    this.$dispatch('getBillsReceive')
  },
    methods: {
      deleteBill(bill){
          var self = this
          if (confirm('Deseja excluir esta conta a receber?')){
              BillReceive.delete({id: bill.id}).then(function() {
                  self.bills.$remove(bill.id)
                  self.$dispatch('getBillsReceive')
                  self.$dispatch('changeStatusReceive')
                  swal("Excluída!", "A conta " + bill.name + " foi excluída com sucesso.", "success")
              })
          }

          },
      },
      events: {
          getBillsReceive(){
              var self = this
              BillReceive.query().then(function(response) {
                  self.bills = response.data;
              })
          }
      }
});
