const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const courseRouter = require('./courseRouter');
const videoRouter = require('./videoRouter');
const basketRouter = require('./basketRouter');
const authRouter = require('./authRouter');
const testRouter = require('./testRouter');

router.use('/tests', testRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/courses', courseRouter);
router.use('/videos', videoRouter);
router.use('/basket', basketRouter);

module.exports = router;
