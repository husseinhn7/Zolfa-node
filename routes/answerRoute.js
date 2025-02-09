import express from "express"
import { authOnly } from "../middleware/protected.js"
import { evaluateExam } from "../middleware/resulteMiddleware.js"
import { answerExam } from "../controllers/resulteController.js"

const answerRouter = express.Router()


/**
 * @swagger
 * /exam-results:
 *   post:
 *     summary: Submit exam results.
 *     description: Allows a student to submit their exam results, including marks and other details.
 *     tags:
 *       - Exam Results
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student
 *               - exam
 *               - marks
 *             properties:
 *               student:
 *                 type: string
 *                 description: ID of the student submitting the exam.
 *                 example: "60d21b4667d0d8992e610c85"
 *               exam:
 *                 type: string
 *                 description: ID of the exam being taken.
 *                 example: "60d21b4667d0d8992e610c99"
 *               marks:
 *                 type: number
 *                 description: Marks obtained by the student in the exam.
 *                 example: 85
 *               status:
 *                 type: string
 *                 description: Status of the exam (e.g., Passed, Failed).
 *                 example: "Passed"
 *               dateTaken:
 *                 type: string
 *                 format: date-time
 *                 description: Date when the exam was taken.
 *                 example: "2024-10-23T10:00:00Z"
 *     responses:
 *       201:
 *         description: Successfully submitted exam results.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     student:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     exam:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c99"
 *                     marks:
 *                       type: number
 *                       example: 85
 *                     status:
 *                       type: string
 *                       example: "Passed"
 *                     dateTaken:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-23T10:00:00Z"
 *       400:
 *         description: Bad request, missing required fields or invalid input.
 */


answerRouter
.post("/answer", authOnly, evaluateExam, answerExam )
 


export default answerRouter