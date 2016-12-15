'use strict';

window.billReceiveComponent = Vue.extend({
    components: {
        'bill-receive-menu-component': billReceiveMenuComponent
    },
    template: '\n    <style media="screen">\n      .nao-recebida {\n        color: red\n      }\n      .sem-conta {\n        color: gray\n      }\n      .nada-a-receber {\n        color: blue\n      }\n    </style>\n\n    <h1>{{title}}</h1>\n    <h3 :class="{\'sem-conta\': status < 0, \'nada-a-receber\': status == 0, \'nao-recebida\': status > 0}">\n        {{status | statusBillReceive}}\n    </h3>\n    <nav>\n      <bill-receive-menu-component></bill-receive-menu-component>\n    </nav>\n    <router-view></router-view>\n  ',

    data: function data() {
        return {
            title: "Contas a Receber",
            status: false
        };
    },
    created: function created() {
        this.$dispatch('changeStatusReceive');
    },


    methods: {
        calculateStatus: function calculateStatus(bills) {
            if (bills.length == 0) {
                this.status = -1;
            } else {
                var count = 0;
                for (var i in bills) {
                    if (!bills[i].done) {
                        count++;
                    }
                }
                this.status = count;
            }
        },
        updateStatus: function updateStatus() {
            var _this = this;

            BillReceive.query().then(function (response) {
                return _this.calculateStatus(response.data);
            });
        }
    },

    events: {
        changeStatusReceive: function changeStatusReceive() {
            this.updateStatus();
            this.$dispatch('changeInfo');
        }
    }
});