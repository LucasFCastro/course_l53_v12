'use strict';

window.billReceiveComponent = Vue.extend({
    template: '\n      <div class="container">\n        <h5>{{title}}</h5>\n        <b :class="{\'blue-text\': status < 0, \'green-text\': status == 0, \'red-text\': status > 0}">\n            {{status | statusBillReceive}}\n        </b>\n    </div>\n    <router-view></router-view>\n  ',

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