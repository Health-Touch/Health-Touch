var avisoModel = require('../models/avisoModel')

function listar(req, res) {
  avisoModel
    .listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}
function filtrar_Parametro(req, res) {
  avisoModel
    .filtrar_Parametro()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}
function filtrarParametroMaquina(req, res) {
  var idSetor = req.params.idSetor

  console.log('CORINGA 777')
  console.log(idSetor)
  avisoModel
    .filtrarParametroMaquina(idSetor)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function filtrarStatus(req, res) {
  var status = req.params.status

  console.log('CORINGA')
  console.log(status)
  avisoModel
    .filtrarStatus(status)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function verificarMaquinas(req, res) {
  var idEmpresa = req.params.idEmpresa

  console.log('Hello World')
  console.log(idEmpresa)
  avisoModel
    .verificarMaquinas(idEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function filtrarStatusMaquina(req, res) {
  var status = req.params.status
  var idSetor = req.params.idSetor

  console.log('i just want you there tomorrow')
  console.log(status)
  console.log(idSetor)
  avisoModel
    .filtrarStatusMaquina(status, idSetor)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function listarComputadores(req, res) {
  var idSetor = req.params.idSetor

  if (idSetor == undefined) {
    res.status(400).send('Seu idS está undefined!')
  } else {
    avisoModel
      .listarComputadores(idSetor)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado)
        } else {
          res.status(204).send('Nenhum resultado encontrado!')
        }
      })
      .catch(function (erro) {
        console.log(erro)
        console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
      })
  }
}

function verificarSetor(req, res) {
  var idSetor = req.params.idSetor

  if (idSetor == undefined) {
    res.status(400).send('Seu idSetor está undefined!')
  } else {
    avisoModel
      .verificarSetor(idSetor)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado)
        } else {
          res.status(204).send('Nenhum resultado encontrado!')
        }
      })
      .catch(function (erro) {
        console.log(erro)
        console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
      })
  }
}

function listarTodosComputadores(req, res) {
  avisoModel
    .listarTodosComputadores()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function filtrarComputadores(req, res) {
  var setor = req.params.setor

  console.log('CORINGA')
  console.log(setor)
  avisoModel
    .filtrarComputadores(setor)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function filtrarFuncionarios(req, res) {
  var cargo = req.params.cargo

  console.log('CORINGA')
  console.log(cargo)
  avisoModel
    .filtrarFuncionarios(cargo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function listarTodosFuncionarios(req, res) {
  avisoModel
    .listarTodosFuncionarios()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function listarUsb(req, res) {
  avisoModel
    .listarUsb()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function listarConsulta(req, res) {
  avisoModel
    .listarConsulta()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}
function listarSetor(req, res) {
  var idMaquina = req.params.idMaquina
  avisoModel
    .listarSetor(idMaquina)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function listarPorUsuario(req, res) {
  var idUsuario = req.params.idUsuario

  avisoModel
    .listarPorUsuario(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function pesquisarDescricao(req, res) {
  var descricao = req.params.descricao

  avisoModel
    .pesquisarDescricao(descricao)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function publicar(req, res) {
  var titulo = req.body.titulo
  var descricao = req.body.descricao
  var idUsuario = req.params.idUsuario

  if (titulo == undefined) {
    res.status(400).send('O título está indefinido!')
  } else if (descricao == undefined) {
    res.status(400).send('A descrição está indefinido!')
  } else if (idUsuario == undefined) {
    res.status(403).send('O id do usuário está indefinido!')
  } else {
    avisoModel
      .publicar(titulo, descricao, idUsuario)
      .then(function (resultado) {
        res.json(resultado)
      })
      .catch(function (erro) {
        console.log(erro)
        console.log('Houve um erro ao realizar o post: ', erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
      })
  }
}

function editar(req, res) {
  var novaDescricao = req.body.descricao
  var idAviso = req.params.idAviso

  avisoModel
    .editar(novaDescricao, idAviso)
    .then(function (resultado) {
      res.json(resultado)
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao realizar o post: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function deletar(req, res) {
  var idAviso = req.params.idAviso

  avisoModel
    .deletar(idAviso)
    .then(function (resultado) {
      res.json(resultado)
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao deletar o post: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function setorMaisUtilizado(req, res) {
  avisoModel.setorMaisUtilizado()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function setorMaisUtilizadoSub(req, res) {
  avisoModel.setorMaisUtilizadoSub()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function setorMenosUtilizado(req, res) {
  avisoModel.setorMenosUtilizado()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function setorMenosUtilizadoSub(req, res) {
  avisoModel.setorMenosUtilizadoSub()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function diaMaisMovimentado(req, res) {
  avisoModel.diaMaisMovimentado()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function diaMaisMovimentadoSub(req, res) {
  avisoModel.diaMaisMovimentadoSub()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function diaMenosMovimentado(req, res) {
  avisoModel.diaMenosMovimentado()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function diaMenosMovimentadoSub(req, res) {
  avisoModel.diaMenosMovimentadoSub()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function totenMaisUtilizado(req, res) {
  avisoModel.totenMaisUtilizado()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function totenMaisUtilizadoSub(req, res) {
  avisoModel.totenMaisUtilizadoSub()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function subConsulta(req, res) {
  avisoModel.subConsulta()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function mesAtual(req, res) {
  avisoModel.mesAtual()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function listarJanela(req, res) {
  var idMaquina = req.params.idMaquina
  avisoModel.listarJanela(idMaquina).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function janelaMes(req, res) {
  var idMaquina = req.params.idMaquina
  avisoModel.janelaMes(idMaquina).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function janelaAtivas(req, res) {
  var idMaquina = req.params.idMaquina
  avisoModel.janelaAtivas(idMaquina).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function listarRam(req, res) {
  var idMaquina = req.params.idMaquina
  avisoModel.listarRam(idMaquina).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}
function listarMensalRam(req, res) {
  var idMaquina = req.params.idMaquina
  avisoModel.listarMensalRam(idMaquina).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  listar,
  listarComputadores,
  listarTodosComputadores,
  verificarSetor,
  listarTodosFuncionarios,
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
  listarJanela,
  janelaMes,
  janelaAtivas,
  listarRam,
  listarMensalRam
}
