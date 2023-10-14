var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/registrar", function (req, res) {
    usuarioController.registrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});
router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})
router.post("/cadastrarRL", function (req, res) {
    usuarioController.cadastrarRL(req, res);
})

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de cadFuncController.js
router.post("/cadastrarFuncionario", function (req, res) {
    usuarioController.cadastrarFuncionario(req, res);
})

//Recebendo os dados do html e direcionando para a função cadastrar de cadFuncController.js
router.post("/cadastrarMaquina", function (req, res) {
    usuarioController.cadastrarMaquina(req, res);
})


module.exports = router;