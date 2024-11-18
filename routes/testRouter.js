const express = require('express');
const { body } = require('express-validator');
const testController = require('../controllers/testController');
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of tests
 *     tags:
 *       - Tests
 *     responses:
 *       200:
 *         description: A list of tests.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 */
router.get('/', testController.getTests);

/**
 * @swagger
 * /{id}/questions:
 *   get:
 *     summary: Retrieve questions for a specific test
 *     tags:
 *       - Tests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The test ID
 *     responses:
 *       200:
 *         description: A list of questions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
router.get('/:id/questions', testController.getQuestions);

/**
 * @swagger
 * /{id}/answers:
 *   post:
 *     summary: Submit answers for a test
 *     tags:
 *       - Tests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The test ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     answer:
 *                       type: string
 *     responses:
 *       200:
 *         description: Answers submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
router.post(
  '/:id/answers',
  [
    body('userId').isString().notEmpty(),
    body('answers').isArray().notEmpty(),
    body('answers.*.questionId').isString().notEmpty(),
    body('answers.*.answer').notEmpty(),
  ],
  testController.postAnswers,
);

/**
 * @swagger
 * /profile/{userId}:
 *   get:
 *     summary: Retrieve a user profile and results
 *     tags:
 *       - Tests
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User profile and results.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Result'
 */
router.get('/profile/:userId', testController.getProfile);

/**
 * @swagger
 * /questions/responses/{userId}:
 *   get:
 *     summary: Retrieve user responses
 *     tags:
 *       - Tests
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User responses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   questionId:
 *                     type: string
 *                   questionText:
 *                     type: string
 *                   answer:
 *                     type: string
 */
router.get('/questions/responses/:userId', testController.getResponses);

/**
 * @swagger
 * /{id}/result:
 *   get:
 *     summary: Retrieve a test result
 *     tags:
 *       - Tests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The result ID
 *     responses:
 *       200:
 *         description: Test result.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
router.get('/:id/result', testController.getResult);

/**
 * @swagger
 * /personality-type/{id}:
 *   put:
 *     summary: Update a personality type
 *     tags:
 *       - Tests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The personality type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shortDescription:
 *                 type: string
 *               longDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Personality type updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonalityType'
 */
router.put('/personality-type/:id', testController.updatePersonalityType);

/**
 * @swagger
 * /question/{id}:
 *   put:
 *     summary: Update a question
 *     tags:
 *       - Tests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Question updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 */
router.put('/question/:id', testController.updateQuestion);

module.exports = router;
