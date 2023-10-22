// Começo da dash setor
var dashModel = require('../models/dashModel')

function autenticar2(req, res) {
  dashModel
    .autenticar2()
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

function buscarMaquinas(req, res) {
  dashModel
    .buscarMaquinas()
    .then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`)
      console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

      if (resultado.length >= 1) {
        console.log(resultado)

        dashModel.buscarMaquinas(resultado[0]).then(resultadoMaquinas => {
          if (resultadoMaquinas.length > 0) {
            res.json({
              maquina: resultadoMaquinas
            })
          } else {
            res.status(204).json({ maquina: [] })
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

//Analise atual
function buscarUltimasMedidas(req, res) {
  // const limite_linhas = 7;
  var idDispositivo = req.params.idDispositivo

  console.log(`Recuperando as ultimas medidas`)

  dashModel
    .buscarUltimasMedidas(idDispositivo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        'Houve um erro ao buscar as ultimas medidas.',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function buscarMedidasEmTempoReal(req, res) {
  var idDispositivo = req.params.idDispositivo

  console.log(`Recuperando medidas em tempo real`)

  dashModel
    .buscarMedidasEmTempoReal(idDispositivo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        'Houve um erro ao buscar as ultimas medidas.',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

//avisos
function buscarUltimosAvisos(req, res) {
  var idDispositivo = req.params.idDispositivo

  console.log(`Recuperando as ultimas medidas`)

  dashModel
    .buscarUltimosAvisos(idDispositivo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        'Houve um erro ao buscar as ultimas medidas.',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

function buscarAvisosEmTempoReal(req, res) {
  var idDispositivo = req.params.idDispositivo

  console.log(`Recuperando Avisos em tempo real`)

  dashModel
    .buscarAvisosEmTempoReal(idDispositivo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        'Houve um erro ao buscar as ultimas medidas.',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

//usb
function buscarUltimosUsb(req, res) {
  var idDispositivo = req.params.idDispositivo

  console.log(`Recuperando os ultimos usbs`)

  dashModel
    .buscarUltimosUsb(idDispositivo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar as ultimas usbs.', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function buscarUsbEmTempoReal(req, res) {
  var idDispositivo = req.params.idDispositivo

  console.log(`Recuperando Usb em tempo real`)

  dashModel
    .buscarUsbEmTempoReal(idDispositivo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        'Houve um erro ao buscar as ultimas medidas.',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

//media
function buscarUltimosMedia(req, res) {
  var idDispositivo = req.params.idDispositivo

  console.log(`Recuperando os ultimos Medias`)

  dashModel
    .buscarUltimosMedia(idDispositivo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar as ultimas usbs.', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function buscarMediaEmTempoReal(req, res) {
  var idDispositivo = req.params.idDispositivo

  console.log(`Recuperando Media em tempo real`)

  dashModel
    .buscarMediaEmTempoReal(idDispositivo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        'Houve um erro ao buscar as ultimas medidas.',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
}

//insght
function buscarUltimosInsight(req, res) {
  var idDispositivo = req.params.idDispositivo

  console.log(`Recuperando os ultimos Insights`)

  dashModel
    .buscarUltimosInsight(idDispositivo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar as ultimas usbs.', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function buscarInsightEmTempoReal(req, res) {
  var idDispositivo = req.params.idDispositivo

  console.log(`Recuperando Insight em tempo real`)

  dashModel
    .buscarInsightEmTempoReal(idDispositivo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log(
        'Houve um erro ao buscar as ultimas medidas.',
        erro.sqlMessage
      )
      res.status(500).json(erro.sqlMessage)
    })
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
