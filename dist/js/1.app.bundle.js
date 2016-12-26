webpackJsonp([1],{

/***/ 27:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n  <style media="screen">\n        #sidenav-overlay {\n        z-index: 996;\n    }\n  </style>\n    <ul class="dropdown-content" v-for="o in menus" :id="o.menuId">\n        <li v-for="item in o.menusDropdown" class="menu-dropdown">\n            <a v-link="{name: item.routeName}">{{item.name}}</a>\n        </li>\n    </ul>\n\n    <div class="navbar-fixed">\n        <!-- <nav class="teal">-->\n        <nav>\n            <div class="nav-wrapper container">\n                <a href="#" class="brand-logo right">Code Contas</a>\n                <a href="#" data-activates="nav-mobile" class="button-collapse">\n                    <i class="material-icons">menu</i>\n                </a>\n\n                <ul class="left hide-on-med-and-down">\n                    <li v-for="o in menus">\n                        <a v-if="o.menusDropdown" class="button-dropdown" :data-activates="o.menuId">\n                            {{o.name}} <i class="material-icons right">arrow_drop_down</i>\n                        </a>\n                        <a v-else v-link="{name: o.routeName}">{{o.name}}</a>\n                    </li>\n                </ul>\n\n                <ul id="nav-mobile" class="side-nav">\n\n                    <li v-for="o in menus">\n                        <div v-if="!o.menuId">\n                            <a @click.prevent="gotoMenu(o.routeName)">{{o.name}}</a>\n                        </div>\n                        <div v-else>\n                            <ul class="collapsible"  data-collapsible="accordion">\n                                <li>\n                                    <a class="collapsible-header">\n                                        {{o.name}} <i class="material-icons right">arrow_drop_down</i>\n                                    </a>\n                                    <div class="collapsible-body">\n                                        <ul>\n                                            <li v-for="item in o.menusDropdown">\n                                                <a @click.prevent="gotoMenu(item.routeName)">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </li>\n                            </ul>\n                        </div>\n                    </li>\n                 </ul>\n            </div>\n        </nav>\n    </div>\n    <router-view></router-view>\n  ',
	    ready: function ready() {
	        $('.button-collapse').sideNav();
	        $('.collapsible').collapsible();
	        $('.button-dropdown').dropdown({
	            belowOrigin: true
	        });
	    },

	    methods: {
	        gotoMenu: function gotoMenu(rota) {
	            $('.button-collapse').sideNav('hide');
	            this.$router.go({
	                name: rota
	            });
	        }
	    },
	    data: function data() {
	        return {
	            menus: [{ id: 0, name: "Dashboard", routeName: 'bills.dashboard', menuId: '', menusDropdown: '' }, { id: 0, name: "Contas a pagar", routeName: 'bills.pay', menuId: 'bill-pay', menusDropdown: [{ id: 0, name: "Listar Contas", routeName: 'bill.pay.list' }, { id: 1, name: "Criar Conta", routeName: 'bill.pay.create' }] }, { id: 1, name: "Contas a receber", routeName: 'bills.receive', menuId: 'bill-receive', menusDropdown: [{ id: 0, name: "Listar Contas", routeName: 'bill.receive.list' }, { id: 1, name: "Criar Conta", routeName: 'bill.receive.create' }] }]
	        };
	    }
	};

/***/ },

