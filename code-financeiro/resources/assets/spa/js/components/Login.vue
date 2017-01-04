<template lang="html">
	<div class="container">
        <div class="row">
            <div class="col s8 offset-s2 z-depth-4">
                <h5 class="center">Login Code Financeiro</h5>
                <form method="POST" @submit.prevent="login()">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="email" type="email" name="email" class="validate" v-model="user.email" required autofocus>
                            <label for="email" class="active">E-Mail</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <input id="password" type="password" name="password" class="validate" v-model="user.password" required>
                            <label for="password" class="active">Senha</label>
                        </div>
                    </div>

	                <div class="row">
                        <div class="input-field col s12 center">
                            <button type="submit" class="btn waves-effect waves-light">
                                Login
                            </button>
	                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
	import {Jwt} from '../resources.js';
	export default {
		data() {
			return {
				user: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			login(){
				Jwt.accessToken(this.user.email, this.user.password)
					.then((response) => {
						console.log(response);
					});
			}
		}
	}
</script>

<style lang="css">
</style>
