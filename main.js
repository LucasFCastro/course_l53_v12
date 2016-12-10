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
    ],
      billsReceive:[
          {date_due: "10/12/2016", name: "Aula de Matemática", value: 99.99, done: 1},
          {date_due: "01/12/2016", name: "Aula de Lógica Matemática", value: 199.99, done: 0},
          {date_due: "01/01/2017", name: "Sistema de Laboratório", value: 1800.00, done: 0},
      ]
    }
  }
});

router.map({
    'dashboard' : {
        name: 'bills.dashboard',
        component: billDashboard
    },
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
      component: billReceiveComponent,
      subRoutes: {
        '/': {
          name: 'bill.receive.list',
          component: billReceiveListComponent
        },
        '/create': {
          name: 'bill.receive.create',
          component: billReceiveCreateComponent
        },
        '/:index/update': {
          name: 'bill.receive.update',
          component: billReceiveCreateComponent
        },
      }
    },
    '*' : {
        component: billDashboard
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
