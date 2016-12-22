'use strict';

window.billPayComponent = Vue.extend({
    template: '\n    <style media="screen">\n      .nao-paga {\n        color: red\n      }\n      .sem-conta {\n        color: gray\n      }\n      .nada-a-pagar {\n        color: blue\n      }\n    </style>\n\n    <div class="section">\n       <div class="container">\n           <h5>{{title}}</h5>\n           <div class="row">\n               <div class="col s6">\n                    <b :class="{\'sem-conta\': status < 0, \'nada-a-pagar\': status == 0, \'nao-paga\': status > 0}">\n                        {{status | statusBillPay}}\n                    </b>\n                </div>\n            </div>\n        </div>\n    </div>\n    <router-view></router-view>\n  ',

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