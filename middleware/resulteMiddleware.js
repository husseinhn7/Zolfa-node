import Exam from "../models/examModel.js"
import ExamResult from "../models/resultsModel.js"
import { Questions } from "../models/examModel.js"
import { ApiError } from "../common/errorHandlers.js"


export const evaluateExam = async (req, res, next) =>{
    const { body, user } = req
    const result = await ExamResult.findOne({exam : body.exam, student: user._id})
 
    if (result ){ return next(ApiError.unauthorized("unauthorized")) }
    let fullMark = 0
    let totalMark = 0
    console.log(body)
    console.log(totalMark)
    for (const answer of body.answers){
        const question = await Questions.findById(answer.question).select("+correctOption");
        fullMark+= question.mark
        if (answer.answer == question.correctOption ){
            totalMark += question.mark
            console.log("==========================")

        }
        console.log(totalMark)

    }
    console.log(totalMark)

    req.body = {
        student: user._id,
        exam: body.exam,
        marks: totalMark,
        status: (totalMark / fullMark) > 0.5 ? "Passed" : "Failed"
    }
    next()
}
