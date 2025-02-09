// import { Router } from "express";
import express from "express";
import { register, forgetPassword, restPassword, login } from "../controllers/authController.js";
// import { authOnly } from "../middleware/protected.js"

const authRouter = express.Router()


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user.
 *     description: Creates a new user in the system by providing the required user details in the request body.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user.
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the user.
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: strongpassword123
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the password.
 *                 example: strongpassword123
 *               gender:
 *                 type: string
 *                 description: Gender of the user.
 *                 example: male
 *               role:
 *                 type: string
 *                 description: Role of the user.
 *                 example: admin
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: The user's birth date.
 *                 example: 1990-01-01
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                 user:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     gender:
 *                       type: string
 *                       example: male
 *                     role:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: Bad request, missing or invalid fields.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login.
 *     description: Logs in a user with their email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       403:
 *         description: Missing email or password.
 *       404:
 *         description: Incorrect email or password.
 */


/**
 * @swagger
 * /api/auth/forget-password:
 *   post:
 *     summary: Forget password.
 *     description: Sends a password reset token to the user's email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Reset token successfully generated and sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restToken:
 *                   type: string
 *                   example: 7a78d9c4e32b7654321ab345
 *       404:
 *         description: User not found.
 */


/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password.
 *     description: Resets a user's password using the provided reset token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *               - confirmPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: The password reset token.
 *                 example: 7a78d9c4e32b7654321ab345
 *               password:
 *                 type: string
 *                 description: The new password.
 *                 example: newpassword123
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm the new password.
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password successfully reset.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       404:
 *         description: Reset token is invalid or expired.
 */


authRouter
.post("/register", register)
.post("/login", login)
.post("/forgotPassword", forgetPassword)
.post("/restPassword", restPassword)





export default authRouter