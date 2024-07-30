const Router = require("express");
const router = new Router();
const courseController = require("../controllers/courseController");
const checkRole = require("../middleware/checkRoleMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the course
 *         name:
 *           type: string
 *           description: The name of the course
 *         price:
 *           type: integer
 *           description: The price of the course
 *         description:
 *           type: string
 *           description: The description of the course
 *         image:
 *           type: string
 *           description: The image URL of the course
 *       example:
 *         id: 1
 *         name: "New Course"
 *         price: 100
 *         description: "Course description"
 *         image: "image.jpg"
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The courses managing API
 */

/**
 * @swagger
 * /course:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: The course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Some server error
 */

router.post("/", checkRole("ADMIN"), courseController.create);

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Returns the list of all the courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: The list of the courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */

router.get("/", courseController.getAll);

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Get the course by id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course id
 *     responses:
 *       200:
 *         description: The course description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: The course was not found
 */

router.get("/:id", courseController.getOne);

/**
 * @swagger
 * /course/{id}:
 *   put:
 *     summary: Update the course by the id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: The course was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: The course was not found
 *       500:
 *         description: Some error happened
 */

router.put("/:id", checkRole("ADMIN"), courseController.update);

/**
 * @swagger
 * /course/{id}:
 *   delete:
 *     summary: Remove the course by id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course id
 *     responses:
 *       200:
 *         description: The course was deleted
 *       404:
 *         description: The course was not found
 */

router.delete("/:id", checkRole("ADMIN"), courseController.delete);

module.exports = router;
