<template lang="html">
	<div id="app">

        <header>
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
	export default {
		data() {
			return {
				year: new Date().getFullYear()
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
