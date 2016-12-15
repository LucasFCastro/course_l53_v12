window.billPayMenuComponent = Vue.extend({
  template: `
    <ul>
      <li v-for="o in menus">
        <a v-link="{name: o.routeName}">{{o.name}}</a>
      </li>
    </ul>
  `,
  data(){
    return {
      menus: [
        {id: 0, name: "Listar Contas", routeName: 'bill.pay.list'},
        {id: 1, name: "Criar Conta", routeName: 'bill.pay.create'},
      ]
    }
  }
});
