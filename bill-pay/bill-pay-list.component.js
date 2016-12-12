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
  http: {
      root: 'http://localhost:8080/api',
  },
  data: function () {
    return {
      bills: []
    }
  },
  created: function () {
    this.$dispatch('getBills')
  },
  methods: {
    deleteBill(bill){
        if (confirm('Deseja excluir esta conta?')){
            this.$http.delete('bills/'+bill.id).then(function() {
                this.bills.$remove(bill.id)
                this.$dispatch('getBills')
                this.$dispatch('changeStatus')
                swal("Excluída!", "A conta " + bill.name + " foi excluída com sucesso.", "success")
            })
        }

        },
    },
    events: {
        getBills(){
            this.$http.get('bills')
            .then(function(response) {
                this.bills = response.data;
            })
        }
    }
});
