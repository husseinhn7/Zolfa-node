import express from "express"
import { getAllLevels, addLevel, deleteLevel, updateLevel } from "../controllers/levelController.js"
import { authOnly } from "../middleware/protected.js"

const levelRoute = express.Router()


/**
 * @swagger
 * tags:
 *   name: Levels
 *   description: API for managing levels.
 */

/**
 * @swagger
 * /api/level:
 *   get:
 *     summary: Get all levels.
 *     description: Retrieve a paginated list of levels.
 *     tags: [Levels]
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
 *         description: A list of levels.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Level'
 *                 total:
 *                   type: integer
 *                   description: Total number of levels.
 *                 totalPages:
 *                   type: integer
 *                   description: Total pages.
 */

/**
 * @swagger
 * /api/level:
 *   post:
 *     summary: Create a new level.
 *     description: Adds a new level to the database.
 *     tags: [Levels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Level'
 *     responses:
 *       200:
 *         description: Level successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "created"
 *                 data:
 *                   $ref: '#/components/schemas/Level'
 */

/**
 * @swagger
 * /api/level/{id}:
 *   patch:
 *     summary: Update a level.
 *     description: Updates an existing level based on ID.
 *     tags: [Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The level ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Level'
 *     responses:
 *       200:
 *         description: Level successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "updated"
 *                 data:
 *                   $ref: '#/components/schemas/Level'
 *       404:
 *         description: Level not found.
 */

/**
 * @swagger
 * /api/level/{id}:
 *   delete:
 *     summary: Delete a level.
 *     description: Removes a level from the database.
 *     tags: [Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The level ID.
 *     responses:
 *       200:
 *         description: Level successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "deleted"
 *       404:
 *         description: Level not found.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Level:
 *       type: object
 *       required:
 *         - name
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the level.
 *           example: "60d21b4667d0d8992e610c91"
 *         name:
 *           type: string
 *           description: Name of the level.
 *           example: "Beginner Level"
 *         status:
 *           type: boolean
 *           description: Status of the level (active/inactive).
 *           example: true
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Start date of the level.
 *           example: "2024-01-15T00:00:00Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: End date of the level.
 *           example: "2024-06-15T00:00:00Z"
 */



levelRoute
.get("/",getAllLevels )
.post("/",authOnly, addLevel)
.patch("/:id",authOnly, updateLevel)
.delete("/:id",authOnly, deleteLevel)






export default levelRoute