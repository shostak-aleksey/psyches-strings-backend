// // // // require('dotenv').config();
// // // // const mongoose = require('mongoose');
// // // // const Question = require('./models/Question');

// // // // const MONGO_URI = process.env.MONGO_URI || 'your_mongo_uri_here';
// // // // mongoose
// // // //   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// // // //   .then(() => console.log('MongoDB connected'))
// // // //   .catch((err) => console.log(err));

// // // // const questionsData = [];

// // // // const replaceQuestions = async () => {
// // // //   try {
// // // //     // Extract unique testIds from questionsData
// // // //     const testIds = [...new Set(questionsData.map((q) => q.testId))];

// // // //     // Delete existing questions with matching id and testId
// // // //     for (const question of questionsData) {
// // // //       await Question.deleteMany({ id: question.id, testId: question.testId });
// // // //     }

// // // //     // Insert new questions data
// // // //     await Question.insertMany(questionsData);
// // // //     console.log('Questions replaced successfully');
// // // //   } catch (err) {
// // // //     console.error('Error replacing questions:', err);
// // // //   } finally {
// // // //     mongoose.connection.close();
// // // //   }
// // // // };

// // // // replaceQuestions();

// // // // // const removeCustomIdField = async () => {
// // // // //   try {
// // // // //     await Question.updateMany({}, { $unset: { id: '' } });
// // // // //     console.log('Custom `id` field removed from all questions');
// // // // //   } catch (err) {
// // // // //     console.error('Error removing custom `id` field:', err);
// // // // //   } finally {
// // // // //     mongoose.connection.close();
// // // // //   }
// // // // // };

// // // // // // Call the function to remove custom `id` fields
// // // // // removeCustomIdField();

// // // // // const tests = [
// // // // //   {
// // // // //     name: 'MBTI Test',
// // // // //     description: 'A test to determine your MBTI personality type',
// // // // //   },
// // // // //   {
// // // // //     name: 'Enneagram Test',
// // // // //     description: 'A test to determine your Enneagram type',
// // // // //   },
// // // // //   {
// // // // //     name: 'Holland Test',
// // // // //     description: 'A test to determine your Holland career type',
// // // // //   },
// // // // //   {
// // // // //     name: 'Circle of Life Test',
// // // // //     description: 'A test to evaluate your balance in life',
// // // // //   },
// // // // // ];
// // // // // const loadTests = async () => {
// // // // //   try {
// // // // //     await Test.insertMany(tests);
// // // // //     console.log('Tests loaded successfully');
// // // // //   } catch (err) {
// // // // //     console.error('Error loading tests:', err);
// // // // //   } finally {
// // // // //     mongoose.connection.close();
// // // // //   }
// // // // // };

// // // // // // loadTests();

// // // // // // const deleteQuestions = async (condition) => {
// // // // // //   try {
// // // // // //     const result = await Question.deleteMany(condition);
// // // // // //     console.log(`${result.deletedCount} questions deleted successfully`);
// // // // // //   } catch (err) {
// // // // // //     console.error('Error deleting questions:', err);
// // // // // //   } finally {
// // // // // //     mongoose.connection.close();
// // // // // //   }
// // // // // // };

// // // // // // // Example usage: Delete questions with a specific category
// // // // // // deleteQuestions({
// // // // // //   category: 'PerceivingJudging',
// // // // // // });

// // // // // // Function to delete questions based on a condition
// // // // // require('dotenv').config();
// // // // // const mongoose = require('mongoose');
// // // // // const Question = require('./models/Question');
// // // // // const Test = require('./models/Test');

// // // // // const MONGO_URI = process.env.MONGO_URI || 'your_mongo_uri_here';
// // // // // mongoose
// // // // //   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// // // // //   .then(() => console.log('MongoDB connected'))
// // // // //   .catch((err) => console.log(err));

