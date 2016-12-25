'use strict';

module.exports = {
    template: '\n    <div class="container">\n       <h5>{{title}}</h5>\n        <b :class="{\'blue-text\': status < 0, \'green-text\': status == 0, \'red-text\': status > 0}">\n            {{status | statusBillPay}}\n        </b>\n    </div>\n    <router-view></router-view>\n  ',

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
};