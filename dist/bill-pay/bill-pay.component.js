'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'bill-pay-menu-component': billPayMenuComponent
    },
    template: '\n    <style media="screen">\n      .nao-paga {\n        color: red\n      }\n      .sem-conta {\n        color: gray\n      }\n      .nada-a-pagar {\n        color: blue\n      }\n    </style>\n\n    <h1>{{title}}</h1>\n    <h3 :class="{\'sem-conta\': status < 0, \'nada-a-pagar\': status == 0, \'nao-paga\': status > 0}">\n        {{status | statusBillPay}}\n    </h3>\n    <nav>\n      <bill-pay-menu-component></bill-pay-menu-component>\n    </nav>\n    <router-view></router-view>\n  ',

    data: function data() {
        return {
            title: "Contas a Pagar",
            status: false
        };
    },
    created: function created() {
        this.$dispatch('changeStatusPay');
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

            BillPay.query().then(function (response) {
                return _this.calculateStatus(response.data);
            });
        }
    },

    events: {
        changeStatusPay: function changeStatusPay() {
            this.updateStatus();
            this.$dispatch('changeInfo');
        }
    }
});