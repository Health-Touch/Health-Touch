// Começo da dash setor
var express = require('express')
var router = express.Router()

var dashController = require('../controllers/dashController')

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get('/autenticar', function (req, res) {
  dashController.autenticar(req, res)
})

router.get('/statusUsb', function (req, res) {
  dashController.statusUsb(req, res)
})

router.get('/statusUsb', function (req, res) {
  dashController.statusUsb(req, res)
})

router.get('/cpuMensal', function (req, res) {
  dashController.usoCpuMensal(req, res)
})

router.get('/ramMensal', function (req, res) {
  dashController.usoRamMensal(req, res)
})

router.get('/discoMensal', function (req, res) {
  dashController.usoDiscoMensal(req, res)
})

router.get('/insightCpu', function (req, res) {
  dashController.buscarInsightCpu(req, res)
})

router.get('/insightRam', function (req, res) {
  dashController.buscarInsightRam(req, res)
})

router.get('/insightDisco', function (req, res) {
  dashController.buscarInsightDisco(req, res)
})

router.get('/analiseGeral', function (req, res) {
  dashController.buscarAnaliseGeral(req, res)
})

router.get('/avisos', function (req, res) {
  dashController.buscarAvisos(req, res)
})
//Fim da dash setor

module.exports = router
