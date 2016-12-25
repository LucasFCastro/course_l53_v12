module.exports = {
  template: `
      <div class="container">
        <h5>{{title}}</h5>
        <b :class="{'blue-text': status < 0, 'green-text': status == 0, 'red-text': status > 0}">
            {{status | statusBillReceive}}
        </b>
    </div>
    <router-view></router-view>
  `,

  data() {
    return {
      title: "Contas a Receber",
      status: false,
    }
  },
    created() {
        this.$dispatch('changeStatusReceive')
    },

    methods: {

        calculateStatus(bills) {
            if (bills.length == 0) {
                this.status = -1
            }
            else {
                let count = 0;
                for(let i in bills){
                    if (!bills[i].done) {
                        count++;
                    }
                }
                this.status = count
            }
        },

        updateStatus(){
            BillReceive.query().then((response) => this.calculateStatus(response.data))
        },

    },

events: {

    changeStatusReceive() {
        this.updateStatus()
        this.$dispatch('changeInfo');
    }
}
};
