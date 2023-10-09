var express = require("express");
var router = express.Router();

var cadFuncController = require("../controllers/cadFuncController");

router.get("/", function (req, res) {
    cadFuncController.testar(req, res);
});

router.get("/listar", function (req, res) {
    cadFuncController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de cadFuncController.js
router.post("/cadastrar", function (req, res) {
    cadFuncController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    cadFuncController.entrar(req, res);
});

module.exports = router;