<template lang="html">
    <ul class="dropdown-content" v-for="o in menus" :id="o.menuId">
        <li v-for="item in o.menusDropdown" class="menu-dropdown">
            <a v-link="{name: item.routeName}">{{item.name}}</a>
        </li>
    </ul>
	<ul id="dropdown-logout" class="dropdown-content">
        <li>
            <a v-link="{name: 'auth.logout'}">Sair</a>
        </li>
    </ul>

    <div class="navbar-fixed">
        <!-- <nav class="teal">-->
        <nav>
            <div class="nav-wrapper container">
				<a href="#" class="brand-logo left hide-on-med-and-down">Code Financeiro</a>
				<a href="#" class="brand-logo right hide-on-large-only">Code Financeiro</a>

                <a href="#" data-activates="nav-mobile" class="button-collapse">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="right hide-on-med-and-down">
                    <li v-for="o in menus">
                        <a v-if="o.menusDropdown" class="button-dropdown" :data-activates="o.menuId">
                            {{o.name}} <i class="material-icons right">arrow_drop_down</i>
                        </a>
                        <a v-else v-link="{name: o.routeName}">{{o.name}}</a>
                    </li>
					<li>
						<a class="button-dropdown" data-activates="dropdown-logout">
							{{ name }} <i class="material-icons right">arrow_drop_down</i>
						</a>
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

</template>

<script>
import Auth from '../services/auth.js';

export default {
    ready(){
        $('.button-collapse').sideNav()
        $('.collapsible').collapsible()
        $('.button-dropdown').dropdown({
            belowOrigin: true
        })
    },
    data(){
        return {
            menus: [
                {id: 0, name: "Dashboard", routeName: 'dashboard', menuId: '', menusDropdown: ''},
                {id: 0, name: "Contas a pagar", routeName: 'dashboard',menuId: 'bill-pay',  menusDropdown: [
                    {id: 0, name: "Listar Contas", routeName: 'dashboard'},
                    {id: 1, name: "Criar Conta", routeName: 'dashboard'},
                ]},
                {id: 1, name: "Contas a receber", routeName: 'dashboard', menuId: 'bill-receive', menusDropdown: [
                    {id: 0, name: "Listar Contas", routeName: 'dashboard'},
                    {id: 1, name: "Criar Conta", routeName: 'dashboard'},
                ]},
            ],
			user: Auth.user
        }
    },
	computed: {
		name() {
			return this.user.data ?  this.user.data.name : '';
		}
	}
};
</script>

<style media="screen" lang="css" type="text/css">
    #sidenav-overlay {
        z-index: 996;
    }
</style>
