const express = require("express");
const router = express.Router();

const contoller = require("../../controllers/client/product.controller");

router.get("/", contoller.index);

router.get("/:slugCategory", contoller.category);

router.get("/detail/:slugProduct", contoller.detail);

module.exports = router;