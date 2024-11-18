const Test = require('../models/Test');
const Question = require('../models/Question');
const UserResponse = require('../models/userResponse');
const Result = require('../models/Result');
const User = require('../models/User');
const PersonalityType = require('../models/PersonalityType');
const { validationResult } = require('express-validator');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function getTestIdByCategory(category) {
  if (category.startsWith('MBTI')) {
    return '67314bc744d8af164d588686'; // ID для MBTI Test
  }
  if (category.startsWith('EnneagrammaType')) {
    return '67314bc744d8af164d588687'; // ID для Enneagram Test
  }
  if (category.startsWith('HollandType')) {
    return '67314bc744d8af164d588688'; // ID для Holland Test
  }
  if (category.startsWith('CircleOfLife')) {
    return '67314bc744d8af164d588689'; // ID для Circle of Life Test
  }
  return null; // Если категория не соответствует ни одному тесту
}

function determineMBTIType(percentages) {
  const traits = {
    E: percentages['MBTIExtroversion'] || 0,
    I: percentages['MBTIIntroversion'] || 0,
    S: percentages['MBTISensing'] || 0,
    N: percentages['MBTIIntuition'] || 0,
    T: percentages['MBTIThinking'] || 0,
    F: percentages['MBTIFeelings'] || 0,
    J: percentages['MBTIJudging'] || 0,
    P: percentages['MBTIPerceiving'] || 0,
  };

  return (
    (traits.I > traits.E ? 'E' : 'I') + // Introversion over Extraversion
    (traits.S >= traits.N ? 'N' : 'S') + // Sensing over Intuition
    (traits.F >= traits.T ? 'T' : 'F') + // Feeling over Thinking
    (traits.P >= traits.J ? 'J' : 'P') // Perceiving over Judging
  );
}

// Helper function to determine Enneagram type
function determineEnneagramType(percentages) {
  let maxCategory = '';
  let maxPercentage = 0;

  for (const category in percentages) {
    if (percentages[category] > maxPercentage) {
      maxPercentage = percentages[category];
      maxCategory = category;
    }
  }

  return maxCategory;
}

// Helper function to determine Holland type
function determineHollandType(percentages) {
  const sortedCategories = Object.entries(percentages)
    .sort((a, b) => b[1] - a[1]) // Сортировка по убыванию процентов
    .slice(0, 3); // Выбор первых трех категорий

  // Объединение последних букв категорий
  return sortedCategories.map(([category]) => category.slice(-1)).join('');
}

function calculateScore(scoringType, answer) {
  const scoreMap = {
    'Точно нет': -3,
    'Скорее нет': -2,
    Маловероятно: -1,
    'Не уверен': 0,
    Возможно: 1,
    'Скорее да': 2,
    'Точно да': 3,
    нет: 0,
    да: 1,
  };
  return scoringType === 'positive' ? scoreMap[answer] : -scoreMap[answer];
}

async function getTests(req, res) {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getQuestions(req, res) {
  const { id } = req.params;
  const limit = parseInt(req.query.limit, 10) || 30;
  const { testType } = req.query;

  try {
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    const testCategories = test.category;
    if (!Array.isArray(testCategories)) {
      return res
        .status(500)
        .json({ error: 'Categories are not defined or not an array' });
    }

    const questions = await Question.find({ testId: id, testType });
    const categoryGroups = testCategories.reduce((acc, category) => {
      acc[category] = questions.filter((q) => q.category === category);
      return acc;
    }, {});

    for (const category in categoryGroups) {
      categoryGroups[category] = shuffleArray(categoryGroups[category]);
    }

    const interleavedQuestions = [];
    let addedCount = 0;
    while (addedCount < limit) {
      for (const category in categoryGroups) {
        if (categoryGroups[category].length > 0) {
          interleavedQuestions.push(categoryGroups[category].shift());
          addedCount++;
          if (addedCount >= limit) break;
        }
      }
    }

    res.json(interleavedQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function postAnswers(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, answers } = req.body;
  const testId = req.params.id;

  try {
    const test = await Test.findById(testId);
    const scores = {};

    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      const scoreValue = calculateScore(question.scoring, answer.answer);

      if (!(question.category in scores)) {
        scores[question.category] = 0;
      }

      scores[question.category] += scoreValue;
    }

    const totalScoreSum = Object.values(scores).reduce(
      (sum, score) => sum + score,
      0,
    );

    const percentages = {};
    for (const category in scores) {
      if (totalScoreSum !== 0) {
        percentages[category] = (scores[category] / totalScoreSum) * 100;
      } else {
        percentages[category] = 0;
      }
    }

    console.log('Calculated percentages:', percentages);

    const testType = await getTestIdByCategory(Object.keys(scores)[0]);
    let personalityType = '';

    switch (testType) {
      case '67314bc744d8af164d588686':
        personalityType = determineMBTIType(percentages);
        break;
      case '67314bc744d8af164d588687':
        personalityType = determineEnneagramType(percentages);
        break;
      case '67314bc744d8af164d588688':
        personalityType = determineHollandType(percentages);
        break;
      case '67314bc744d8af164d588689':
        break;
    }

    if (!personalityType) {
      console.warn('Personality type could not be determined.');
      return res
        .status(400)
        .json({ error: 'Не удалось определить тип личности.' });
    }

    const user = await User.findById(userId);
    if (user) {
      if (!Array.isArray(user.type)) {
        user.type = [];
      }

      user.type = user.type.filter((entry) => entry.testId !== testId);
      user.type.push({ testId, personalityType });

      await user.save();
    } else {
      console.warn('User not found.');
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const scoreObject = {
      testName: test.name,
      categories: scores,
    };

    const result = await Result.create({
      userId,
      testId,
      score: scoreObject,
      personalityType: { name: personalityType },
    });

    res.json({ result });
  } catch (err) {
    console.error('Error processing answers:', err.message);
    res.status(500).json({ error: err.message });
  }
}
async function getProfile(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    const results = await Result.find({ userId });
    res.json({ user, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getResponses(req, res) {
  try {
    const responses = await UserResponse.find({ userId: req.params.userId });
    const detailedResponses = responses.map((response) => ({
      questionId: response.questionId,
      questionText: response.questionText,
      answer: response.answer,
    }));

    res.json(detailedResponses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getResult(req, res) {
  const resultId = req.params.id;

  try {
    const result = await Result.findById(resultId).populate('personalityType');
    if (!result) {
      return res.status(404).json({ error: 'Результат не найден' });
    }

    res.json({ result });
  } catch (err) {
    console.error('Ошибка получения результата:', err.message);
    res.status(500).json({ error: err.message });
  }
}

async function updatePersonalityType(req, res) {
  const { id } = req.params;
  const { shortDescription, longDescription } = req.body;
  try {
    const personalityType = await PersonalityType.findByIdAndUpdate(
      id,
      { shortDescription, longDescription },
      { new: true },
    );
    res.json(personalityType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateQuestion(req, res) {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const question = await Question.findByIdAndUpdate(
      id,
      { text },
      { new: true },
    );
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getTests,
  getQuestions,
  postAnswers,
  getProfile,
  getResponses,
  getResult,
  updatePersonalityType,
  updateQuestion,
};
