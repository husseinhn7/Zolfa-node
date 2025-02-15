import express from "express";
import dotenv from "dotenv"
dotenv.config({path : "./env.conf"})
import morgan from "morgan"
import cors from "cors"
import { networkInterfaces } from "os";
import authRouter from "./routes/authRoute.js";
import examRouter from "./routes/examRoute.js";
import answerRouter from "./routes/answerRoute.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { globalErrorHandler } from "./common/errorHandlers.js";
import intakeRoute from "./routes/intakeRoute.js";
import levelRoute from "./routes/levelRoute.js";
import studentRoute from "./routes/studentRoute.js";
import subjectRoute from "./routes/subjectRoute.js";
import uploadRouter from "./routes/uploads.js";
import adminRoute from "./routes/adminRoute.js";



const HOST = networkInterfaces()['Wi-Fi'][1].address


const app = express()


app.use(express.json({limit: '50mb'}))
app.use(morgan("dev"))
app.use(express.static("public"))
app.use(cors({
    origin :["*",  "http://localhost:3000", `http://${HOST}:3000`]
}))


const swaggerOptions = {
   
    definition: {
        openapi: "3.0.0",
        info : { 
        title :  "swagger docs for zolfa backend",
        version : "3.0.0"
    },
    
    },
apis : ["./routes/*.js"]
}

app.use("/api-docs", serve, setup(swaggerJSDoc(swaggerOptions)))

app.use("/api/auth/",  authRouter)
app.use("/api/intake", intakeRoute)
app.use("/api/level", levelRoute)
app.use("/api/subject", subjectRoute)
app.use("/api/student", studentRoute)
app.use("/api/upload", uploadRouter)
app.use("/api/admin", adminRoute)




app.use("/api/exam", examRouter)
app.use("/api/answer", answerRouter)
app.use(globalErrorHandler)

app.use("*", (req, res)=>{
    res.status(404).send({ msg : `${req.url } not found`})
})

export default app