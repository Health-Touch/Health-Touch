var database = require('../database/config')

function buscarUltimasMedidasCpu(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'cpu' and Monitoramento.fkMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'cpu' and Monitoramento.fkMaquina = ${idMaquina};`
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
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'cpu' and Monitoramento.fkMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'cpu' and Monitoramento.fkMaquina = ${idMaquina};`
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
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'disco' and Monitoramento.fkMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'disco' and Monitoramento.fkMaquina = ${idMaquina};`
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
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'disco' and Monitoramento.fkMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'disco' and Monitoramento.fkMaquina = ${idMaquina};`
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
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'ram';`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'ram';`
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
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'ram';`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, FORMAT(dataHora, 'HH:mm') AS horario from Monitoramento join Componente on idComponente = fkComponente where nome = 'ram';`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarUltimasMedidasSetor(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select nomeBotao, count(nomeBotao) as opcoes from AnaliseToten where fkMaquina = ${idMaquina} group by nomeBotao;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select nomeBotao, count(nomeBotao) as opcoes from AnaliseToten where fkMaquina = ${idMaquina} group by nomeBotao;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMedidasEmTempoRealSetor(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select nomeBotao, count(nomeBotao) as opcoes from AnaliseToten where fkMaquina = ${idMaquina} group by nomeBotao;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select nomeBotao, count(nomeBotao) as opcoes from AnaliseToten where fkMaquina = ${idMaquina} group by nomeBotao;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

// começo do individual do tony
function buscarMedidasRede(idMaquina, limite_linhas) {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select download, upload, FORMAT(dataHora, 'HH:mm') 
      AS Horário from monitoramentoRede where fkMaquina = ${idMaquina} order by idMonitoramentoRede desc limit ${limite_linhas};`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `select download, upload, FORMAT(dataHora, 'HH:mm') 
      AS Horário from monitoramentoRede where fkMaquina = ${idMaquina} order by idMonitoramentoRede desc limit ${limite_linhas};`;
  } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarGrafico(idMaquina) {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select download, upload, FORMAT(dataHora, 'HH:mm') 
      AS Horário from monitoramentoRede where fkMaquina = ${idMaquina} order by idMonitoramentoRede;`;

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `select download, upload, FORMAT(dataHora, 'HH:mm') 
      AS Horário from monitoramentoRede where fkMaquina = ${idMaquina} order by idMonitoramentoRede;`;
  } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarGraficoPing(idMaquina) {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT
      legenda,
      valor
    FROM (
      SELECT
        CASE
          WHEN ping <= 10 THEN "< 10"
          WHEN ping > 10 AND ping <= 20 THEN "Até 20"
          WHEN ping > 20 AND ping <= 30 THEN "Até 30"
          ELSE "Maior que 30"
        END AS legenda,
        SUM(1) AS valor
      FROM (
        SELECT ping, dataHora, fkMaquina
        FROM monitoramentoRede
        WHERE fkMaquina = ${idMaquina}
      ) AS t
      GROUP BY legenda
    ) AS t
    ORDER BY legenda;`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT
      legenda,
      valor
    FROM (
      SELECT
        CASE
          WHEN ping <= 10 THEN "< 10"
          WHEN ping > 10 AND ping <= 20 THEN "Até 20"
          WHEN ping > 20 AND ping <= 30 THEN "Até 30"
          ELSE "Maior que 30"
        END AS legenda,
        SUM(1) AS valor
      FROM (
        SELECT ping, dataHora, fkMaquina
        FROM monitoramentoRede
        WHERE fkMaquina = ${idMaquina}
      ) AS t
      GROUP BY legenda
    ) AS t
    ORDER BY legenda;`;
  } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
// fim do individual do tony


//Começo Individual Maria 
function buscarUltimasMedidasRamProcessos( idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from  maquina join monitoramento on monitoramento.fkMaquina = idMaquina where fkComponente = 3 and idMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from  maquina join monitoramento on monitoramento.fkMaquina = idMaquina where fkComponente = 3 and idMaquina = ${idMaquina};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarUltimasMedidasCpuProcessos( idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from  maquina join monitoramento on monitoramento.fkMaquina = idMaquina where fkComponente = 1 and idMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from  maquina join monitoramento on monitoramento.fkMaquina = idMaquina where fkComponente = 1 and idMaquina = ${idMaquina};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMedidasEmTempoRealRamProcessos(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from  maquina join monitoramento on monitoramento.fkMaquina = idMaquina where fkComponente = 3 and idMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from  maquina join monitoramento on monitoramento.fkMaquina = idMaquina where fkComponente = 3 and idMaquina = ${idMaquina};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}
function buscarMedidasEmTempoRealCpuProcessos(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from  maquina join monitoramento on monitoramento.fkMaquina = idMaquina where fkComponente = 1 and idMaquina = ${idMaquina};`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, DATE_FORMAT(dataHora, '%H:%i:%s') AS horario from  maquina join monitoramento on monitoramento.fkMaquina = idMaquina where fkComponente = 1 and idMaquina = ${idMaquina};`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}
function obterDadosGraficoComponentesAtual(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select porcentagem, fkComponente from monitoramento
    where fkMaquina = ${idMaquina}
    order by idMonitoramento desc limit 2;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select porcentagem, fkComponente from monitoramento
    where fkMaquina = ${idMaquina}
    order by idMonitoramento desc limit 2;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}


//Final Individual Maria 
module.exports = {
  buscarUltimasMedidasCpu,
  buscarMedidasEmTempoRealCpu,
  buscarUltimasMedidasDisco,
  buscarMedidasEmTempoRealDisco,
  buscarUltimasMedidasRam,
  buscarMedidasEmTempoRealRam,
  buscarUltimasMedidasSetor,
  buscarMedidasEmTempoRealSetor,
  buscarMedidasRede,
  atualizarGrafico,
  buscarGraficoPing,
  obterDadosGraficoComponentesAtual,
  buscarUltimasMedidasRamProcessos,
  buscarMedidasEmTempoRealRamProcessos,
  buscarUltimasMedidasCpuProcessos,
  buscarMedidasEmTempoRealCpuProcessos
}
