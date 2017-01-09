import AppComponent from './components/App.vue';
import routerMap from './router.map.js'
import VueRouter from 'vue-router';
import Auth from './services/auth.js';

const router = new VueRouter();

router.map(routerMap);

router.beforeEach((transition) => {
    if(transition.to.auth && !Auth.user.check){
        return router.go({name: 'auth.login'});
    }
    transition.next();
});

router.start({
    components: {
        'app' : AppComponent,
    }
}, 'body');
