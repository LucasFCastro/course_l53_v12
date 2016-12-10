Vue.filter('doneLabel', function(value) {
  if (value == 1) {
    return 'Paga'
  }
  return 'Não Paga'
});
