var router = new VueRouter();

window.mainComponent = Vue.extend({
  components: {
    'bill-component': billComponent
  },
  template: `
    <bill-component></bill-component>
  `,
  data: function () {
    return {
      billsPay:[
        {date_due: "10/12/2016", name: "Conta de Luz", value: 425.99, done: 1},
        {date_due: "01/11/2016", name: "Conta de Água", value: 64.82, done: 0},
        {date_due: "10/12/2016", name: "Conta de Telefone", value: 85.00, done: 0},
        {date_due: "05/12/2016", name: "Colégio", value: 488.00, done: 1},
        {date_due: "21/11/2016", name: "Cartão de Crédito", value: 2800.00, done: 0},
      ]
    }
  }
});

router.map({
  '/bills-pay' : {
    name: 'bills.pay',
    component: billPayComponent,
    subRoutes: {
      '/': {
        name: 'bill.pay.list',
        component: billPayListComponent
      },
      '/create': {
        name: 'bill.pay.create',
        component: billPayCreateComponent
      },
      '/:index/update': {
        name: 'bill.pay.update',
        component: billPayCreateComponent
      },
    }
  },
  'bills-receive': {
      name: 'bills.receive',
      component: billReceiveComponent
  },
  '*' : {
    component: billPayComponent
  }
});

router.start({
  components: {
    'main-component' : mainComponent
  }
},'#app');

router.redirect({
  '*' : '/bills-pay'
});
