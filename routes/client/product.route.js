const express = require("express");
const router = express.Router();

const contoller = require("../../controllers/client/product.controller");

router.get("/", contoller.index);

router.get("/:slug", contoller.detail);

module.exports = router;