const router = require("express").Router();
const dataController = require("../controller/data.controller");
const { isLoginCheck } = require("../middleware/auth.middleware");

router.route("/upload").post(dataController.upload);
router.route("/").get(dataController.datas);

module.exports = router;
