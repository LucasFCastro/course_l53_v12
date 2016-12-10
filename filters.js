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
