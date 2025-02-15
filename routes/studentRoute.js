import express from "express"
import { getAllStudents, 
    addAdmin, 
    deleteStudent, 
    listAvailableExams, 
    getPastExamsForStudent, 
    getExamResultsForStudent 
} from "../controllers/studentController.js"

import { authOnly } from "../middleware/protected.js"
const studentRoute = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/student:
 *   get:
 *     summary: Get all students
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/student/{id}:
 *   patch:
 *     summary: Add admin
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of user permissions
 *     responses:
 *       200:
 *         description: Updated user
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/student/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
studentRoute.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.path);
    next();
  });


studentRoute
  .get("/next-exams", authOnly,  listAvailableExams)
  .get("/past-exams", authOnly,  getPastExamsForStudent)
  .get("/scores", authOnly, getExamResultsForStudent)
  .get("/", authOnly, getAllStudents)
  .patch("/:id", authOnly, addAdmin)
  .delete("/:id", authOnly, deleteStudent);







export default studentRoute