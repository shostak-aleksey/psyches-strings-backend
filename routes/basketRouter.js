const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/addCourse", authMiddleware, basketController.addCourse);
router.post("/addVideo", authMiddleware, basketController.addVideo);
router.get("/", authMiddleware, basketController.getBasket);
router.delete("/removeCourse", authMiddleware, basketController.removeCourse);
router.delete("/removeVideo", authMiddleware, basketController.removeVideo);

module.exports = router;
