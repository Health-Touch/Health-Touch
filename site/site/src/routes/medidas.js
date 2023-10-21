var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimasCpu/:fkMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasCpu(req, res);
});

router.get("/tempo-realCpu/:fkMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCpu(req, res);
})

router.get("/ultimasDisco/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidasDisco(req, res);
});

router.get("/tempo-realDisco/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDisco(req, res);
})

router.get("/ultimasRam/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidasRam(req, res);
});

router.get("/tempo-realRam/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRam(req, res);
})

module.exports = router;