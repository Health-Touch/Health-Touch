// Começo da dash setor
var database = require('../database/config')

function setor() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  select
  m.idMaquina, m.fkEmpresa, m.fkPlanoEmpresa, 
  m.fkTipoMaquina, m.fkStatusMaquina, m.fkLocal, 
  l.idLocalSala, l.sala, l.andar, l.fkSetor, 
  s.nome
  from maquina as m join empresa as e on e.idEmpresa = m.fkEmpresa 
  join plano as p on e.fkPlano = p.idPlano
  join tipoMaquina as t on m.fkTipoMaquina = t.idTipoMaquina
  join statusMaquina as sm on m.fkStatusMaquina = sm.idStatusMaquina
  join localSala as l on m.fkLocal = l.idLocalSala
  join setor as s on l.fkSetor = s.idSetor
  where m.fkEmpresa = 1 and m.idMaquina = 1 
  and m.fkTipoMaquina = 1 and m.fkStatusMaquina = 1;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function buscarMaquinas() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  SELECT * from maquina;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

//analise atual
function buscarUltimasMedidas(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT TOP 3 *
    FROM monitoramento
    WHERE fkMaquina = ${idMaquina}
    ORDER BY idMonitoramento DESC;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select * from monitoramento
                    where fkMaquina = ${idMaquina}
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

function buscarMedidasEmTempoReal(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT TOP 3 *
    FROM monitoramento
    WHERE fkMaquina = ${idMaquina}
    ORDER BY idMonitoramento DESC;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select * from monitoramento
    where fkMaquina = ${idMaquina} 
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
function buscarUltimosAvisos(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT 
    a.idAviso, 
    CONVERT(VARCHAR, a.dataHora, 103) + ' ' + CONVERT(VARCHAR, a.dataHora, 108) as dtHr,
    a.fkMonitoramento, 
    a.fkComponente, 
    a.fkMaquina, 
    a.fkEmpresa,
    a.fkPlanoEmpresa, 
    a.fkTipoMaquina, 
    a.nivelAviso,
    mt.porcentagem
FROM aviso as a 
JOIN monitoramento as mt on mt.idMonitoramento = a.fkMonitoramento
JOIN componente as c on a.fkComponente = c.idComponente
JOIN maquina as m on a.fkMaquina = m.idMaquina
JOIN empresa as e on a.fkEmpresa = e.idEmpresa
JOIN plano as p on a.fkPlanoEmpresa = p.idPlano
JOIN tipoMaquina as t on a.fkTipoMaquina = t.idTipoMaquina
WHERE a.fkEmpresa = 1 AND a.fkMaquina = ${idMaquina} AND a.fkTipoMaquina = 1;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `
    SELECT a.idAvisos, DATE_FORMAT(a.dataHora, '%d/%m/%Y %H:%i:%s') as dtHr,
    a.fkMonitoramento, a.fkComponente, a.fkMaquina, a.fkEmpresa,
    a.fkPlanoEmpresa, a.fkTipoMaquina, a.fkNivelAviso
    FROM avisos as a join monitoramento as mt on mt.idMonitoramento = a.fkMonitoramento
    join componente as c on a.fkComponente = c.idComponente
    join maquina as m on a.fkMaquina = m.idMaquina
    join empresa as e on a.fkEmpresa = e.idEmpresa
    join plano as p on a.fkPlanoEmpresa = p.idPlano
    join tipoMaquina as t on a.fkTipoMaquina = t.idTipoMaquina
    join nivelAvisos as n on a.fkNivelAviso = n.idNivelAvisos
    where a.fkEmpresa = 1 and a.fkMaquina = ${idMaquina} and a.fkTipoMaquina = 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarAvisosEmTempoReal(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT 
    a.idAviso, 
    CONVERT(VARCHAR, a.dataHora, 103) + ' ' + CONVERT(VARCHAR, a.dataHora, 108) as dtHr,
    a.fkMonitoramento, 
    a.fkComponente, 
    a.fkMaquina, 
    a.fkEmpresa,
    a.fkPlanoEmpresa, 
    a.fkTipoMaquina, 
    a.nivelAviso,
    mt.porcentagem
FROM aviso as a 
JOIN monitoramento as mt on mt.idMonitoramento = a.fkMonitoramento
JOIN componente as c on a.fkComponente = c.idComponente
JOIN maquina as m on a.fkMaquina = m.idMaquina
JOIN empresa as e on a.fkEmpresa = e.idEmpresa
JOIN plano as p on a.fkPlanoEmpresa = p.idPlano
JOIN tipoMaquina as t on a.fkTipoMaquina = t.idTipoMaquina
WHERE a.fkEmpresa = 1 AND a.fkMaquina = ${idMaquina} AND a.fkTipoMaquina = 1;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `    
    SELECT a.idAvisos, DATE_FORMAT(a.dataHora, '%d/%m/%Y %H:%i:%s') as dtHr,
    a.fkMonitoramento, a.fkComponente, a.fkMaquina, a.fkEmpresa,
    a.fkPlanoEmpresa, a.fkTipoMaquina, a.fkNivelAviso
    FROM avisos as a join monitoramento as mt on mt.idMonitoramento = a.fkMonitoramento
    join componente as c on a.fkComponente = c.idComponente
    join maquina as m on a.fkMaquina = m.idMaquina
    join empresa as e on a.fkEmpresa = e.idEmpresa
    join plano as p on a.fkPlanoEmpresa = p.idPlano
    join tipoMaquina as t on a.fkTipoMaquina = t.idTipoMaquina
    join nivelAvisos as n on a.fkNivelAviso = n.idNivelAvisos
    where a.fkEmpresa = 1 and a.fkMaquina = ${idMaquina} and a.fkTipoMaquina = 1;`
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
function buscarUltimosUsb(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT COUNT(idUsb) as status
    FROM usb
    JOIN maquina ON maquina.idMaquina = usb.fkMaquina 
    WHERE CONVERT(DATE, dtHoraInserção) = CONVERT(DATE, GETDATE());`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select count(idUsb) as status
    from usb join maquina on maquina.idMaquina = usb.fkMaquina 
    where date(dtHoraInserção) = (SELECT CURDATE());`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarUsbEmTempoReal(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT COUNT(idUsb) as status
    FROM usb
    JOIN maquina ON maquina.idMaquina = usb.fkMaquina 
    WHERE CONVERT(DATE, dtHoraInserção) = CONVERT(DATE, GETDATE());`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select count(idUsb) as status
    from usb join maquina on maquina.idMaquina = usb.fkMaquina 
    where date(dtHoraInserção) = (SELECT CURDATE());`
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
function buscarUltimosMedia(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT
    (SELECT FORMAT(AVG(porcentagem), 'N2') FROM monitoramento WHERE fkComponente = 1) as usoCpuMensal,
    (SELECT FORMAT(AVG(porcentagem), 'N2') FROM monitoramento WHERE fkComponente = 2) as usoRamMensal,
    (SELECT FORMAT(AVG(porcentagem), 'N2') FROM monitoramento WHERE fkComponente = 3) as usoDiscoMensal
FROM monitoramento AS mt
JOIN maquina AS m ON m.idMaquina = mt.fkMaquina 
JOIN plano AS p ON mt.fkPlanoEmpresa = p.idPlano
JOIN tipoMaquina AS t ON mt.fkTipoMaquina = t.idTipoMaquina
JOIN empresa AS e ON mt.fkEmpresaMaquina = e.idEmpresa
WHERE mt.fkMaquina = ${idMaquina} AND mt.fkTipoMaquina = 1 AND mt.fkEmpresaMaquina = 1;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 1) as usoCpuMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 2) as usoRamMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 3) as usoDiscoMensal
    from monitoramento as mt join maquina as m on  m.idMaquina = mt.fkMaquina 
    join plano as p on mt.fkPlanoEmpresa = p.idPlano
    join tipoMaquina as t on mt.fkTipoMaquina = t.idTipoMaquina
    join empresa as e on mt.fkEmpresaMaquina = e.idEmpresa
    where mt.fkMaquina = ${idMaquina} and mt.fkTipoMaquina = 1 and mt.fkEmpresaMaquina = 1
    limit 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMediaEmTempoReal(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT
    (SELECT FORMAT(AVG(porcentagem), 'N2') FROM monitoramento WHERE fkComponente = 1) as usoCpuMensal,
    (SELECT FORMAT(AVG(porcentagem), 'N2') FROM monitoramento WHERE fkComponente = 2) as usoRamMensal,
    (SELECT FORMAT(AVG(porcentagem), 'N2') FROM monitoramento WHERE fkComponente = 3) as usoDiscoMensal
FROM monitoramento AS mt
JOIN maquina AS m ON m.idMaquina = mt.fkMaquina 
JOIN plano AS p ON mt.fkPlanoEmpresa = p.idPlano
JOIN tipoMaquina AS t ON mt.fkTipoMaquina = t.idTipoMaquina
JOIN empresa AS e ON mt.fkEmpresaMaquina = e.idEmpresa
WHERE mt.fkMaquina = ${idMaquina} AND mt.fkTipoMaquina = 1 AND mt.fkEmpresaMaquina = 1`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 1) as usoCpuMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 2) as usoRamMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 3) as usoDiscoMensal
    from monitoramento as mt join maquina as m on  m.idMaquina = mt.fkMaquina 
    join plano as p on mt.fkPlanoEmpresa = p.idPlano
    join tipoMaquina as t on mt.fkTipoMaquina = t.idTipoMaquina
    join empresa as e on mt.fkEmpresaMaquina = e.idEmpresa
    where mt.fkMaquina = ${idMaquina} and mt.fkTipoMaquina = 1 and mt.fkEmpresaMaquina = 1
    limit 1;`
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
function buscarUltimosInsight(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT TOP 20 porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT TOP 10 porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC) AS subquery)
    , 'N2') AS insightCpuMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT TOP 20 porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT TOP 10 porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC) AS subquery)
    , 'N2') AS insightRamMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT TOP 20 porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT TOP 10 porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC) AS subquery)
    , 'N2') AS insightDiscoMensal
FROM maquina AS m
JOIN monitoramento AS mt ON mt.fkMaquina = m.idMaquina
JOIN empresa AS e ON m.fkEmpresa = e.idEmpresa
JOIN statusMaquina AS sm ON m.fkStatusMaquina = sm.idStatusMaquina
JOIN tipoMaquina AS t ON m.fkTipoMaquina = t.idTipoMaquina
WHERE m.idMaquina = ${idMaquina} AND m.fkEmpresa = 1 AND m.fkStatusMaquina = 1 AND m.fkTipoMaquina = 1;`
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
  FROM maquina as m join monitoramento as mt on mt.fkMaquina = m.idMaquina
  join empresa as e on m.fkEmpresa = e.idEmpresa
  join statusMaquina as sm on m.fkStatusMaquina = sm.idStatusMaquina
  join tipoMaquina as t on m.fkTipoMaquina = t.idTipoMaquina
  WHERE m.idMaquina = ${idMaquina} and m.fkEmpresa = 1 and m.fkStatusMaquina = 1 and m.fkTipoMaquina = 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarInsightEmTempoReal(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT TOP 20 porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT TOP 10 porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC) AS subquery)
    , 'N2') AS insightCpuMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT TOP 20 porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT TOP 10 porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC) AS subquery)
    , 'N2') AS insightRamMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT TOP 20 porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT TOP 10 porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC) AS subquery)
    , 'N2') AS insightDiscoMensal