/***/ 28:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
		template: '\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<div class="col s12">\n\t\t\t\t\t<h5 class="center"><i class="material-icons">dashboard</i>Dashboard</h5>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="row">\n\t\t\t\t<div class="col s4">\n\t\t\t\t\t<div class="card red hoverable">\n\t\t\t\t\t\t<div class="card-content">\n\t\t\t\t\t\t\t<p><i class="material-icons">indeterminate_check_box</i>Total de contas a pagar</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="card-action white red-text">\n\t\t\t\t\t\t\t<h4>{{ totalBillPay | currency \'R$ \'}}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="col s4">\n\t\t\t\t\t<div class="card green hoverable">\n\t\t\t\t\t\t<div class="card-content">\n\t\t\t\t\t\t\t<p><i class="material-icons">add_box</i>Total de contas a receber</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="card-action white green-text">\n\t\t\t\t\t\t\t<h4>{{ totalBillReceive | currency \'R$ \'}}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="col s4">\n\t\t\t\t\t<div class="card blue hoverable">\n\t\t\t\t\t\t<div class="card-content">\n\t\t\t\t\t\t\t<p><i class="material-icons">monetization_on</i>Saldo (Receber - Pagar)</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="card-action white blue-text">\n\t\t\t\t\t\t\t<h4>{{ totalBillReceive - totalBillPay | currency \'R$ \'}}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t',
		data: function data() {
			return {
				totalBillPay: 0,
				totalBillReceive: 0
			};
		},
		created: function created() {
			this.$dispatch('changeInfo');
		},

		events: {
			changeInfo: function changeInfo() {
				var _this = this;

				BillPay.total().then(function (response) {
					return _this.totalBillPay = response.data.total;
				}), BillReceive.total().then(function (response) {
					return _this.totalBillReceive = response.data.total;
				});
			}
		}
	};

/***/ },

/***/ 29:
/***/ function(module, exports) {

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

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BillPayClass = __webpack_require__(31);
	module.exports = {
	    template: '\n  <div class="container">\n  <div class="row">\n  <div class="col s12">\n  <div class="card z-depth-3">\n\n      <form @submit.prevent="submit">\n          <h5 class="header-dialog">{{title}}</h5>\n          <div class="card-content">\n\n              <div class="row">\n                  <div class="input-field col s6">\n                      <input type="text" v-model="bill.date_due | dateFormat" id="date_due"\n                      placeholder="Informe a data">\n                      <label class="active" for="date_due">Vencimento</label>\n                  </div>\n                  <div class="input-field col s6">\n                      <input type="text" id="value" v-model="bill.value | numberCurrency">\n                      <label class="active" for="value">Valor</label>\n                  </div>\n              </div>\n\n              <div class="row">\n                  <div class="input-field col s6">\n                      <label class="active" for="name">Nome</label>\n                      <select v-model="bill.name | nameCase" class="browser-default">\n                          <option value="" disabled selected>Selecione uma op\xE7\xE3o</option>\n                          <option v-for="o in names" :value="o | nameCase">{{o}}</option>\n                      </select>\n                  </div>\n                  <div class="input-field col s6">\n                    <input type="checkbox" id="pago" v-model="bill.done">\n                    <label for="pago"> Pago?</label>\n                  </div>\n              </div>\n\n              <div class="row">\n                  <div class="input-field col s12">\n                      <input type="submit" value="Cadastrar" class="btn btn-primary right waves-effect">\n                  </div>\n              </div>\n          </div>\n      </form>\n  </div>\n  </div>\n  </div>\n  </div>\n  ',
	    data: function data() {
	        return {
	            title: '',
	            names: ["Conta de Luz", "Conta de Água", "Conta de Telefone", "Colégio", "Cartão de Crédito"],
	            bill: new BillPayClass()
	        };
	    },
	    created: function created() {
	        var _this = this;

	        if (this.$route.name == 'bill.pay.create') {
	            this.title = 'Criando Conta';
	            this.bill = new BillPayClass();
	        } else {
	            this.title = 'Editando Conta';
	            BillPay.get({ id: this.$route.params.id }).then(function (response) {
	                return _this.bill = new BillPayClass(response.data);
	            });
	        }
	        $(document).ready(function () {
	            $('select').material_select();
	        });
	    },

	    methods: {
	        submit: function submit() {
	            var _this2 = this;

	            if (this.title == 'Criando Conta') {
	                BillPay.save({}, this.bill.toJSON()).then(function (response) {
	                    swal("Inclusão!", "Conta incluída com sucesso.", "success");
	                    _this2.$dispatch('changeStatusPay');
	                    _this2.$router.go({
	                        name: 'bill.pay.list'
	                    });
	                });
	            } else {
	                BillPay.update({ id: this.bill.id }, this.bill.toJSON()).then(function (response) {
	                    swal("Alteração!", "Conta atualizada com sucesso.", "success");
	                    _this2.$dispatch('changeStatusPay');
	                    _this2.$router.go({
	                        name: 'bill.pay.list'
	                    });
	                });
	            }
	        }
	    }
	};

/***/ },