// // // // // const getTestIdByCategory = async (category) => {
// // // // //   if (category.startsWith('MBTI')) {
// // // // //     return '67314bc744d8af164d588686'; // ID для MBTI Test
// // // // //   }
// // // // //   if (category.startsWith('EnneagrammaType')) {
// // // // //     return '67314bc744d8af164d588687'; // ID для Enneagram Test
// // // // //   }
// // // // //   if (category.startsWith('HollandType')) {
// // // // //     return '67314bc744d8af164d588688'; // ID для Holland Test
// // // // //   }
// // // // //   if (category.startsWith('CircleOfLife')) {
// // // // //     return '67314bc744d8af164d588689'; // ID для Circle of Life Test
// // // // //   }
// // // // //   return null;
// // // // // };

// // // // // const updateQuestionsWithTestId = async () => {
// // // // //   try {
// // // // //     const questions = await Question.find();
// // // // //     for (const question of questions) {
// // // // //       const testId = await getTestIdByCategory(question.category);
// // // // //       if (testId) {
// // // // //         await Question.updateOne({ _id: question._id }, { testId });
// // // // //       }
// // // // //     }
// // // // //     console.log('Questions updated with testId successfully');
// // // // //   } catch (err) {
// // // // //     console.error('Error updating questions:', err);
// // // // //   } finally {
// // // // //     mongoose.connection.close();
// // // // //   }
// // // // // };

// // // // // updateQuestionsWithTestId();
// // // // // require('dotenv').config();
// // // // // const mongoose = require('mongoose');
// // // // // const Question = require('./models/Question');

// // // // // const MONGO_URI = process.env.MONGO_URI || 'your_mongo_uri_here';
// // // // // mongoose
// // // // //   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// // // // //   .then(() => console.log('MongoDB connected'))
// // // // //   .catch((err) => console.log(err));
// // // // // const updateQuestions = async () => {
// // // // //   const updates = [];

// // // // //   try {
// // // // //     for (const update of updates) {
// // // // //       await Question.updateMany(
// // // // //         { id: update.id, testId: '67314bc744d8af164d588686' },
// // // // //         { text: update.text, category: update.category },
// // // // //       );
// // // // //     }
// // // // //     console.log('Questions updated successfully');
// // // // //   } catch (err) {
// // // // //     console.error('Error updating questions:', err);
// // // // //   } finally {
// // // // //     mongoose.connection.close();
// // // // //   }
// // // // // };

// // // // // updateQuestions();
// // // const mongoose = require('mongoose');
// // // const PersonalityType = require('./models/PersonalityType'); // Ensure the path is correct

// // // const circleOfLifeTestId = '67314bc744d8af164d588689'; // Example Test ID for Circle of Life

// // // const circleOfLifeCategories = [
// // //   {
// // //     name: 'Health',
// // //     description: 'Physical and mental well-being',
// // //     testId: circleOfLifeTestId,
// // //   },
// // //   {
// // //     name: 'Career',
// // //     description: 'Professional life and achievements',
// // //     testId: circleOfLifeTestId,
// // //   },
// // //   {
// // //     name: 'Relationships',
// // //     description: 'Personal and social connections',
// // //     testId: circleOfLifeTestId,
// // //   },
// // //   {
// // //     name: 'Finance',
// // //     description: 'Financial stability and management',
// // //     testId: circleOfLifeTestId,
// // //   },
// // //   {
// // //     name: 'Personal Growth',
// // //     description: 'Self-improvement and learning',
// // //     testId: circleOfLifeTestId,
// // //   },
// // //   {
// // //     name: 'Recreation',
// // //     description: 'Leisure and hobbies',
// // //     testId: circleOfLifeTestId,
// // //   },
// // //   {
// // //     name: 'Environment',
// // //     description: 'Living space and surroundings',
// // //     testId: circleOfLifeTestId,
// // //   },
// // //   {
// // //     name: 'Spirituality',
// // //     description: 'Beliefs and values',
// // //     testId: circleOfLifeTestId,
// // //   },
// // // ];

