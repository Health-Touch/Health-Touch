var database = require('../database/config')

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  )
  var instrucao = `
        SELECT idColaborador, nome, email, fkEmpresa as empresaId FROM Colaborador WHERE email = '${email}' AND senha = '${senha}';
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, cnpj, status, contrato, telefone) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    cnpj,
    status,
    contrato,
    telefone
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
        INSERT INTO Empresa (NomeFantasia, CNPJ, StatusEmpresa, inicioContrato, telFixo) VALUES ('${nome}', '${cnpj}', '${status}', '${contrato}', '${telefone}');
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

module.exports = {
  autenticar,
  cadastrar
}
