'use strict';

window.billComponent = Vue.extend({
    template: '\n  <style media="screen">\n        #sidenav-overlay {\n        z-index: 996;\n    }\n  </style>\n    <ul class="dropdown-content" v-for="o in menus" :id="o.menuId">\n        <li v-for="item in o.menusDropdown" class="menu-dropdown">\n            <a v-link="{name: item.routeName}">{{item.name}}</a>\n        </li>\n    </ul>\n\n    <div class="navbar-fixed">\n        <!-- <nav class="teal">-->\n        <nav>\n            <div class="nav-wrapper container">\n                <a href="#" class="brand-logo right">Code Contas</a>\n                <a href="#" data-activates="nav-mobile" class="button-collapse">\n                    <i class="material-icons">menu</i>\n                </a>\n\n                <ul class="left hide-on-med-and-down">\n                    <li v-for="o in menus">\n                        <a v-if="o.menusDropdown" class="button-dropdown" :data-activates="o.menuId">\n                            {{o.name}} <i class="material-icons right">arrow_drop_down</i>\n                        </a>\n                        <a v-else v-link="{name: o.routeName}">{{o.name}}</a>\n                    </li>\n                </ul>\n\n                <ul id="nav-mobile" class="side-nav">\n\n                    <li v-for="o in menus">\n                        <div v-if="!o.menuId">\n                            <a @click.prevent="gotoMenu(o.routeName)">{{o.name}}</a>\n                        </div>\n                        <div v-else>\n                            <ul class="collapsible"  data-collapsible="accordion">\n                                <li>\n                                    <a class="collapsible-header">\n                                        {{o.name}} <i class="material-icons right">arrow_drop_down</i>\n                                    </a>\n                                    <div class="collapsible-body">\n                                        <ul>\n                                            <li v-for="item in o.menusDropdown">\n                                                <a @click.prevent="gotoMenu(item.routeName)">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </li>\n                            </ul>\n                        </div>\n                    </li>\n                 </ul>\n            </div>\n        </nav>\n    </div>\n    <router-view></router-view>\n  ',
    ready: function ready() {
        $('.button-collapse').sideNav();
        $('.collapsible').collapsible();
        $('.button-dropdown').dropdown({
            belowOrigin: true
        });
    },

    methods: {
        gotoMenu: function gotoMenu(rota) {
            $('.button-collapse').sideNav('hide');
            this.$router.go({
                name: rota
            });
        }
    },
    data: function data() {
        return {
            menus: [{ id: 0, name: "Dashboard", routeName: 'bills.dashboard', menuId: '', menusDropdown: '' }, { id: 0, name: "Contas a pagar", routeName: 'bills.pay', menuId: 'bill-pay', menusDropdown: [{ id: 0, name: "Listar Contas", routeName: 'bill.pay.list' }, { id: 1, name: "Criar Conta", routeName: 'bill.pay.create' }] }, { id: 1, name: "Contas a receber", routeName: 'bills.receive', menuId: 'bill-receive', menusDropdown: [{ id: 0, name: "Listar Contas", routeName: 'bill.receive.list' }, { id: 1, name: "Criar Conta", routeName: 'bill.receive.create' }] }]
        };
    }
});

var router = new VueRouter();
router.map({
    '/dashboard': {
        name: 'bills.dashboard',
        component: billDashboard
    },
    '/bills-pay': {
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
            }
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
            }
        }
    },
    '*': {
        component: billDashboard
    }
});

router.start({
    components: {
        'bill-component': billComponent
    }
}, '#app');

router.redirect({
    '*': '/dashboard'
});