'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('doneLabelPay', function (value) {
    if (value == 1) {
        return 'Paga';
    }
    return 'Não Paga';
});

Vue.filter('doneLabelReceive', function (value) {
    if (value == 1) {
        return 'Recebida';
    }
    return 'Não Recebida';
});

Vue.filter('statusBillPay', function (value) {
    if (value < 0) {
        return 'Nenhuma conta cadastrada';
    } else if (value == 0) {
        return 'Nenhuma conta a pagar';
    } else {
        return value + ' contas a pagar';
    }
});

Vue.filter('statusBillReceive', function (value) {
    if (value < 0) {
        return 'Nenhuma conta cadastrada';
    } else if (value == 0) {
        return 'Nenhuma conta a receber';
    } else {
        return 'Existem ' + value + ' contas a serem recebidas';
    }
});

Vue.filter('numberCurrency', {
    read: function read(value) {
        var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pt-BR';
        var moeda = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'BRL';

        var number = 0;
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        var valueFormat = new Intl.NumberFormat(loc, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: moeda
        });
        return valueFormat.format(number);
    },
    write: function write(value) {
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value) {
        var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pt-BR';

        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : null;
                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return null;
                }
            }
            return new Intl.DateTimeFormat(loc).format(value).split(' ')[0];
        }
        return value;
    },
    write: function write(value) {
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0];
            }
        }
        return value;
    }
});

Vue.filter('nameCase', {
    read: function read(value) {
        return String(value).toUpperCase();
    },
    write: function write(value) {
        return String(value).toLowerCase();
    }
});