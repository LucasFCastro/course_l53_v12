window.billComponent = Vue.extend({
  template: `
    <ul>
      <li v-for="o in menus">
        <!--<a v-link="{path: o.url}">{{o.name}}</a>-->
        <a v-link="{name: o.routeName}">{{o.name}}</a>
      </li>
    </ul>
    <router-view></router-view>
  `,
  data: function(){
    return {
      menus: [
        {id: 0, name: "Contas a pagar", routeName: 'bills.pay'},
        {id: 1, name: "Contas a receber", routeName: 'bills.receive'},
      ]
    }
  }
});
