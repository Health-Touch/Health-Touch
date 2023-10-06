// Começo da dash setor
var database = require('../database/config')

function autenticar() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  select local.idLocal, local.setor, local.sala, local.andar, local.fkDispositivo, local.fkEmpresa, local.fkTipoDispositivo from local join dispositivo on local.fkDispositivo = dispositivo.idDispositivo join empresa on empresa.idEmpresa = local.fkEmpresa join plano on plano.idPlano = local.fkPlanoEmpresa join tipoDispositivo on tipoDispositivo.idTipoDispositivo where empresa.idEmpresa = 1 and tipoDispositivo.idTipoDispositivo = 1 and dispositivo.idDispositivo = 1;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function statusUsb() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  select count(idUsb) as status from usb where date(dtHoraInserção) = (SELECT CURDATE());
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function usoCpuMensal() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  select format(avg(porcentagem),2) as usoCpuMensal from monitoramento where fkComponente = 1;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function usoRamMensal() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  select format(avg(porcentagem),2) as usoRamMensal from monitoramento where fkComponente = 2;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function usoDiscoMensal() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  select format(avg(porcentagem),2) as usoDiscoMensal from monitoramento where fkComponente = 3;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function buscarInsightCpu() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  SELECT 
    (SELECT avg(porcentagem) FROM monitoramento WHERE date(dataHora) = CURDATE() AND fkComponente = 1) - (SELECT avg(porcentagem) FROM monitoramento WHERE date(dataHora) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND fkComponente = 1) as insightCpu;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function buscarInsightRam() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  SELECT 
  (SELECT avg(porcentagem) FROM monitoramento WHERE date(dataHora) = CURDATE() AND fkComponente = 2) - (SELECT avg(porcentagem) FROM monitoramento WHERE date(dataHora) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND fkComponente = 2) as insightRam;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function buscarInsightDisco() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  SELECT 
    (SELECT avg(porcentagem) FROM monitoramento WHERE date(dataHora) = CURDATE() AND fkComponente = 3) - (SELECT avg(porcentagem) FROM monitoramento WHERE date(dataHora) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND fkComponente = 3) as insightDisco;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function buscarAnaliseGeral() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  SELECT
    (SELECT porcentagem FROM monitoramento WHERE fkComponente = 1 AND idMonitoramento = (SELECT MAX(idMonitoramento) FROM monitoramento WHERE fkComponente = 1)) as usoCpu,
    (SELECT porcentagem FROM monitoramento WHERE fkComponente = 2 AND idMonitoramento = (SELECT MAX(idMonitoramento) FROM monitoramento WHERE fkComponente = 2)) as usoRam,
    (SELECT porcentagem FROM monitoramento WHERE fkComponente = 3 AND idMonitoramento = (SELECT MAX(idMonitoramento) FROM monitoramento WHERE fkComponente = 3)) as usoDisco;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function buscarAvisos() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  SELECT idAviso, descricao, DATE_FORMAT(dtHr, '%d/%m/%Y %H:%i:%s') as dtHr FROM aviso;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}
//Fim da dash setor

module.exports = {
  autenticar,
  statusUsb,
  usoCpuMensal,
  usoRamMensal,
  usoDiscoMensal,
  buscarInsightCpu,
  buscarInsightRam,
  buscarInsightDisco,
  buscarAnaliseGeral,
  buscarAvisos
}
