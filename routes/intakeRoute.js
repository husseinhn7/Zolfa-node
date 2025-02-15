import express from "express"
import { getAllIntake, addIntake, deleteIntake, updateIntake } from "../controllers/intakeController.js"

import { authOnly } from "../middleware/protected.js"
const intakeRoute = express.Router()

/**
 * @swagger
 * tags:
 *   name: Intakes
 *   description: API for managing intakes.
 */

/**
 * @swagger
 * /api/intake:
 *   get:
 *     summary: Get all intakes.
 *     description: Retrieve a paginated list of intakes with their levels populated.
 *     tags: [Intakes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: A list of intakes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Intake'
 *                 total:
 *                   type: integer
 *                   description: Total number of intakes.
 *                 totalPages:
 *                   type: integer
 *                   description: Total pages.
 */

/**
 * @swagger
 * /api/intake:
 *   post:
 *     summary: Create a new intake.
 *     description: Adds a new intake to the database.
 *     tags: [Intakes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Intake'
 *     responses:
 *       200:
 *         description: Intake successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "created"
 *                 data:
 *                   $ref: '#/components/schemas/Intake'
 */

/**
 * @swagger
 * /api/intake/{id}:
 *   patch:
 *     summary: Update an intake.
 *     description: Updates an existing intake based on ID.
 *     tags: [Intakes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The intake ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Intake'
 *     responses:
 *       200:
 *         description: Intake successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "updated"
 *                 data:
 *                   $ref: '#/components/schemas/Intake'
 *       404:
 *         description: Intake not found.
 */

/**
 * @swagger
 * /api/intake/{id}:
 *   delete:
 *     summary: Delete an intake.
 *     description: Removes an intake from the database.
 *     tags: [Intakes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The intake ID.
 *     responses:
 *       200:
 *         description: Intake successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "deleted"
 *       404:
 *         description: Intake not found.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Intake:
 *       type: object
 *       required:
 *         - name
 *         - level
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the intake.
 *           example: "60d21b4667d0d8992e610c85"
 *         name:
 *           type: string
 *           description: Name of the intake.
 *           example: "Intake A"
 *         level:
 *           type: string
 *           description: ID of the associated level.
 *           example: "60d21b4667d0d8992e610c90"
 *         description:
 *           type: string
 *           description: Description of the intake.
 *           example: "This is the first intake for the year."
 *         telegramLinkMan:
 *           type: string
 *           description: Telegram link for male students.
 *           example: "https://t.me/groupMen"
 *         telegramLinkWoman:
 *           type: string
 *           description: Telegram link for female students.
 *           example: "https://t.me/groupWomen"
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Start date of the intake.
 *           example: "2024-12-01T09:00:00Z"
 */



intakeRoute
.get("/",getAllIntake )
.post("/",authOnly, addIntake)
.patch("/:id",authOnly, updateIntake)
.delete("/:id",authOnly, deleteIntake)






export default intakeRoute