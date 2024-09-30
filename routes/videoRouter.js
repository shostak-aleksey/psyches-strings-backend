const Router = require("express");
const router = new Router();
const videoController = require("../controllers/videoController");
const checkRole = require("../middleware/checkRoleMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - video
 *         - courseId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the video
 *         title:
 *           type: string
 *           description: The title of the video
 *         description:
 *           type: string
 *           description: The description of the video
 *         price:
 *           type: integer
 *           description: The price of the video
 *         video:
 *           type: string
 *           description: The URL of the video
 *         courseId:
 *           type: integer
 *           description: The ID of the course the video belongs to
 *       example:
 *         id: 1
 *         title: "New Video"
 *         description: "Video description"
 *         price: 100
 *         video: "video.mp4"
 *         courseId: 1
 */

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: The videos managing API
 */

/**
 * @swagger
 * /video:
 *   post:
 *     summary: Create a new video
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Video'
 *     responses:
 *       200:
 *         description: The video was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       500:
 *         description: Some server error
 */
router.post("/", checkRole("ADMIN"), videoController.create);

/**
 * @swagger
 * /video:
 *   get:
 *     summary: Returns the list of all the videos
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: The list of the videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 */
router.get("/", videoController.getAll);

/**
 * @swagger
 * /video/{id}:
 *   get:
 *     summary: Get the video by id
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video id
 *     responses:
 *       200:
 *         description: The video description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       404:
 *         description: The video was not found
 */
router.get("/:id", videoController.getOne);

/**
 * @swagger
 * /video/{id}:
 *   put:
 *     summary: Update the video by the id
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Video'
 *     responses:
 *       200:
 *         description: The video was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       404:
 *         description: The video was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", checkRole("ADMIN"), videoController.update);

/**
 * @swagger
 * /video/{id}:
 *   delete:
 *     summary: Remove the video by id
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video id
 *     responses:
 *       200:
 *         description: The video was deleted
 *       404:
 *         description: The video was not found
 */
router.delete("/:id", checkRole("ADMIN"), videoController.delete);

module.exports = router;
