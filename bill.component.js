window.billComponent = Vue.extend({
  template: `
    <ul>
      <li v-for="o in menus">
        <a v-link="{name: o.routeName}">{{o.name}}</a>
      </li>
    </ul>
    <router-view></router-view>
  `,
  data: function(){
    return {
      menus: [
        {id: 0, name: "Dashboard", routeName: 'bills.dashboard'},
        {id: 0, name: "Contas a pagar", routeName: 'bills.pay'},
        {id: 1, name: "Contas a receber", routeName: 'bills.receive'},
      ]
    }
  }
});

var router = new VueRouter();
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
      '/:id/update': {
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
        '/:id/update': {
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
    'bill-component' : billComponent
  }
},'#app');

router.redirect({
  '*' : '/bills-pay'
});
