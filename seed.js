
const MONGO_URI = "mongodb://127.0.0.1:27017/zolfa?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2"; // Replace with your MongoDB URI
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import userModel from './models/userModel.js';
import levelModel from './models/levelModel.js';
import intakeModel from './models/intakeModel.js';
import subjectModel from './models/subjectModel.js';
import Exam from './models/examModel.js';
import ExamResult from './models/resultsModel.js';
import { Questions } from "./models/examModel.js";


console.log("satrt+++++++++++++++++++++")
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];


mongoose.connect(MONGO_URI);
console.log("--------------")
const generateData = async () => {
  try {
    console.log("// Clear existing data")
    await userModel.deleteMany();
    await levelModel.deleteMany();
    await intakeModel.deleteMany();
    await subjectModel.deleteMany();
    await Exam.deleteMany();
    await ExamResult.deleteMany();
    await Questions.deleteMany();

    console.log("// Create levelModels")
    const levels = await levelModel.insertMany(
      Array.from({ length: 5 }, () => ({
        name: faker.commerce.department(),
        status: faker.datatype.boolean(),
        startDate: faker.date.past(),
        endDate: faker.date.future(),
      }))
    );

    console.log("// Create intakeModels")
    const intakes = await intakeModel.insertMany(
      Array.from({ length: 5 }, () => ({
        name: faker.company.name(),
        level: levels[Math.floor(Math.random() * levels.length)]._id,
        description: faker.lorem.sentence(),
        startDate: faker.date.past(),
        endDate: faker.date.future(),
      }))
    );

    console.log("// Create userModels")
    const users = await userModel.insertMany(
      Array.from({ length: 50 }, () => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "11111111",
        confirmPassword : "11111111" ,
        gender: getRandomElement(['Male', 'Female']),
        level: levels[Math.floor(Math.random() * levels.length)]._id,
        intake: intakes[Math.floor(Math.random() * intakes.length)]._id,
        role: 'student',
      }))
    );
//{validateBeforeSave : false}
    console.log("// Create subjectModels")
    const subjects = await subjectModel.insertMany(
      Array.from({ length: 10 }, () => ({
        name: faker.commerce.productName(),
        level: levels[Math.floor(Math.random() * levels.length)]._id,
      }))
    );

    console.log("// Create Exams")
    const exams = await Exam.insertMany(
      Array.from({ length: 50 }, () => ({
        title: faker.lorem.words(3),
        creator: users[Math.floor(Math.random() * users.length)]._id,
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        final: faker.datatype.boolean(),
        subject: subjects[Math.floor(Math.random() * subjects.length)]._id,
        duration: faker.number.int({ min: 30, max: 180 }),
      }))
    );

    console.log("  // Create Questions")
    const questions = await Questions.insertMany(
      Array.from({ length: 100 }, () => ({
        question: faker.lorem.sentence(),
        options: [
          { id: 1, option: faker.lorem.word() },
          { id: 2, option: faker.lorem.word() },
          { id: 3, option: faker.lorem.word() },
          { id: 4, option: faker.lorem.word() },
        ],
        correctOption: getRandomElement(['1', '2', '3', '4']),
        mark: faker.number.int({ min: 1, max: 10 }),
      }))
    );

    console.log("// Assign questions to exams")
    await Promise.all(
      exams.map(async (exam) => {
        exam.questions = faker.helpers.shuffle(questions.map(q => q._id)).slice(0, 5);
        await exam.save({validateBeforeSave : false});
      })
    );

    console.log(" // Create Exam Results")
    await ExamResult.insertMany(
      Array.from({ length: 50 }, () => ({
        student: users[Math.floor(Math.random() * users.length)]._id,
        exam: exams[Math.floor(Math.random() * exams.length)]._id,
        marks: faker.number.int({ min: 0, max: 100 }),
        status: getRandomElement(['Pending', 'Passed', 'Failed']),
        dateTaken: faker.date.past(),
      }))
    );

    console.log('Dummy data inserted successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};

await generateData()