FROM maquina AS m
JOIN monitoramento AS mt ON mt.fkMaquina = m.idMaquina
JOIN empresa AS e ON m.fkEmpresa = e.idEmpresa
JOIN statusMaquina AS sm ON m.fkStatusMaquina = sm.idStatusMaquina
JOIN tipoMaquina AS t ON m.fkTipoMaquina = t.idTipoMaquina
WHERE m.idMaquina = ${idMaquina} AND m.fkEmpresa = 1 AND m.fkStatusMaquina = 1 AND m.fkTipoMaquina = 1;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT TOP 20 porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT TOP 10 porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC) AS subquery)
    , 'N2') AS insightCpuMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT TOP 20 porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT TOP 10 porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC) AS subquery)
    , 'N2') AS insightRamMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT TOP 20 porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT TOP 10 porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC) AS subquery)
    , 'N2') AS insightDiscoMensal
FROM maquina AS m
JOIN monitoramento AS mt ON mt.fkMaquina = m.idMaquina
JOIN empresa AS e ON m.fkEmpresa = e.idEmpresa
JOIN statusMaquina AS sm ON m.fkStatusMaquina = sm.idStatusMaquina
JOIN tipoMaquina AS t ON m.fkTipoMaquina = t.idTipoMaquina
WHERE m.idMaquina = ${idMaquina} AND m.fkEmpresa = 1 AND m.fkStatusMaquina = 1 AND m.fkTipoMaquina = 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//individual yas

