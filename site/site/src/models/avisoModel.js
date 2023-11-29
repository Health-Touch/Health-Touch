var database = require('../database/config')


function listarAvisosCPU(idComputador) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
  SELECT
  FORMAT(dataHora, 'yyyy-MM') AS mes,
  COUNT(*) AS total_de_avisos
FROM
  aviso
WHERE
  fkMaquina = ${idComputador} AND
  fkComponente = '1' AND
  dataHora >= DATEADD(MONTH, -12, GETDATE())
GROUP BY
  FORMAT(dataHora, 'yyyy-MM')
ORDER BY
  mes DESC;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function listarAvisosRAM(idMaquina) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
  SELECT
  FORMAT(dataHora, 'yyyy-MM') AS mes,
  COUNT(*) AS total_de_avisos
FROM
  aviso
WHERE
  fkMaquina = ${idMaquina} AND
  fkComponente = '3' AND
  dataHora >= DATEADD(MONTH, -12, GETDATE())
GROUP BY
  FORMAT(dataHora, 'yyyy-MM')
ORDER BY
  mes DESC;


  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function buscarMes(idMaquina) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
  SELECT
  FORMAT(dataHora, 'yyyy-MM') AS mes
FROM
  aviso
WHERE
  fkMaquina = 1 AND
  dataHora >= DATEADD(MONTH, -12, GETDATE())
GROUP BY
  FORMAT(dataHora, 'yyyy-MM')
