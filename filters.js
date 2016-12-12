Vue.filter('doneLabelPay', function(value) {
  if (value == 1) {
    return 'Paga'
  }
  return 'Não Paga'
});

Vue.filter('doneLabelReceive', function(value) {
  if (value == 1) {
    return 'Recebida'
  }
  return 'Não Recebida'
});

Vue.filter('statusGeneral', function(value) {
    if (value < 0) {
        return 'Nenhuma conta cadastrada'
    } else if(value == 0) {
        return 'Nenhuma conta a pagar'
    } else {
        return 'Existem '+value+' contas a serem pagas'
    }
})
