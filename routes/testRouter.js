// const express = require('express');
// const router = express.Router();
// const Answer = require('../models/Answer');
// const Result = require('../models/Result');

// // POST /api/tests/:testId/answers
// router.post('/:testId/answers', async (req, res) => {
//   try {
//     const { userId, answers } = req.body; // answers should be an array of { questionId, answer }
//     const testId = req.params.testId;

//     // Save each answer
//     for (let ans of answers) {
//       await Answer.create({
//         userId,
//         questionId: ans.questionId,
//         answer: ans.answer,
//       });
//     }

//     res.status(201).send('Answers submitted');
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// // GET /api/tests/:testId/results
// router.get('/:testId/results', async (req, res) => {
//   try {
//     const testId = req.params.testId;
//     const results = await Result.find({ testId }).populate(
//       'userId',
//       'name email',
//     );
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// module.exports = router;
