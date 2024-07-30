const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkPoleMiddleware");

router.get("/", checkRole("ADMIN"), typeController.getAll);
router.post("/", typeController.create);

module.exports = router;
