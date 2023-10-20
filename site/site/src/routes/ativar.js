var express = require("express");
var router = express.Router();

router.put("/ativar/:id", function (req, res) {
    ativarController.ativar(req, res);
});

module.exports = router;