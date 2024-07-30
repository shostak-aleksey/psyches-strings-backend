const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, basketController.addDevice);
router.get("/", authMiddleware, basketController.getBasket);
router.delete("/remove", authMiddleware, basketController.removeDevice);

module.exports = router;