/***/ 31:
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
		function BillPayClass() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, BillPayClass);

			this.date_due = '', this.name = '', this.value = 0;
			this.done = false;
			Object.assign(this, data);
		}

		_createClass(BillPayClass, [{
			key: 'toJSON',
			value: function toJSON() {
				return {
					date_due: this.date_due,
					name: this.name,
					value: this.value,
					done: this.done
				};
			}
		}]);

		return BillPayClass;
	}();

/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var modalComponent = __webpack_require__(33);
	module.exports = {
	    components: {
	        'modal': modalComponent
	    },
	    template: '\n    <div class="container">\n        <div class="row">\n            <div class="col s12">\n                 <a class="\n                     btn-floating btn-large waves-effect waves-light\n                     z-depth-3\n                     right"\n                     v-link="{name: \'bill.pay.create\'}"><i class="material-icons">add</i></a>\n             </div>\n         </div>\n\n         <div class="row">\n            <table class="bordered responsive-table highlight z-depth-2">\n              <thead>\n                <tr>\n                  <th class="center">Id</th>\n                  <th>Vencimento</th>\n                  <th>Nome da Conta</th>\n                  <th class="center">Valor</th>\n                  <th class="center">Status</th>\n                  <th class="center">A\xE7\xF5es</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr v-for="bill in bills">\n                  <td class="center">{{bill.id}}</td>\n                  <td>{{bill.date_due | dateFormat \'pt-BR\'}}</td>\n                  <td>{{bill.name | nameCase}}</td>\n                  <td class="right">{{bill.value | numberCurrency \'pt-BR\' \'BRL\'}}</td>\n                  <td class="center" :class="{\'green-text\' : bill.done, \'red-text\' : !bill.done}">\n                    {{bill.done | doneLabelPay}}\n                  </td>\n                  <td class="center">\n                    <a v-link="{name: \'bill.pay.update\', params: {id: bill.id}}">\n                        <i class="material-icons">edit</i>\n                    </a> |\n                    <a href="" @click.prevent="openModalDelete(bill)">\n                        <i class="material-icons">delete</i>\n                    </a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n        </div>\n    </div>\n    <modal :modal="modal">\n        <div slot="content">\n            <h4 class="header-dialog">Mensagem de confirma\xE7\xE3o</h4>\n            <div class="divider"></div>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <p>nome: <strong>{{billDelete.name | nameCase}}</strong></p>\n            <p>nome: <strong>{{billDelete.date_due | dateFormat}}</strong></p>\n            <p>Valor: <strong>{{billDelete.value | numberCurrency \'pt-BR\' \'BRL\'}}</strong></p>\n            <div class="divider"></div>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill">Confirmar</button>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect grey lighten-2 waves-red modal-close modal-action">Cancelar</button>\n        </div>\n    </modal>\n  ',
	    data: function data() {
	        return {
	            bills: [],
	            billDelete: null,
	            modal: {
	                id: 'modal-delete'
	            }
	        };
	    },
	    created: function created() {
	        this.$dispatch('getBillsPay');
	    },

	    methods: {
	        openModalDelete: function openModalDelete(bill) {
	            this.billDelete = bill;
	            $('#modal-delete').modal('open');
	        },
	        deleteBill: function deleteBill() {
	            var _this = this;

	            BillPay.delete({ id: this.billDelete.id }).then(function () {
	                _this.bills.$remove(_this.billDelete.id);
	                _this.$dispatch('getBillsPay');
	                _this.$dispatch('changeStatusPay');
	                swal("Excluída!", "A conta " + _this.billDelete.name + " foi excluída com sucesso.", "success");
	                _this.billDelete = null;
	            });
	        }
	    },
	    events: {
	        getBillsPay: function getBillsPay() {
	            var _this2 = this;

	            BillPay.query().then(function (response) {
	                _this2.bills = response.data;
	            });
	        }
	    }
	};

