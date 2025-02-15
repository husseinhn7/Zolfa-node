import mongoose from "mongoose";
import User from "./models/userModel.js"; // Adjust the path accordingly

const MONGO_URI = "mongodb://127.0.0.1:27017/zolfa?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2";
const INTAKE_ID = "67a9dcc3b0f0f134b8c4f978";
const LEVEL_ID = "67a976405ee58b21870f4069";

const generateUsers = () => {
    const users = [];
    
    for (let i = 1; i <= 40; i++) {
        users.push({
            firstName: `Student${i}`,
            lastName: `User${i}`,
            email: `student${i}@example.com`,
            password: "12345678",
            confirmPassword: "12345678",
            gender: i % 2 === 0 ? "Male" : "Female",
            level: LEVEL_ID,
            intake: INTAKE_ID,
            role: "student",
            joiningDate: new Date(),
            birthDate: new Date(2000, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
            personalImage: "/images/blank.webp",
            emailConfirmed: false,
            permissions: [],
        });
    }
    return users;
};

const insertUsers = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        await User.deleteMany({ role: "student" }); // Remove existing student users
        console.log("Old student records deleted");

        const users = generateUsers();
        await User.insertMany(users);
        console.log("40 Students inserted successfully");
    } catch (error) {
        console.error("Error inserting students:", error);
    } finally {
        mongoose.connection.close();
    }
};

insertUsers();





// import mongoose from "mongoose";
// import ExamResult from "./models/resultsModel.js";
// const MONGO_URI = "mongodb://127.0.0.1:27017/zolfa?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2";

// // Given student and exam IDs
// const STUDENT_IDS = [
//     "67a9f97b4085d3f81fcf5f12",
//     "67a9f97b4085d3f81fcf5f13",
//     "67a9f97b4085d3f81fcf5f14"
// ];

// const EXAM_IDS = [
//     "67aa916bf8126f1a7963828b",
//     "67aa916bf8126f1a796382aa",
//     "67aa916bf8126f1a796382c9"
// ];

// const generateRandomResults = async () => {
//     try {
//         await mongoose.connect(MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to MongoDB");

//         const results = [];

//         for (let i = 0; i < 15; i++) { // Insert 15 results
//             const student = STUDENT_IDS[Math.floor(Math.random() * STUDENT_IDS.length)];
//             const exam = EXAM_IDS[Math.floor(Math.random() * EXAM_IDS.length)];
//             const marks = Math.floor(Math.random() * 100) + 1; // Random marks between 1 and 100
//             const status = marks >= 50 ? "Passed" : "Failed"; // Pass if marks >= 50

//             results.push({
//                 student,
//                 exam,
//                 marks,
//                 status,
//                 dateTaken: new Date()
//             });
//         }

//         await ExamResult.insertMany(results);
//         console.log("✅ 15 Exam Results inserted successfully!");
//     } catch (error) {
//         console.error("❌ Error inserting exam results:", error);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// generateRandomResults();