ORDER BY
  FORMAT(dataHora, 'yyyy-MM') DESC;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listar() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  )
  var instrucao = `
    SELECT max(nivelAviso) as UltimaAtt, idSetor, nome
    FROM setor
    left JOIN LocalSala ON idSetor = fkSetor
    left join maquina on fkLocal = idLocalSala 
    left join monitoramento on fkMaquina = idMaquina
    left join aviso on idMonitoramento = fkMonitoramento where idSetor between  1 and 25 group by idSetor;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}
function filtrar_Parametro() {
  console.log(
    "ACESSEI O listarStatus \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  )
  var instrucao = `
  Select distinct NivelAviso from aviso;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function filtrarParametroMaquina(idSetor) {
  console.log(
    "ACESSEI O listarStatus \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  )
  var instrucao = `
  SELECT DISTINCT
  aviso.nivelAviso as maxNivelAviso
FROM 
  maquina
  JOIN LocalSala ON fklocal = idLocalSala
  JOIN setor ON fksetor = idSetor
  JOIN empresa ON fkEmpresa = idEmpresa 
  JOIN aviso ON fkMaquina = idMaquina
WHERE 
  setor.idSetor = ${idSetor};
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function verificarMaquinas(idEmpresa) {
  console.log(
    "ACESSEI O listarStatus \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  )
  var instrucao = `
  SELECT
  MAX(e.fkPlano) as qtdTotal, COUNT(m.idMaquina) as qtdAtual
  FROM empresa as e JOIN maquina as m
  ON e.idEmpresa = m.fkEmpresa
  WHERE e.idEmpresa = ${idEmpresa};
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function filtrarStatus(status) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n"
  )
  var instrucao = `
  SELECT DISTINCT
  s.idSetor, s.nome
  FROM aviso as a JOIN maquina as m ON m.idMaquina = a.fkMaquina
  JOIN localSala as l ON m.fkLocal = l.idLocalSala
  JOIN setor as s ON l.fkSetor = s.idSetor
  WHERE a.nivelAviso = '${status}';
      `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function filtrarStatusMaquina(status, idSetor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n"
  )
  var instrucao = `
  SELECT 
  maquina.idMaquina,
  LocalSala.sala,
  LocalSala.andar,
  setor.nome,
  MAX(aviso.nivelAviso) as maxNivelAviso
FROM 
  maquina
  JOIN LocalSala ON fklocal = idLocalSala
  JOIN setor ON fksetor = idSetor
  JOIN empresa ON fkEmpresa = idEmpresa 
  JOIN aviso ON fkMaquina = idMaquina
WHERE 
  setor.idSetor = ${idSetor}
GROUP BY 
  maquina.idMaquina, LocalSala.sala, LocalSala.andar, setor.nome
HAVING 
  MAX(aviso.nivelAviso) = '${status}';

      `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function listarTodosFuncionarios() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n"
  )
  var instrucao = `
    select Colaborador.idColaborador, Colaborador.nome, Colaborador.email, StatusColaborador.statusColaborador, NivelAcesso.nivelAcesso from Colaborador join NivelAcesso on idNivelAcesso = fkNivelAcesso
							join StatusColaborador on idStatusColaborador = fkStatus order by idColaborador;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function verificarSetor(idSetor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n"
  )
  var instrucao = `
    select count(maquina.idMaquina) as qtdRegistrar from maquina 
                                    join LocalSala on fklocal = idLocalSala
                                    join setor on fksetor = idSetor where setor.idSetor = ${idSetor} ;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function listarTodosComputadores() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n"
  )
  var instrucao = `
    select  maquina.idMaquina, maquina.so, LocalSala.sala, LocalSala.andar,setor.nome, statusMaquina.statusMaquina from maquina 
    join LocalSala on fklocal = idLocalSala
        join setor on fksetor = idSetor
            join empresa on fkEmpresa = idEmpresa 
            join statusMaquina on fkStatusMaquina = idStatusMaquina order by idMaquina;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function filtrarComputadores(setor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n"
  )
  var instrucao = `
  select  maquina.idMaquina, maquina.so, LocalSala.sala, LocalSala.andar,setor.nome, statusMaquina.statusMaquina from maquina 
  join LocalSala on fklocal = idLocalSala
      join setor on fksetor = idSetor
          join empresa on fkEmpresa = idEmpresa 
          join statusMaquina on fkStatusMaquina = idStatusMaquina
          where setor.nome = '${setor}'
          order by idMaquina;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function filtrarFuncionarios(cargo) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n"
  )
  var instrucao = `
      select Colaborador.idColaborador, Colaborador.nome, Colaborador.email, StatusColaborador.statusColaborador, NivelAcesso.nivelAcesso from Colaborador join NivelAcesso on idNivelAcesso = fkNivelAcesso
                              join StatusColaborador on idStatusColaborador = fkStatus
                              where NivelAcesso.nivelAcesso = '${cargo}'
                              order by idColaborador;
      `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function listarComputadores(idSetor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n"
  )
  var instrucao = `
    SELECT 
    maquina.idMaquina,
    LocalSala.sala,
    LocalSala.andar,
    setor.nome,
    MAX(aviso.nivelAviso) as maxNivelAviso
FROM 
    maquina
    JOIN LocalSala ON fklocal = idLocalSala
    JOIN setor ON fksetor = idSetor
    JOIN empresa ON fkEmpresa = idEmpresa 
    LEFT JOIN aviso ON fkMaquina = idMaquina
WHERE 
    setor.idSetor = ${idSetor}
GROUP BY 
    maquina.idMaquina, LocalSala.sala, LocalSala.andar, setor.nome;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function listarUsb() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUsb()"
  )
  var instrucao = `
  SELECT idUSB, 
  nomeUsb,   
  CONVERT(VARCHAR, dtHoraInserção, 101) + ' ' + CONVERT(VARCHAR, dtHoraInserção, 108) as dtHoraInsercao, 
  fkMaquina  
FROM USB 
JOIN Maquina ON fkMaquina = idMaquina 
WHERE fkMaquina = 1;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function listarConsulta() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUsb()"
  )
  var instrucao = `
    SELECT count(nomeBotao) as consultaMensal
FROM analiseToten 
WHERE MONTH(dataHora) = MONTH((SELECT MAX(dataHora) FROM analiseToten))
  AND YEAR(dataHora) = YEAR((SELECT MAX(dataHora) FROM analiseToten));
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function listarSetor(idMaquina) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSetor()"
  )
  var instrucao = `
    select idSetor, nome from setor join LocalSala on idSetor = fkSetor join Maquina on fkLocal = idLocalSala where idMaquina = ${idMaquina};
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function pesquisarDescricao(texto) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()"
  )
  var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function listarPorUsuario(idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()"
  )
  var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE u.id = ${idUsuario};
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function publicar(titulo, descricao, idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ",
    titulo,
    descricao,
    idUsuario
  )
  var instrucao = `
        INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('${titulo}', '${descricao}', ${idUsuario});
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function editar(novaDescricao, idAviso) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",
    novaDescricao,
    idAviso
  )
  var instrucao = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function deletar(idAviso) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():",
    idAviso
  )
  var instrucao = `
        DELETE FROM aviso WHERE id = ${idAviso};
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}