//Picos
function buscarUltimosPico(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = 'Crítico') as picoCPU,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 2 AND nivelAviso = 'Crítico') as picoRAM;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = 'Crítico') as picoCPU,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 2 AND nivelAviso = 'Crítico') as picoRAM;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//Estado Ram
function buscarEstadoRam(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT TOP 1 ramUsada, ramDisponivel
    FROM MonitoramentoYasmin
    WHERE ramUsada IS NOT NULL AND ramDisponivel IS NOT NULL
    ORDER BY idMonitoramento DESC;
    `
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT ramUsada, ramDisponivel FROM MonitoramentoYasmin
    WHERE ramUsada IS NOT NULL AND ramDisponivel IS NOT NULL 
    ORDER BY idMonitoramento DESC LIMIT 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//Relatorio Ram
function buscarRelatorioRam(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT
    (SELECT ROUND(AVG(porcentagem), 2) FROM MonitoramentoYasmin WHERE fkComponente = 1) as media,
    (ROUND(((SELECT COUNT(*) FROM aviso WHERE fkComponente = 1) * 1.0 / (SELECT COUNT(*) FROM aviso)) * 100, 0)) as frequencia,
    (SELECT MAX(porcentagem) FROM MonitoramentoYasmin WHERE fkComponente = 1) as max;
`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT
    (SELECT ROUND(AVG(porcentagem), 2) FROM MonitoramentoYasmin WHERE fkComponente = 1) as media,
    (ROUND(((SELECT COUNT(*) FROM aviso WHERE fkComponente = 1) * 1.0 / (SELECT COUNT(*) FROM aviso)) * 100, 0)) as frequencia,
    (SELECT MAX(porcentagem) FROM MonitoramentoYasmin WHERE fkComponente = 1) as max;
`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//Scatter
function plotarScatter(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT porcentagem AS usoCpu,
    temperatura AS tempCpu
FROM Monitoramento;
`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT porcentagem AS usoCpu,
    temperatura AS tempCpu
    FROM Monitoramento;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//Barra
function plotarBarra(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = 'Crítico' AND DATEPART(WEEKDAY, dataHora) = 2) AS seg,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = 'Crítico' AND DATEPART(WEEKDAY, dataHora) = 3) AS ter,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = 'Crítico' AND DATEPART(WEEKDAY, dataHora) = 4) AS qua,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = 'Crítico' AND DATEPART(WEEKDAY, dataHora) = 5) AS qui,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = 'Crítico' AND DATEPART(WEEKDAY, dataHora) = 6) AS sex,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = 'Crítico' AND DATEPART(WEEKDAY, dataHora) = 7) AS sab,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = 'Crítico' AND DATEPART(WEEKDAY, dataHora) = 1) AS dom;
`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = "Crítico" AND DAYOFWEEK(dataHora) = 2) AS seg,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = "Crítico" AND DAYOFWEEK(dataHora) = 3) AS ter,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = "Crítico" AND DAYOFWEEK(dataHora) = 4) AS qua,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = "Crítico" AND DAYOFWEEK(dataHora) = 5) AS qui,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = "Crítico" AND DAYOFWEEK(dataHora) = 6) AS sex,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = "Crítico" AND DAYOFWEEK(dataHora) = 7) AS sab,
    (SELECT COUNT(*) FROM aviso WHERE fkComponente = 1 AND nivelAviso = "Crítico" AND DAYOFWEEK(dataHora) = 1) AS dom;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//Linha
function plotarLinha(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT
    (SELECT ROUND(AVG(porcentagem), 2) FROM Monitoramento WHERE fkComponente = 1 AND DATEPART(HOUR, dataHora) = 9) AS hr1,
    (SELECT ROUND(AVG(porcentagem), 2) FROM Monitoramento WHERE fkComponente = 1 AND DATEPART(HOUR, dataHora) = 10) AS hr2,
    (SELECT ROUND(AVG(porcentagem), 2) FROM Monitoramento WHERE fkComponente = 1 AND DATEPART(HOUR, dataHora) = 11) AS hr3,
    (SELECT ROUND(AVG(porcentagem), 2) FROM Monitoramento WHERE fkComponente = 1 AND DATEPART(HOUR, dataHora) = 12) AS hr4,
    (SELECT ROUND(AVG(porcentagem), 2) FROM Monitoramento WHERE fkComponente = 1 AND DATEPART(HOUR, dataHora) = 13) AS hr5,
    (SELECT ROUND(AVG(porcentagem), 2) FROM Monitoramento WHERE fkComponente = 1 AND DATEPART(HOUR, dataHora) = 14) AS hr6,
    (SELECT ROUND(AVG(porcentagem), 2) FROM Monitoramento WHERE fkComponente = 1 AND DATEPART(HOUR, dataHora) = 15) AS hr7,
    (SELECT ROUND(AVG(porcentagem), 2) FROM Monitoramento WHERE fkComponente = 1 AND DATEPART(HOUR, dataHora) = 16) AS hr8,
    (SELECT ROUND(AVG(porcentagem), 2) FROM Monitoramento WHERE fkComponente = 1 AND DATEPART(HOUR, dataHora) = 17) AS hr9;
`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT
    (SELECT ROUND(AVG(porcentagem),2) FROM Monitoramento WHERE fkComponente = 1 AND EXTRACT(HOUR FROM dataHora) = 9) AS hr1,
    (SELECT ROUND(AVG(porcentagem),2) FROM Monitoramento WHERE fkComponente = 1 AND EXTRACT(HOUR FROM dataHora) = 10) AS hr2,
    (SELECT ROUND(AVG(porcentagem),2) FROM Monitoramento WHERE fkComponente = 1 AND EXTRACT(HOUR FROM dataHora) = 11) AS hr3,
    (SELECT ROUND(AVG(porcentagem),2) FROM Monitoramento WHERE fkComponente = 1 AND EXTRACT(HOUR FROM dataHora) = 12) AS hr4,
    (SELECT ROUND(AVG(porcentagem),2) FROM Monitoramento WHERE fkComponente = 1 AND EXTRACT(HOUR FROM dataHora) = 13) AS hr5,
    (SELECT ROUND(AVG(porcentagem),2) FROM Monitoramento WHERE fkComponente = 1 AND EXTRACT(HOUR FROM dataHora) = 14) AS hr6,
    (SELECT ROUND(AVG(porcentagem),2) FROM Monitoramento WHERE fkComponente = 1 AND EXTRACT(HOUR FROM dataHora) = 15) AS hr7,
    (SELECT ROUND(AVG(porcentagem),2) FROM Monitoramento WHERE fkComponente = 1 AND EXTRACT(HOUR FROM dataHora) = 16) AS hr8,
      (SELECT ROUND(AVG(porcentagem),2) FROM Monitoramento WHERE fkComponente = 1 AND EXTRACT(HOUR FROM dataHora) = 16) AS hr9;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//ListaProcessos
function plotarListaProcessos(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT TOP 5 * FROM processo
    ORDER BY uso_cpu DESC;
    `
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT * FROM processo ORDER BY usoCPU DESC LIMIT 5;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//WordCloud
function plotarWordCloud(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT nome, COUNT(*) AS quantidade FROM Processo GROUP BY nome;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT nome, COUNT(*) AS quantidade FROM Processo GROUP BY nome;`
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
  setor,
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
  buscarInsightEmTempoReal,
  buscarUltimosPico,
  buscarEstadoRam,
  buscarRelatorioRam,
  plotarScatter,
  plotarBarra,
  plotarLinha,
  plotarListaProcessos,
  plotarWordCloud
}
