"use strict";

window.billReceiveMenuComponent = Vue.extend({
  template: "\n    <ul>\n      <li v-for=\"o in menus\">\n        <a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n      </li>\n    </ul>\n  ",
  data: function data() {
    return {
      menus: [{ id: 0, name: "Listar Contas", routeName: 'bill.receive.list' }, { id: 1, name: "Criar Conta", routeName: 'bill.receive.create' }]
    };
  }
});