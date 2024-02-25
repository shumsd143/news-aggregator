const { get } = require("../controllers/news.controller");

const router = require("express").Router();

router.get("/", get);

module.exports = router;
