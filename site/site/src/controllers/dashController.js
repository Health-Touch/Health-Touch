// Começo da dash setor
var dashModel = require('../models/dashModel')
var aquarioModel = require('../models/aquarioModel')

function autenticar(req, res) {
  dashModel
    .autenticar()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado)
        res.json(resultado[0]) // ?
      } else if (resultado.length == 0) {
        res.status(403).send('Email e/ou senha inválido(s)')
      } else {
        res.status(403).send('Mais de um usuário com o mesmo login e senha!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        '\nHouve um erro ao realizar o login! Erro: ',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function statusUsb(req, res) {
  dashModel
    .statusUsb()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado)
        res.json(resultado[0]) // ?
      } else if (resultado.length == 0) {
        res.status(403).send('Email e/ou senha inválido(s)')
      } else {
        res.status(403).send('Mais de um usuário com o mesmo login e senha!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        '\nHouve um erro ao realizar o login! Erro: ',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function usoCpuMensal(req, res) {
  dashModel
    .usoCpuMensal()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado)
        res.json(resultado[0]) // ?
      } else if (resultado.length == 0) {
        res.status(403).send('Email e/ou senha inválido(s)')
      } else {
        res.status(403).send('Mais de um usuário com o mesmo login e senha!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        '\nHouve um erro ao realizar o login! Erro: ',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function usoRamMensal(req, res) {
  dashModel
    .usoRamMensal()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado)
        res.json(resultado[0]) // ?
      } else if (resultado.length == 0) {
        res.status(403).send('Email e/ou senha inválido(s)')
      } else {
        res.status(403).send('Mais de um usuário com o mesmo login e senha!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        '\nHouve um erro ao realizar o login! Erro: ',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function usoDiscoMensal(req, res) {
  dashModel
    .usoDiscoMensal()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado)
        res.json(resultado[0]) // ?
      } else if (resultado.length == 0) {
        res.status(403).send('Email e/ou senha inválido(s)')
      } else {
        res.status(403).send('Mais de um usuário com o mesmo login e senha!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        '\nHouve um erro ao realizar o login! Erro: ',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function buscarInsightCpu(req, res) {
  dashModel
    .buscarInsightCpu()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado)
        res.json(resultado[0]) // ?
      } else if (resultado.length == 0) {
        res.status(403).send('Email e/ou senha inválido(s)')
      } else {
        res.status(403).send('Mais de um usuário com o mesmo login e senha!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        '\nHouve um erro ao realizar o login! Erro: ',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function buscarInsightRam(req, res) {
  dashModel
    .buscarInsightRam()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado)
        res.json(resultado[0]) // ?
      } else if (resultado.length == 0) {
        res.status(403).send('Email e/ou senha inválido(s)')
      } else {
        res.status(403).send('Mais de um usuário com o mesmo login e senha!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        '\nHouve um erro ao realizar o login! Erro: ',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function buscarInsightDisco(req, res) {
  dashModel
    .buscarInsightDisco()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado)
        res.json(resultado[0]) // ?
      } else if (resultado.length == 0) {
        res.status(403).send('Email e/ou senha inválido(s)')
      } else {
        res.status(403).send('Mais de um usuário com o mesmo login e senha!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        '\nHouve um erro ao realizar o login! Erro: ',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function buscarAnaliseGeral(req, res) {
  dashModel
    .buscarAnaliseGeral()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado)
        res.json(resultado[0]) // ?
      } else if (resultado.length == 0) {
        res.status(403).send('Email e/ou senha inválido(s)')
      } else {
        res.status(403).send('Mais de um usuário com o mesmo login e senha!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        '\nHouve um erro ao realizar o login! Erro: ',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function buscarAvisos(req, res) {
  dashModel
    .buscarAvisos()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length >= 1) {
        console.log(resultado)

        dashModel.buscarAvisos(resultado[0]).then(resultadoAvisos => {
          if (resultadoAvisos.length > 0) {
            res.json({
              aviso: resultadoAvisos
            })
          } else {
            res.status(204).json({ aviso: [] })
          }
        })
      } else if (resultado.length == 0) {
        res.status(403).send('Email e/ou senha inválido(s)')
      } else {
        res.status(403).send('Mais de um usuário com o mesmo login e senha!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        '\nHouve um erro ao realizar o login! Erro: ',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
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
