var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimasCpu/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasCpu(req, res);
});

router.get("/tempo-realCpu/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCpu(req, res);
})

router.get("/ultimasDisco/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasDisco(req, res);
});

router.get("/tempo-realDisco/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDisco(req, res);
})

router.get("/ultimasRam/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasRam(req, res);
});

router.get("/tempo-realRam/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRam(req, res);
})

router.get("/ultimasSetor/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasSetor(req, res);
});

router.get("/tempo-realSetor/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealSetor(req, res);
})

router.get("/tempo-medidasRede/:idMaquina", function (req, res) {
    medidaController.buscarMedidasRede(req, res);
})

router.get("/buscarGraficoPing/:idMaquina", function (req, res) {
    medidaController.buscarGraficoPing(req, res);
})

router.get("/atualizarGrafico/:idMaquina", function (req, res) {
    medidaController.atualizarGrafico(req, res);
})




// Começo Individual Maria
router.get("/ultimasRamProcesso/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasRamProcessos(req, res);
});

router.get("/tempo-realRamProcessos/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRamProcessos(req, res);
})

router.get("/ultimasCpuProcesso/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasCpuProcessos(req, res);
});
router.get("/tempo-realCpuProcessos/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCpuProcessos(req, res);
})
router.get('/obterDadosGraficoComponentesAtual/:idMaquina', function (req, res) {
    medidaController.obterDadosGraficoComponentesAtual(req, res)
})
//Final Individual Maria 

// Começo Individual Nunes
router.get("/relacaoComponentes/:idMaquina", function (req, res) {
    medidaController.relacaoComponentes(req, res);
})
//Final Individual Nunes 
module.exports = router;