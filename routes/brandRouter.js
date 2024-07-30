const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), brandController.create);
router.get("/", brandController.getAll);
router.get("/:id", brandController.getOne);
router.put("/:id", checkRole("ADMIN"), brandController.update);
router.delete("/:id", checkRole("ADMIN"), brandController.delete);

module.exports = router;
