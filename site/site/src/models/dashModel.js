// Começo da dash setor
var database = require('../database/config')

function autenticar2() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  select local.idLocal, local.setor, local.sala, local.andar, local.fkDispositivo, local.fkEmpresa, local.fkTipoDispositivo from local join dispositivo on local.fkDispositivo = dispositivo.idDispositivo join empresa on empresa.idEmpresa = local.fkEmpresa join plano on plano.idPlano = local.fkPlanoEmpresa join tipoDispositivo on tipoDispositivo.idTipoDispositivo where empresa.idEmpresa = 1 and tipoDispositivo.idTipoDispositivo = 1 and dispositivo.idDispositivo = 1;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function buscarMaquinas() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  SELECT * from dispositivo;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

//analise atual
function buscarUltimasMedidas(idDispositivo) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select * from monitoramento
                    where fkDispositivo = ${idDispositivo}
                    order by idMonitoramento desc limit 3`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMedidasEmTempoReal(idDispositivo) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select * from monitoramento
    where fkDispositivo = ${idDispositivo} 
                    order by idMonitoramento desc limit 3`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//avisos
function buscarUltimosAvisos(idDispositivo) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT idAviso, descricao, DATE_FORMAT(dtHr, '%d/%m/%Y %H:%i:%s') as dtHr FROM aviso where fkDispositivo = ${idDispositivo};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarAvisosEmTempoReal(idDispositivo) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT idAviso, descricao, DATE_FORMAT(dtHr, '%d/%m/%Y %H:%i:%s') as dtHr FROM aviso where fkDispositivo = ${idDispositivo};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//usb
function buscarUltimosUsb(idDispositivo) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select count(idUsb) as status
    from usb join dispositivo on dispositivo.idDispositivo = usb.fkDispositivo where date(dtHoraInserção) = (SELECT CURDATE()) ;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarUsbEmTempoReal(idDispositivo) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select count(idUsb) as status
    from usb join dispositivo on dispositivo.idDispositivo = usb.fkDispositivo where date(dtHoraInserção) = (SELECT CURDATE()) ;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//media
function buscarUltimosMedia(idDispositivo) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 1) as usoCpuMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 2) as usoRamMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 3) as usoDiscoMensal
    from monitoramento join dispositivo on  idDispositivo = fkDispositivo where idDispositivo = ${idDispositivo} limit 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMediaEmTempoReal(idDispositivo) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 1) as usoCpuMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 2) as usoRamMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 3) as usoDiscoMensal
    from monitoramento join dispositivo on  idDispositivo = fkDispositivo where idDispositivo = ${idDispositivo} limit 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//Insight
function buscarUltimosInsight(idDispositivo) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightCpuMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightRamMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightDiscoMensal
  FROM dispositivo
  WHERE idDispositivo = ${idDispositivo};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarInsightEmTempoReal(idDispositivo) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightCpuMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightRamMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightDiscoMensal
  FROM dispositivo
  WHERE idDispositivo = ${idDispositivo};`
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
  autenticar2,
  buscarMaquinas,
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
  buscarAvisosEmTempoReal,
  buscarUltimosAvisos,
  buscarUltimosUsb,
  buscarUsbEmTempoReal,
  buscarUltimosMedia,
  buscarMediaEmTempoReal,
  buscarUltimosInsight,
  buscarInsightEmTempoReal
}
