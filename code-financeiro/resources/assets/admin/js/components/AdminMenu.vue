<template lang="html">
	<form id="logout-form" :action="config.urlLogout" method="POST" style="display: none;">
		<input type="hidden" name="_token" :value="config.csrfToken">
	</form>
    <ul class="dropdown-content" v-for="o in config.menus" :id="o.menuId">
        <li v-for="item in o.menusDropdown">
            <a :href=item.url>{{ item.name }}</a>
        </li>
    </ul>
    <ul id="dropdown-logout" class="dropdown-content">
        <li>
            <a :href="config.urlLogout" @click.prevent="gotoLogout()">Sair</a>
        </li>
    </ul>

    <div class="navbar-fixed">
        <!-- <nav class="teal">-->
        <nav>
            <div class="nav-wrapper col-s12">
                <a href="#" class="brand-logo left hide-on-med-and-down">{{config.nameApp}}</a>
                <a href="#" class="brand-logo right hide-on-large-only">{{config.nameApp}}</a>
                <a href="#" data-activates="nav-mobile" class="button-collapse">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="right hide-on-med-and-down">
                    <li v-for="o in config.menus">
                        <a v-if="o.menusDropdown" class="button-dropdown" :data-activates="o.menuId">
                            {{o.name}} <i class="material-icons right">arrow_drop_down</i>
                        </a>
                        <a v-else :href=o.url>{{ o.name }}</a>
                    </li>
					<li>
						<a class="button-dropdown" data-activates="dropdown-logout">
                            {{ config.nameUser }} <i class="material-icons right">arrow_drop_down</i>
                        </a>
					</li>
                </ul>

                <ul id="nav-mobile" class="side-nav">

                    <li v-for="o in config.menus">
                        <div v-if="!o.menuId">
                            <a @click.prevent="gotoMenu(o.url)">{{o.name}}</a>
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
                                                <a @click.prevent="gotoMenu(item.url)">{{item.name}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
					<li>
						<ul class="collapsible"  data-collapsible="accordion">
							<li>
								<a class="collapsible-header">
									{{ config.nameUser }} <i class="material-icons right">arrow_drop_down</i>
								</a>
								<div class="collapsible-body">
									<ul>
										<li>
											<a :href="config.urlLogout" @click.prevent="gotoLogout()">Sair</a>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
	props: {
		config: {
			type: Object,
			default () {
				return {
					nameUser: '',
					nameApp: '',
					menus: [],
					urlLogout: '/admin/logout',
					csrfToken: ''
				}
			}
		}
	},
	ready() {
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
		},
		gotoLogout() {
			$('#logout-form').submit();
		}
	}
};
</script>

<style media="screen" lang="css" type="text/css">
    #sidenav-overlay {
        z-index: 996;
    }
</style>