/***/ },

/***/ 33:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n    <div :id="modal.id" class="modal">\n        <div class="modal-content">\n            <slot name="content"></slot>\n        </div>\n        <div class="modal-footer">\n            <slot name="footer"></slot>\n        </div>\n    </div>\n    ',
	    props: {
	        modal: {
	            type: Object,
	            default: function _default() {
	                return {
	                    id: ''
	                };
	            }
	        }
	    },
	    ready: function ready() {
	        var id = this.modal.id;
	        $(document).ready(function () {
	            $('#' + id).modal();
	        });
	    }
	};

/***/ },

/***/ 34:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
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
	};

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BillReceiveClass = __webpack_require__(36);
	module.exports = {
	    template: '\n  <div class="container">\n  <div class="row">\n  <div class="col s12">\n  <div class="card z-depth-3">\n        <form @submit.prevent="submit">\n            <h5 class="header-dialog">{{title}}</h5>\n            <div class="card-content">\n                <div class="row">\n                    <div class="input-field col s6">\n                        <input type="text" v-model="bill.date_due | dateFormat" id="date_due"\n                        placeholder="Informe a data">\n                        <label class="active" for="date_due">Vencimento</label>\n                    </div>\n                    <div class="input-field col s6">\n                        <input type="text" id="value" v-model="bill.value | numberCurrency">\n                        <label class="active" for="value">Valor</label>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="input-field col s6">\n                        <label class="active" for="name">Nome</label>\n                        <select v-model="bill.name | nameCase" class="browser-default">\n                            <option value="" disabled selected>Selecione uma op\xE7\xE3o</option>\n                            <option v-for="o in names" :value="o | nameCase">{{o}}</option>\n                        </select>\n                    </div>\n                    <div class="input-field col s6">\n                      <input type="checkbox" id="pago" v-model="bill.done">\n                      <label for="pago"> Recebida?</label>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <input type="submit" value="Cadastrar" class="btn btn-primary right waves-effect">\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n    </div>\n    </div>\n    </div>  ',
	    data: function data() {
	        return {
	            title: '',
	            names: ["Aula de Matemática", "Aula de Lógica Matemácita", "Aulão ENEM", "Site Pessoal", "Licença Sistema de Laboratório"],
	            bill: new BillReceiveClass()
	        };
	    },
	    created: function created() {
	        var _this = this;

	        if (this.$route.name == 'bill.receive.create') {
	            this.title = 'Criando Conta';
	            this.bill = new BillReceiveClass();
	        } else {
	            this.title = 'Editando Conta';
	            BillReceive.get({ id: this.$route.params.id }).then(function (response) {
	                return _this.bill = new BillReceiveClass(response.data);
	            });
	        }
	    },

	    methods: {
	        submit: function submit() {
	            var _this2 = this;

	            if (this.title == 'Criando Conta') {
	                BillReceive.save({}, this.bill.toJSON()).then(function (response) {
	                    _this2.$dispatch('changeStatusReceive');
	                    _this2.$router.go({
	                        name: 'bill.receive.list'
	                    });
	                });
	            } else {
	                BillReceive.update({ id: this.bill.id }, this.bill.toJSON()).then(function (response) {
	                    _this2.$dispatch('changeStatusReceive');
	                    _this2.$router.go({
	                        name: 'bill.receive.list'
	                    });
	                });
	            }
	        }
	    }
	};

/***/ },

