var database = require('../database/config')

function buscarUltimasMedidasCpu(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "cpu" and Monitoramento.fkMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "cpu" and Monitoramento.fkMaquina = ${idMaquina};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMedidasEmTempoRealCpu(idMaquina) {
  console.log(idMaquina + 'entrei')
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "cpu" and Monitoramento.fkMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "cpu" and Monitoramento.fkMaquina = ${idMaquina};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarUltimasMedidasDisco(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "disco" and Monitoramento.fkMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "disco" and Monitoramento.fkMaquina = ${idMaquina};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMedidasEmTempoRealDisco(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "disco" and Monitoramento.fkMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "disco" and Monitoramento.fkMaquina = ${idMaquina};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarUltimasMedidasRam(ram) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "ram";`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "ram";`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMedidasEmTempoRealRam(ram) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "ram";`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = "ram";`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

module.exports = {
  buscarUltimasMedidasCpu,
  buscarMedidasEmTempoRealCpu,
  buscarUltimasMedidasDisco,
  buscarMedidasEmTempoRealDisco,
  buscarUltimasMedidasRam,
  buscarMedidasEmTempoRealRam
}
