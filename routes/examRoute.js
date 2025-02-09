import express from "express"
import { createExam, getExam } from "../controllers/examController.js"
import { authOnly } from "../middleware/protected.js"
import { canEditExam } from "../middleware/examMiddelware.js"


const examRouter = express.Router()

/**
 * @swagger
 * /exams:
 *   post:
 *     summary: Create a new exam.
 *     description: Creates a new exam with the provided questions and other details.
 *     tags:
 *       - Exams
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the exam.
 *                 example: "Math Final Exam"
 *               creator:
 *                 type: string
 *                 description: ID of the user who created the exam.
 *                 example: "60d21b4667d0d8992e610c85"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date and time of the exam.
 *                 example: "2024-12-01T09:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: End date and time of the exam.
 *                 example: "2024-12-01T11:00:00Z"
 *               final:
 *                 type: boolean
 *                 description: Indicates if the exam is final.
 *                 example: true
 *               subject:
 *                 type: string
 *                 description: Subject of the exam.
 *                 example: "Mathematics"
 *               comment:
 *                 type: string
 *                 description: Additional comments regarding the exam.
 *                 example: "This is a multiple-choice exam."
 *               questions:
 *                 type: array
 *                 description: Array of questions for the exam.
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       description: The question text.
 *                       example: "What is 2 + 2?"
 *                     options:
 *                       type: array
 *                       description: Possible answers for the question.
 *                       items:
 *                         type: string
 *                         example: "4"
 *                     correctOption:
 *                       type: string
 *                       description: The correct answer.
 *                       example: "4"
 *                     mark:
 *                       type: number
 *                       description: Marks assigned to the question.
 *                       example: 5
 *     responses:
 *       200:
 *         description: Exam successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "done"
 *                 exam:
 *                   type: object
 *                   description: The newly created exam object.
 *       400:
 *         description: Invalid input or missing required fields.
 */



/**
 * @swagger
 * /exams/{examId}:
 *   get:
 *     summary: Get exam details.
 *     description: Retrieves details of a specific exam by its ID, including the questions.
 *     tags:
 *       - Exams
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam to retrieve.
 *         example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Successfully retrieved exam details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exam:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Math Final Exam"
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T09:00:00Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T11:00:00Z"
 *                     final:
 *                       type: boolean
 *                       example: true
 *                     subject:
 *                       type: string
 *                       example: "Mathematics"
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           question:
 *                             type: string
 *                             example: "What is 2 + 2?"
 *                           options:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "4"
 *                           correctOption:
 *                             type: string
 *                             example: "4"
 *                           mark:
 *                             type: number
 *                             example: 5
 *       404:
 *         description: Exam not found.
 */



examRouter
.post("/exam", authOnly, canEditExam, createExam)
.get("/exam/:examId", authOnly, getExam)



export default examRouter