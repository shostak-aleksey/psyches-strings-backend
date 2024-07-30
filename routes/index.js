const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const courseRouter = require("./courseRouter");
const videoRouter = require("./videoRouter");
const basketRouter = require("./basketRouter");

router.use("/user", userRouter);
router.use("/course", courseRouter);
router.use("/video", videoRouter);
router.use("/basket", basketRouter);

module.exports = router;
