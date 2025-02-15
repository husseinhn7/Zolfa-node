import express from "express"
import { authOnly } from "../middleware/protected.js"
import { evaluateExam } from "../middleware/resulteMiddleware.js"
import { answerExam, getAllResults } from "../controllers/resulteController.js"

const answerRouter = express.Router()


/**
 * @swagger
 * /api/exam-results:
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



/**
 * @swagger
 * /api/answer:
 *   get:
 *     summary: Get all exam results with pagination and filtering
 *     description: Retrieve a list of exam results with optional filters for exam and student.
 *     tags:
 *       - Exam Results
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page.
 *       - in: query
 *         name: exam
 *         schema:
 *           type: string
 *         description: Filter results by exam ID.
 *       - in: query
 *         name: student
 *         schema:
 *           type: string
 *         description: Filter results by student ID.
 *     responses:
 *       200:
 *         description: A list of exam results.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 totalResults:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67a99f1660110af67f31a8c8"
 *                       student:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "67a98fb19e60aebabab379dd"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                           email:
 *                             type: string
 *                             example: "john@example.com"
 *                       exam:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "67a9995668110af67f31a8c8"
 *                           title:
 *                             type: string
 *                             example: "Mathematics Exam"
 *                       marks:
 *                         type: integer
 *                         example: 85
 *                       status:
 *                         type: string
 *                         example: "Passed"
 *                       dateTaken:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-02-10T14:30:00.000Z"
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 */

answerRouter
.post("/", authOnly, evaluateExam, answerExam )
.get("/",authOnly, getAllResults)
 



export default answerRouter