function setorMaisUtilizado() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT nomeBotao, COUNT(*) AS quantidade
FROM analiseToten
WHERE MONTH(dataHora) = MONTH(GETDATE())
GROUP BY nomeBotao
ORDER BY quantidade DESC
OFFSET 0 ROWS FETCH FIRST 1 ROWS ONLY;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function setorMaisUtilizadoSub() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT nomeBotao, COUNT(*) AS quantidade
FROM analiseToten
WHERE MONTH(dataHora) = MONTH(DATEADD(MONTH, -1, GETDATE()))
GROUP BY nomeBotao
ORDER BY quantidade DESC
OFFSET 0 ROWS FETCH FIRST 1 ROWS ONLY;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function setorMenosUtilizado() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT TOP 1 nomeBotao, COUNT(*) AS quantidade
FROM analiseToten
WHERE MONTH(dataHora) = MONTH(GETDATE())
GROUP BY nomeBotao
ORDER BY quantidade DESC;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function setorMenosUtilizadoSub() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT TOP 1 nomeBotao, COUNT(*) AS quantidade
FROM analiseToten
WHERE MONTH(dataHora) = MONTH(DATEADD(MONTH, -1, GETDATE()))
GROUP BY nomeBotao
ORDER BY quantidade DESC;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function diaMaisMovimentado() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT TOP 1 DAY(dataHora) AS dia, COUNT(*) AS quantidade
FROM analiseToten
WHERE MONTH(dataHora) = MONTH(GETDATE())
GROUP BY DAY(dataHora)
ORDER BY quantidade DESC;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function diaMaisMovimentadoSub() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT TOP 1 DAY(dataHora) AS dia, COUNT(*) AS quantidade
  FROM analiseToten
  WHERE MONTH(dataHora) = MONTH(DATEADD(MONTH, -1, GETDATE()))
  GROUP BY DAY(dataHora)
  ORDER BY quantidade DESC;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}


function diaMenosMovimentado() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT TOP 1 DAY(dataHora) AS dia, COUNT(*) AS quantidade
FROM analiseToten
WHERE MONTH(dataHora) = MONTH(GETDATE())
GROUP BY DAY(dataHora)
ORDER BY quantidade DESC;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function diaMenosMovimentadoSub() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT TOP 1 DAY(dataHora) AS dia
FROM analiseToten
WHERE MONTH(dataHora) = MONTH(DATEADD(MONTH, -1, GETDATE()))
GROUP BY DAY(dataHora)
ORDER BY COUNT(*) ASC;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function totenMaisUtilizado() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT TOP 1 fkMaquina, COUNT(*) AS quantidade
FROM analiseToten
WHERE MONTH(dataHora) = MONTH(GETDATE())
GROUP BY fkMaquina
ORDER BY quantidade DESC;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function totenMaisUtilizadoSub() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT fkMaquina, COUNT(*) AS quantidade
FROM analiseToten
WHERE MONTH(dataHora) = MONTH(DATEADD(MONTH, -1, GETDATE()))
GROUP BY fkMaquina
ORDER BY quantidade DESC
OFFSET 0 ROWS FETCH FIRST 1 ROWS ONLY;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function subConsulta() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT
  consultaMensal,
  consultaAnterior,
  ROUND((consultaMensal - consultaAnterior) / consultaAnterior * 100, 0) AS percentual
