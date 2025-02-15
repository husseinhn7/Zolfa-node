import express from "express"
import { getAllAdmins, addAdmin, deleteAdmin } from "../controllers/adminController.js"
import { authOnly } from "../middleware/protected.js"

const adminRoute = express.Router()

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Get all admins
 *     tags: [Admins]
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
 *         description: List of admins
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
 * /api/admin/{id}:
 *   patch:
 *     summary: Add admin
 *     tags: [Admins]
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
 * /api/admin/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admins]
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




adminRoute
.get("/",authOnly, getAllAdmins )
.patch("/:id",authOnly,  addAdmin)
.delete("/:id",authOnly,  deleteAdmin)






export default adminRoute