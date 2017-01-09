<template lang="html">
	<div id="app">

        <header v-if="showMenu">
				<menu></menu>
        </header>

        <main>
			<router-view></router-view>
        </main>

        <footer class="page-footer" style="padding-top: 0px;">
            <div class="footer-copyright">
                <div class="container">
                    © {{ year }} Copyright Lucas Castro
                    <a class="grey-text text-lighten-4 right" href="#!">Lucas Castro System</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
	import MenuComponent from './Menu.vue';
	import Auth from '../services/auth.js';

	export default {
		components: {
			'menu': MenuComponent
		},
		data() {
			return {
				year: new Date().getFullYear(),
				user: Auth.user
			}
		},
		computed: {
			showMenu(){
				return this.user.check && this.$route.name != 'auth.login';
			}
		}
	};
</script>

<style media="screen" lang="css" type="text/css">
	#app {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
	}

	main {
		flex: 1 0 auto;
	}
</style>