/***/ 36:
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
		function BillReceiveClass() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, BillReceiveClass);

			this.date_due = '', this.name = '', this.value = 0;
			this.done = false;
			Object.assign(this, data);
		}

		_createClass(BillReceiveClass, [{
			key: 'toJSON',
			value: function toJSON() {
				return {
					date_due: this.date_due,
					name: this.name,
					value: this.value,
					done: this.done
				};
			}
		}]);

		return BillReceiveClass;
	}();

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var modalComponent = __webpack_require__(33);
	module.exports = {
	    components: {
	        'modal': modalComponent
	    },
	    template: '\n  <div class="container">\n      <div class="row">\n          <div class="col s12">\n               <a class="\n                   btn-floating btn-large waves-effect waves-light\n                   z-depth-3\n                   right"\n                   v-link="{name: \'bill.receive.create\'}"><i class="material-icons">add</i></a>\n           </div>\n       </div>\n\n       <div class="row">\n            <table class="bordered responsive-table highlight z-depth-2">\n              <thead>\n                <tr>\n                  <th class="center">Id</th>\n                  <th>Vencimento</th>\n                  <th class="center">Nome da Conta</th>\n                  <th class="center">Valor</th>\n                  <th class="center">Recebida?</th>\n                  <th class="center">A\xE7\xF5es</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr v-for="bill in bills">\n                  <td>{{bill.id}}</td>\n                  <td>{{bill.date_due | dateFormat \'pt-BR\'}}</td>\n                  <td>{{bill.name | nameCase}}</td>\n                  <td class="right">{{bill.value | numberCurrency \'pt-BR\' \'BRL\'}}</td>\n                  <td class="center" :class="{\'green-text\' : bill.done, \'red-text\' : !bill.done}">\n                    {{bill.done | doneLabelReceive}}\n                  </td>\n                  <td>\n                    <a v-link="{name: \'bill.receive.update\', params: {id: bill.id}}">\n                        <i class="material-icons">edit</i>\n                    </a> |\n                    <a href="" @click.prevent="openModalDelete(bill)">\n                        <i class="material-icons">delete</i>\n                    </a>\n                </td>\n                </tr>\n              </tbody>\n            </table>\n        </div>\n    </div>\n    <modal :modal="modal">\n        <div slot="content">\n            <h4 class="header-dialog">Mensagem de confirma\xE7\xE3o</h4>\n            <div class="divider"></div>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <p>nome: <strong>{{billDelete.name | nameCase}}</strong></p>\n            <p>nome: <strong>{{billDelete.date_due | dateFormat}}</strong></p>\n            <p>Valor: <strong>{{billDelete.value | numberCurrency \'pt-BR\' \'BRL\'}}</strong></p>\n            <div class="divider"></div>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill">Confirmar</button>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect grey lighten-2 waves-red modal-close modal-action">Cancelar</button>\n        </div>\n    </modal>\n  ',
	    data: function data() {
	        return {
	            bills: [],
	            billDelete: null,
	            modal: {
	                id: 'modal-delete'
	            }
	        };
	    },
	    created: function created() {
	        this.$dispatch('getBillsReceive');
	    },

	    methods: {
	        openModalDelete: function openModalDelete(bill) {
	            this.billDelete = bill;
	            $('#modal-delete').modal('open');
	        },
	        deleteBill: function deleteBill(bill) {
	            var _this = this;

	            BillReceive.delete({ id: this.billDelete.id }).then(function () {
	                _this.bills.$remove(_this.billDelete.id);
	                _this.$dispatch('getBillsReceive');
	                _this.$dispatch('changeStatusReceive');
	                swal("Excluída!", "A conta " + _this.billDelete.name + " foi excluída com sucesso.", "success");
	            });
	        }
	    },
	    events: {
	        getBillsReceive: function getBillsReceive() {
	            var _this2 = this;

	            BillReceive.query().then(function (response) {
	                return _this2.bills = response.data;
	            });
	        }
	    }
	};

/***/ }

});