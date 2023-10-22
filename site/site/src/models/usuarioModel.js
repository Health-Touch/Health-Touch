var database = require('../database/config')

function entrar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
  var instrucao = `
    select Colaborador.idColaborador, Colaborador.nome, Colaborador.email, Colaborador.senha, Colaborador.CPF,  NivelAcesso.nivelAcesso, Empresa.idEmpresa, Empresa.NomeFantasia 
    from Colaborador join NivelAcesso on fkNivelAcesso = idNivelAcesso 
                      join Empresa on fkEmpresa = idEmpresa WHERE email = '${email}' AND senha = '${senha}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa(nome, cnpj, telefone) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    cnpj,
    telefone
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
        INSERT INTO Empresa (NomeFantasia, CNPJ, inicioContrato, telFixo) VALUES ('${nome}', '${cnpj}', curdate(), '${telefone}');
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function cadastrarEndereco (cep, estado, cidade, rua, numero) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    cep,
    estado,
    cidade,
    rua,
    numero
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  
  var instrucao = `
  INSERT INTO Endereco (rua, num, estado, CEP,  cidade, fkEmpresa) VALUES ('${rua}', '${numero}','${estado}', '${cep}', '${cidade}',(select MAX(idEmpresa) from empresa));
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function cadastrarRl (nome, cpf, email, senha, nivel, status) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    cpf,
    email,
    senha,
    nivel,
    status
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  
  var instrucao = `
  INSERT INTO Colaborador (nome, email, senha, CPF, fkStatus,  fkNivelAcesso,fkEmpresa) VALUES ('${nome}', '${email}','${senha}', '${cpf}', '${status}', '${nivel}', (select MAX(idEmpresa) from empresa));
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}
function registrar(NomeBotao) {

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
      INSERT INTO click (NomeBotao) VALUES ('${NomeBotao}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarFuncionario(nome, email, senha, cpf, fkEmpresa, fkStatus, fkNivelAcesso) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFuncionario():", nome, email, senha, cpf, fkEmpresa, fkStatus, fkNivelAcesso);
  
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
      INSERT INTO Colaborador (nome, email, senha, CPF, fkEmpresa, fkStatus, fkNivelAcesso) VALUES 
      ('${nome}', '${email}', '${senha}', '${cpf}', '${fkEmpresa}', '${fkStatus}', '${fkNivelAcesso}');
  `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarMaquina(so, ip, andar, fkMaqEmpresa, fkLocal, fkPLanoEmpresa, fkStatusMaquina, fkTipoMaquina) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", so, ip, andar, fkMaqEmpresa, fkLocal, fkPLanoEmpresa, fkStatusMaquina, fkTipoMaquina);
  
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
      INSERT INTO Maquina (so, ip, andar, fkEmpresa, fkLocal, fkPLanoEmpresa, fkStatusMaquina, fkTipoMaquina) VALUES 
      ('${so}', '${ip}', '${andar}', '${fkMaqEmpresa}', '${fkLocal}', '${fkPLanoEmpresa}', '${fkStatusMaquina}', '${fkTipoMaquina}');
  `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function cadastrarSetores(nomeSetor) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSetores():", nomeSetor);
  
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
      INSERT INTO setor (nome) VALUES 
      ('${nomeSetor}');
  `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  entrar,
  cadastrarEmpresa,
  cadastrarEndereco,
  cadastrarRl,
  cadastrarFuncionario,
  cadastrarMaquina,
  cadastrarSetores,
  registrar
}
