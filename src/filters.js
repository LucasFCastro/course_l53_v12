Vue.filter('doneLabelPay', (value) => {
  if (value == 1) {
    return 'Paga'
  }
  return 'Não Paga'
});

Vue.filter('doneLabelReceive', (value) => {
  if (value == 1) {
    return 'Recebida'
  }
  return 'Não Recebida'
});

Vue.filter('statusBillPay', (value) => {
    if (value < 0) {
        return 'Nenhuma conta cadastrada'
    } else if(value == 0) {
        return 'Nenhuma conta a pagar'
    } else {
        return 'Existem '+value+' contas a serem pagas'
    }
})

Vue.filter('statusBillReceive', (value) => {
    if (value < 0) {
        return 'Nenhuma conta cadastrada'
    } else if(value == 0) {
        return 'Nenhuma conta a receber'
    } else {
        return 'Existem '+value+' contas a serem recebidas'
    }
})
