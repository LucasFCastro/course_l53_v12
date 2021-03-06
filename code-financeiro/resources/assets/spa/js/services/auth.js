import JwtToken from './jwt-token.js';
import localStorage from './localStorage.js';
import {
    User
} from './resources.js';

const USER = 'user';

const afterLogin = function(response) {
    this.user.check = true;
    User.get()
        .then((response) => {
            this.user.data = response.data;
        })
};

export default {
    user: {
        set data(value) {
            if (!value) {
                localStorage.remove(USER);
                this._data = null;
                return;
            }
            this._data = value;
            localStorage.setObject(User, value);
        },
        get data() {
            if (!this._data) {
                this._data = localStorage.getObject(User);
            }
            return this._data;
        },
        check: JwtToken.token ? true : false
    },
    login(email, password) {
        return JwtToken.accessToken(email, password)
            .then((response) => {
                let afterLoginContext = afterLogin.bind(this);
                afterLoginContext(response);
                return response;
            });
    },
    logout() {
        let afterLogout = (response) => {
            this.clearAuth();
            return response;
        };
        return JwtToken.revokeToken()
            .then(afterLogout())
            .catch(afterLogout());
    },
    clearAuth() {
        this.user.data = null;
        this.user.check = false;
    }
};
