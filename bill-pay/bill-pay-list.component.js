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
          <th>#</th>
          <th>Vencimento</th>
          <th>Nome da Conta</th>
          <th>Valor</th>
          <th>Paga?</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(index, bill) in bills">
          <td>{{index+1}}</td>
          <td>{{bill.date_due}}</td>
          <td>{{bill.name}}</td>
          <td>{{bill.value | currency 'R$ '}}</td>
          <td :class="{'paga' : bill.done, 'nao-paga' : !bill.done}">
            <input type="checkbox" v-model="bill.done">
            {{bill.done | doneLabel}}
          </td>
          <td><a v-link="{name: 'bill.pay.update', params: {index: index}}">Editar</a> | <a href="" @click.prevent="deleteBill(bill, index)">Excluir</a></td>
        </tr>
      </tbody>
    </table>
  `,
  data: function () {
    return {
      bills: this.$root.$children[0].billsPay
    }
  },
  methods: {
    deleteBill(bill, id){
      bills = this.bills
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
        function(){
          bills.splice(id, 1)
          swal("Excluída!",
          "A conta " + bill.name + " foi excluída com sucesso.",
          "success")
        });
    }
  },
});
