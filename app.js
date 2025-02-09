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

app.use("/api/auth/",authRouter)
app.use("/api", examRouter)
app.use("/api", answerRouter)
app.use("*", (req, res)=>{
    res.status(404).send({ msg : `${req.url } not found`})
})

export default app