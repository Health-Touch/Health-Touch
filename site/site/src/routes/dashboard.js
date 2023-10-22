// Começo da dash setor
var express = require('express')
var router = express.Router()

var dashController = require('../controllers/dashController')

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get('/autenticar', function (req, res) {
  dashController.autenticar(req, res)
})

router.get('/maquinas', function (req, res) {
  dashController.buscarMaquinas(req, res)
})

//Analise atual
router.get('/ultimas/:idDispositivo', function (req, res) {
  dashController.buscarUltimasMedidas(req, res)
})

router.get('/tempo-real/:idDispositivo', function (req, res) {
  dashController.buscarMedidasEmTempoReal(req, res)
})

//Avisos
router.get('/ultimos/:idDispositivo', function (req, res) {
  dashController.buscarUltimosAvisos(req, res)
})

router.get('/avisos/tempo-real/:idDispositivo', function (req, res) {
  dashController.buscarAvisosEmTempoReal(req, res)
})

//Usb
router.get('/usb/:idDispositivo', function (req, res) {
  dashController.buscarUltimosUsb(req, res)
})

router.get('/usb/tempo-real/:idDispositivo', function (req, res) {
  dashController.buscarUsbEmTempoReal(req, res)
})

//Média
router.get('/media/:idDispositivo', function (req, res) {
  dashController.buscarUltimosMedia(req, res)
})

router.get('/media/tempo-real/:idDispositivo', function (req, res) {
  dashController.buscarMediaEmTempoReal(req, res)
})

//Insight
router.get('/insight/:idDispositivo', function (req, res) {
  dashController.buscarUltimosInsight(req, res)
})

router.get('/insight/tempo-real/:idDispositivo', function (req, res) {
  dashController.buscarInsightEmTempoReal(req, res)
})

module.exports = router
