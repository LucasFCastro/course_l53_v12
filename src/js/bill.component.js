window.billComponent = Vue.extend({
  template: `
  <style media="screen">
        #sidenav-overlay {
        z-index: 996;
    }
  </style>
    <ul class="dropdown-content" v-for="o in menus" :id="o.menuId">
        <li v-for="item in o.menusDropdown" class="menu-dropdown">
            <a v-link="{name: item.routeName}">{{item.name}}</a>
        </li>
    </ul>

    <div class="navbar-fixed">
        <!-- <nav class="teal">-->
        <nav>
            <div class="nav-wrapper container">
                <a href="#" class="brand-logo right">Code Contas</a>
                <a href="#" data-activates="nav-mobile" class="button-collapse">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="left hide-on-med-and-down">
                    <li v-for="o in menus">
                        <a v-if="o.menusDropdown" class="button-dropdown" :data-activates="o.menuId">
                            {{o.name}} <i class="material-icons right">arrow_drop_down</i>
                        </a>
                        <a v-else v-link="{name: o.routeName}">{{o.name}}</a>
                    </li>
                </ul>

                <ul id="nav-mobile" class="side-nav">

                    <li v-for="o in menus">
                        <div v-if="!o.menuId">
                            <a @click.prevent="gotoMenu(o.routeName)">{{o.name}}</a>
                        </div>
                        <div v-else>
                            <ul class="collapsible"  data-collapsible="accordion">
                                <li>
                                    <a class="collapsible-header">
                                        {{o.name}} <i class="material-icons right">arrow_drop_down</i>
                                    </a>
                                    <div class="collapsible-body">
                                        <ul>
                                            <li v-for="item in o.menusDropdown">
                                                <a @click.prevent="gotoMenu(item.routeName)">{{item.name}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                 </ul>
            </div>
        </nav>
    </div>
    <router-view></router-view>
  `,
  ready(){
      $('.button-collapse').sideNav()
      $('.collapsible').collapsible()
      $('.button-dropdown').dropdown({
          belowOrigin: true
      })
  },
  methods: {
      gotoMenu(rota) {
          $('.button-collapse').sideNav('hide');
          this.$router.go({
            name: rota
          })
      }
  },
  data(){
    return {
      menus: [
        {id: 0, name: "Dashboard", routeName: 'bills.dashboard', menuId: '', menusDropdown: ''},
        {id: 0, name: "Contas a pagar", routeName: 'bills.pay',menuId: 'bill-pay',  menusDropdown: [
            {id: 0, name: "Listar Contas", routeName: 'bill.pay.list'},
            {id: 1, name: "Criar Conta", routeName: 'bill.pay.create'},
        ]},
        {id: 1, name: "Contas a receber", routeName: 'bills.receive', menuId: 'bill-receive', menusDropdown: [
            {id: 0, name: "Listar Contas", routeName: 'bill.receive.list'},
            {id: 1, name: "Criar Conta", routeName: 'bill.receive.create'},
        ]},
    ]
    }
  }
});

var router = new VueRouter();
router.map({
    '/dashboard' : {
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
  '/bills-receive': {
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
  '*' : '/dashboard'
});
