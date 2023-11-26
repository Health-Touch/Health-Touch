var express = require('express')
var router = express.Router()

var avisoController = require('../controllers/avisoController')

router.get('/listar', function (req, res) {
  avisoController.listar(req, res)
})

router.get('/filtrar_Parametro', function (req, res) {
  avisoController.filtrar_Parametro(req, res)
})

router.get('/filtrarParametroMaquina/:idSetor', function (req, res) {
  avisoController.filtrarParametroMaquina(req, res)
})

router.get('/filtrarStatus/:status', function (req, res) {
  avisoController.filtrarStatus(req, res)
})

router.get('/filtrarStatusMaquina/:status/:idSetor', function (req, res) {
  avisoController.filtrarStatusMaquina(req, res)
})

router.get('/listarComputadores/:idSetor', function (req, res) {
  avisoController.listarComputadores(req, res)
})

router.get('/verificarSetor/:idSetor', function (req, res) {
  avisoController.verificarSetor(req, res)
})

router.get('/verificarMaquinas/:idEmpresa', function (req, res) {
  avisoController.verificarMaquinas(req, res)
})

router.get('/listarUsb', function (req, res) {
  avisoController.listarUsb(req, res)
})

router.get('/listarConsulta', function (req, res) {
  avisoController.listarConsulta(req, res)
})
router.get('/listarSetor/:idMaquina', function (req, res) {
  avisoController.listarSetor(req, res)
})

router.get('/listar/:idUsuario', function (req, res) {
  avisoController.listarPorUsuario(req, res)
})

router.get('/pesquisar/:descricao', function (req, res) {
  avisoController.pesquisarDescricao(req, res)
})

router.post('/publicar/:idUsuario', function (req, res) {
  avisoController.publicar(req, res)
})

router.put('/editar/:idAviso', function (req, res) {
  avisoController.editar(req, res)
})

router.delete('/deletar/:idAviso', function (req, res) {
  avisoController.deletar(req, res)
})

router.get('/listarTodosComputadores', function (req, res) {
  avisoController.listarTodosComputadores(req, res)
})

router.get('/filtrarComputadores/:setor', function (req, res) {
  avisoController.filtrarComputadores(req, res)
})

router.get('/listarTodosFuncionarios', function (req, res) {
  avisoController.listarTodosFuncionarios(req, res)
})

router.get('/filtrarFuncionarios/:cargo', function (req, res) {
  avisoController.filtrarFuncionarios(req, res)
})

router.get('/setorMaisUtilizado', function (req, res) {
  avisoController.setorMaisUtilizado(req, res)
})

router.get('/setorMaisUtilizadoSub', function (req, res) {
  avisoController.setorMaisUtilizadoSub(req, res)
})

router.get('/setorMenosUtilizado', function (req, res) {
  avisoController.setorMenosUtilizado(req, res)
})

router.get('/setorMenosUtilizadoSub', function (req, res) {
  avisoController.setorMenosUtilizadoSub(req, res)
})

router.get('/diaMaisMovimentado', function (req, res) {
  avisoController.diaMaisMovimentado(req, res)
})

router.get('/diaMaisMovimentadoSub', function (req, res) {
  avisoController.diaMaisMovimentadoSub(req, res)
})

router.get('/diaMenosMovimentado', function (req, res) {
  avisoController.diaMenosMovimentado(req, res)
})

router.get('/diaMenosMovimentadoSub', function (req, res) {
  avisoController.diaMenosMovimentadoSub(req, res)
})

router.get('/totenMaisUtilizado', function (req, res) {
  avisoController.totenMaisUtilizado(req, res)
})

router.get('/totenMaisUtilizadoSub', function (req, res) {
  avisoController.totenMaisUtilizadoSub(req, res)
})

router.get('/subConsulta', function (req, res) {
  avisoController.subConsulta(req, res)
})

module.exports = router