// // // require('dotenv').config();

// // // async function loadPersonalityTypes() {
// // //   try {
// // //     await mongoose.connect(process.env.MONGO_URI, {
// // //       useNewUrlParser: true,
// // //       useUnifiedTopology: true,
// // //     });

// // //     // Load Holland types
// // //     for (const type of circleOfLifeCategories) {
// // //       await PersonalityType.create(type);
// // //     }

// // //     console.log('Personality types loaded successfully');
// // //   } catch (err) {
// // //     console.error('Error loading personality types:', err);
// // //   } finally {
// // //     mongoose.connection.close();
// // //   }
// // // }

// // // loadPersonalityTypes();
// // require('dotenv').config();
// // const mongoose = require('mongoose');
// // const Test = require('./models/Test'); // Ensure the path is correct

// // const MONGO_URI = process.env.MONGO_URI || 'your_mongo_uri_here';

// // console.log('Connecting to MongoDB with URI:', MONGO_URI);

// // // Define the testCategories mapping
// // const testCategories = {
// //   'MBTI Test': [
// //     'MBTIExtroversion',
// //     'MBTIIntroversion',
// //     'MBTISensing',
// //     'MBTIIntuition',
// //     'MBTIThinking',
// //     'MBTIFeelings',
// //     'MBTIJudging',
// //     'MBTIPerceiving',
// //   ],
// //   'Enneagram Test': [
// //     'EnneagrammaType1',
// //     'EnneagrammaType2',
// //     'EnneagrammaType3',
// //     'EnneagrammaType4',
// //     'EnneagrammaType5',
// //     'EnneagrammaType6',
// //     'EnneagrammaType7',
// //     'EnneagrammaType8',
// //     'EnneagrammaType9',
// //   ],
// //   'Holland Test': [
// //     'HollandTypeA',
// //     'HollandTypeR',
// //     'HollandTypeI',
// //     'HollandTypeS',
// //     'HollandTypeE',
// //     'HollandTypeC',
// //   ],
// //   'Circle of Life Test': [
// //     'CircleOfLifePersonalGrowth',
// //     'CircleOfLifeCareer',
// //     'CircleOfLifeValues',
// //     'CircleOfLifeLeisure',
// //     'CircleOfLifeHealth',
// //     'CircleOfLifeRelationships',
// //     'CircleOfLifeFinance',
// //     'CircleOfLifeSocialLife',
// //   ],
// // };

// // async function updateTestCategories() {
// //   try {
// //     await mongoose.connect(MONGO_URI);
// //     console.log('MongoDB connected');

// //     for (const [testName, categories] of Object.entries(testCategories)) {
// //       await Test.updateOne({ name: testName }, { category: categories });
// //       console.log(`Updated categories for ${testName}`);
// //     }
// //   } catch (err) {
// //     console.error('Error updating test categories:', err);
// //   } finally {
// //     mongoose.connection.close();
// //   }
// // }

// // updateTestCategories();
// require('dotenv').config();
// const mongoose = require('mongoose');
// const User = require('./models/User'); // Adjust the path as necessary

// async function resetUserType(userId) {
//   try {
//     console.log('Connecting to MongoDB...');
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');

//     // Find the user by _id and update the type field to an empty array
//     const result = await User.findByIdAndUpdate(
//       userId,
//       { type: [] },
//       { new: true },
//     );
//     if (result) {
//       console.log(`User type array reset for user with ID: ${userId}`);
//     } else {
//       console.log(`User with ID: ${userId} not found`);
//     }
//   } catch (error) {
//     console.error('Error resetting user type array:', error);
//   } finally {
//     // Close the connection
//     mongoose.connection.close();
//     console.log('MongoDB connection closed');
//   }
// }

// // Call the function with a valid user ID
// resetUserType('671e6877c25a8103e39c3bbf');
