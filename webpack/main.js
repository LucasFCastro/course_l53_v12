// commonJs
// var colecao = require('./clients');
// var minhaFuncao = require('./funcao');

require(['./clients', './funcao'], function(colecao, minhaFuncao) {
	console.log(colecao);
	console.log(minhaFuncao(2, 3));
});

// console.log(minhaFuncao(2,3));
// console.log(colecao);
