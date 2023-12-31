var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidasCpu(req, res) {
    console.log(idMaquina + "entrei controller")
    const limite_linhas = 7;

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasCpu(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealCpu(req, res) {

    
    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealCpu(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasDisco(req, res) {

    const limite_linhas = 7;

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasDisco(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealDisco(req, res) {

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealDisco(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasRam(req, res) {

    const limite_linhas = 7;

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasRam(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealRam(req, res) {

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealRam(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasSetor(req, res) {

    const limite_linhas = 7;

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasSetor(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealSetor(req, res) {

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealSetor(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// começo do individual do tony
function buscarMedidasRede(req, res) {

    const limite_linhas = 12;

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasRede(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasRede(req, res) {

    const limite_linhas = 12;

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasRede(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarGrafico(req, res) {

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.atualizarGrafico(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarGraficoPing(req, res) {
    console.log(idMaquina + "entrei controller")

    var idMaquina =  req.params.idMaquina;

    medidaModel.buscarGraficoPing(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
// fim do individual do tony

// Começo Individual Maria

function buscarUltimasMedidasRamProcessos(req, res) {

    // const limite_linhas = 7;


    var idMaquina =  req.params.idMaquina;

    // console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasRamProcessos(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarUltimasMedidasCpuProcessos(req, res) {

    // const limite_linhas = 7;


    var idMaquina =  req.params.idMaquina;

    // console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasCpuProcessos(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealCpuProcessos(req, res) {

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealCpuProcessos(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarMedidasEmTempoRealRamProcessos(req, res) {

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealRamProcessos(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function obterDadosGraficoComponentesAtual(req, res) {
    // const limite_linhas = 7;
    var idMaquina = req.params.idMaquina
 
    console.log(`Recuperando as ultimas medidas`)
  
    medidaModel
      .obterDadosGraficoComponentesAtual(idMaquina)
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

//Final Individual Maria 

// Começo Individual Nunes
function relacaoComponentes(req, res) {
    console.log(idMaquina + "entrei controller")
    const limite_linhas = 20;

    var idMaquina =  req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.relacaoComponentes(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
//Final Individual Nunes 





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
    buscarMedidasEmTempoRealCpuProcessos,
    relacaoComponentes
}