FROM (
  SELECT
    count(nomeBotao) AS consultaMensal
  FROM analiseToten
  WHERE MONTH(dataHora) = MONTH((SELECT MAX(dataHora) FROM analiseToten))
  AND YEAR(dataHora) = YEAR((SELECT MAX(dataHora) FROM analiseToten))
) AS consultaMensal
CROSS JOIN (
  SELECT
    count(nomeBotao) AS consultaAnterior
  FROM analiseToten
  WHERE MONTH(dataHora) = MONTH((SELECT MAX(dataHora) FROM analiseToten) - INTERVAL 1 MONTH)
  AND YEAR(dataHora) = YEAR((SELECT MAX(dataHora) FROM analiseToten) - INTERVAL 1 MONTH)
) AS consultaAnterior;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function mesAtual() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function l()"
  )
  var instrucao = `
  SELECT MONTH(MAX(dataHora)) AS mêsAtual FROM analiseToten;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function listarJanela(idMaquina) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarJanela()");
  var instrucao = `
  select idJanela, tituloJanela, fkMaquina  from Janela join Maquina on fkMaquina = idMaquina where fkMaquina = ${idMaquina} and statusJanela = 1;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function janelaMes(idMaquina) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function janelaMes()");
  var instrucao = `
  SELECT count(tituloJanela) as janelaMensal
FROM Janela where fkMaquina = ${idMaquina} and
MONTH(dtjanela) = MONTH((SELECT MAX(dtjanela) FROM Janela))
AND YEAR(dtjanela) = YEAR((SELECT MAX(dtjanela) FROM Janela));
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function janelaAtivas(idMaquina) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function janelaMes()");
  var instrucao = `
  SELECT COUNT(*) AS janelasAtivas
FROM Janela
INNER JOIN Maquina ON Janela.fkMaquina = Maquina.idMaquina
WHERE Janela.statusJanela = 1 AND Janela.fkMaquina = ${idMaquina};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarRam(idMaquina) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarRam()");
  var instrucao = `
  SELECT TOP 1  porcentagem FROM Monitoramento join Maquina on fkMaquina =1
 ORDER BY idMonitoramento DESC;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarMensalRam(idMaquina) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMensalRam()");
  var instrucao = `SELECT max(porcentagem) as porcentagem
  FROM Monitoramento where fkMaquina = ${idMaquina} and
  fkComponente = 3 and
   MONTH(dataHora) = MONTH((SELECT MAX(dataHora) FROM Monitoramento))
    AND YEAR(dataHora) = YEAR((SELECT MAX(dataHora) FROM Monitoramento));
;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


// Começo Individual Maria
function listarProcessos(idMaquina) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarProcessos():", idMaquina);
  var instrucao = `
  SELECT processo.PID, 
  processo.nome, 
  ROUND(processo.uso_ram, 4) as uso_ram, 
  ROUND(processo.uso_cpu, 4) as uso_cpu
FROM processo 
JOIN maquina ON idMaquina = fkMaquina 
WHERE idMaquina = ${idMaquina};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function buscarTotalProcesso(idMaquina) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarTotalProcesso():", idMaquina);
  var instrucao = `
  select max(Processo.total_processos) as total_processos from Processo where fkMaquina = ${idMaquina};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function buscarTotalThreads(idMaquina) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function  buscarTotalThreads():", idMaquina);
  var instrucao = `
  select max(Processo.total_threads) as total_threads from Processo where fkMaquina = ${idMaquina};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function PesquisarProcessos(nomePesquisa) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function Pesquisar():", nomePesquisa);
  var instrucao = `
  select processo.PID, processo.nome, processo.uso_cpu, 
  processo.uso_ram
    from processo where nome = '${nomePesquisa}';

  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
// Final Individual Maria

module.exports = {
  listar,
  listarComputadores,
  listarTodosComputadores,
  listarTodosFuncionarios,
  verificarSetor,
  listarUsb,
  listarConsulta,
  listarSetor,
  listarPorUsuario,
  pesquisarDescricao,
  publicar,
  editar,
  deletar,
  filtrar_Parametro,
  filtrarComputadores,
  filtrarFuncionarios,
  filtrarStatus,
  filtrarParametroMaquina,
  filtrarStatusMaquina,
  verificarMaquinas,
  // aq
  setorMaisUtilizado, 
  setorMaisUtilizadoSub,
  setorMenosUtilizado,
  setorMenosUtilizadoSub,
  diaMaisMovimentado,
  diaMaisMovimentadoSub,
  diaMenosMovimentado,
  diaMenosMovimentadoSub,
  totenMaisUtilizado,
  totenMaisUtilizadoSub,
  subConsulta,
  mesAtual,
  // aq
  listarJanela,
  janelaMes,
  janelaAtivas,
  listarRam,
  listarMensalRam,
  listarProcessos,
  buscarTotalProcesso,
  buscarTotalThreads,
  PesquisarProcessos,
  listarAvisosCPU,
  listarAvisosRAM,
  buscarMes
}