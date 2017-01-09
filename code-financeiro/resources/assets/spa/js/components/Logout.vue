<template lang="html">
	<div class="container">
        <div class="row">
            <div class="col s8 offset-s2 z-depth-4">
                <h5 class="center">Efetuando logout...</h5>
				<div class="progress">
					<div class="indeterminate"></div>
				</div>

            </div>
        </div>
    </div>
</template>

<script>
	import Auth from '../services/auth.js';
	export default {
		ready() {
			setTimeout(() => {
				this.logout();
			}, 1000);
		},
		methods: {
			logout(){
				let goToLogin = () => this.$router.go({name: 'auth.login'});
				Auth.logout()
					.then(goToLogin())
					.catch(goToLogin());
			}
		}
	}
</script>

<style lang="css">
</style>
