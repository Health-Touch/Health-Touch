var usuarioModel = require('../models/usuarioModel')
var aquarioModel = require('../models/aquarioModel')

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
      res.status(400).send("Sua senha está indefinida!");
  } else {
      
      usuarioModel.entrar(email, senha)
          .then(
              function (resultado) {
                  console.log(`\nResultados encontrados: ${resultado.length}`);
                  console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                  if (resultado.length == 1) {
                      console.log(resultado);
                      res.json(resultado[0]);
                  } else if (resultado.length == 0) {
                      res.status(403).send("Email e/ou senha inválido(s)");
                  } else {
                      res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                  }
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }

}

function registrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var NomeBotao = req.body.NomeBotaoServer;


  // Faça as validações dos valores
  if (NomeBotao == undefined) {
      res.status(400).send("Seu nome está undefined!");
  }  
  else {
      
      // Passe os valores como parâmetro e vá para o arquivo inovacaoModel.js
      usuarioModel.registrar(NomeBotao)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao realizar o cadastro! Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}


function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer
  var cnpj = req.body.cnpjServer
  var telefone = req.body.telefoneServer
  //var empresaId = req.body.empresaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!')
  } else if (cnpj == undefined) {
    res.status(400).send('Seu cnpj está undefined!')
  }  else if (telefone == undefined) {
    res.status(400).send('Sua telefone está undefined!')
  }
  //else if (empresaId == undefined) {
  // res.status(400).send("Sua empresa está undefined!");
  //}
  else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, cnpj, telefone)
      .then(function (resultado) {
        res.json(resultado)
      })
      .catch(function (erro) {
        console.log(erro)
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          erro.sqlMessage
        )
        res.status(500).json(erro.sqlMessage)
      })
  }
}
function cadastrarEndereco(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var cep = req.body.cepServer
  var estado = req.body.estadoServer
  var cidade = req.body.cidadeServer
  var rua = req.body.ruaServer
  var numero = req.body.numeroServer
  
  //var empresaId = req.body.empresaServer;

  // Faça as validações dos valores
  if (cep == undefined) {
    res.status(400).send('Seu cep está undefined!')
  } else if (estado == undefined) {
    res.status(400).send('Seu estado está undefined!')
  }  else if (cidade == undefined) {
    res.status(400).send('Sua cidade está undefined!')
  } else if (rua == undefined) {
    res.status(400).send('Sua rua está undefined!')
  }else if (numero == undefined) {
    res.status(400).send('Sua numero está undefined!')
  }
  //else if (empresaId == undefined) {
  // res.status(400).send("Sua empresa está undefined!");
  //}
  else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarEndereco(cep, estado, cidade, rua, numero)
      .then(function (resultado) {
        res.json(resultado)
      })
      .catch(function (erro) {
        console.log(erro)
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          erro.sqlMessage
        )
        res.status(500).json(erro.sqlMessage)
      })
  }
}

function cadastrarFuncionario(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cpf = req.body.cpfServer; 
  var fkEmpresa = req.body.empresaServer;
  var fkStatus = req.body.statusServer;
  var fkNivelAcesso = req.body.acessoServer;

  // Faça as validações dos valores
  if (nome == undefined) {
      res.status(400).send("Seu nome está undefined!");
  } else if (cpf == undefined) {
      res.status(400).send("Seu cpf está undefined!");
  } else {
      
      // Passe os valores como parâmetro e vá para o arquivo cadFuncModels.js
      usuarioModel.cadastrarFuncionario(nome, email, senha, cpf, fkEmpresa, fkStatus, fkNivelAcesso)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao realizar o cadastro! Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}

function cadastrarMaquina(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var so = req.body.soServer;
  var ip = req.body.ipServer;
  var andar = req.body.andarServer;
  var fkMaqEmpresa = req.body.empresaMaqServer;
  var fkLocal = req.body.localServer;
  var fkPLanoEmpresa = req.body.planoServer
  var fkStatusMaquina = req.body.statusMaquinaServer;
  var fkTipoMaquina = req.body.tipoMaquinaServer;

  // Faça as validações dos valores
  if (so == undefined) {
      res.status(400).send("Seu nome está undefined!");
  } else if (andar == undefined) {
      res.status(400).send("Seu cpf está undefined!");
  } else {
      
      // Passe os valores como parâmetro e vá para o arquivo cadFuncModels.js
      usuarioModel.cadastrarMaquina(so, ip, andar, fkMaqEmpresa, fkLocal, fkPLanoEmpresa, fkStatusMaquina, fkTipoMaquina)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao realizar o cadastro! Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}

module.exports = {
  entrar,
  cadastrar,
  cadastrarEndereco,
  cadastrarFuncionario,
  cadastrarMaquina,
  registrar
}
