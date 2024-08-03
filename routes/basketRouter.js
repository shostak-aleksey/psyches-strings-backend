const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
const checkRole = require("../middleware/checkRoleMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Basket:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the basket
 *         userId:
 *           type: integer
 *           description: The id of the user who owns the basket
 *       example:
 *         id: 1
 *         userId: 1
 *     BasketCourse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the basket course
 *         basketId:
 *           type: integer
 *           description: The id of the basket
 *         courseId:
 *           type: integer
 *           description: The id of the course
 *       example:
 *         id: 1
 *         basketId: 1
 *         courseId: 1
 *     BasketVideo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the basket video
 *         basketId:
 *           type: integer
 *           description: The id of the basket
 *         videoId:
 *           type: integer
 *           description: The id of the video
 *       example:
 *         id: 1
 *         basketId: 1
 *         videoId: 1
 */

/**
 * @swagger
 * tags:
 *   name: Baskets
 *   description: The baskets managing API
 */

/**
 * @swagger
 * /basket:
 *   get:
 *     summary: Get the basket for the current user
 *     tags: [Baskets]
 *     responses:
 *       200:
 *         description: The basket of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Basket'
 *       500:
 *         description: Some server error
 */
router.get("/", basketController.getBasket);

/**
 * @swagger
 * /basket/course:
 *   post:
 *     summary: Add a course to the basket
 *     tags: [Baskets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BasketCourse'
 *     responses:
 *       200:
 *         description: The course was added to the basket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasketCourse'
 *       500:
 *         description: Some server error
 */
router.post("/course", basketController.addCourse);

/**
 * @swagger
 * /basket/video:
 *   post:
 *     summary: Add a video to the basket
 *     tags: [Baskets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BasketVideo'
 *     responses:
 *       200:
 *         description: The video was added to the basket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasketVideo'
 *       500:
 *         description: Some server error
 */
router.post("/video", basketController.addVideo);

/**
 * @swagger
 * /basket/course:
 *   delete:
 *     summary: Remove a course from the basket
 *     tags: [Baskets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BasketCourse'
 *     responses:
 *       200:
 *         description: The course was removed from the basket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasketCourse'
 *       500:
 *         description: Some server error
 */
router.delete("/course", basketController.removeCourse);

/**
 * @swagger
 * /basket/video:
 *   delete:
 *     summary: Remove a video from the basket
 *     tags: [Baskets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BasketVideo'
 *     responses:
 *       200:
 *         description: The video was removed from the basket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasketVideo'
 *       500:
 *         description: Some server error
 */
router.delete("/video", basketController.removeVideo);

module.exports = router;
