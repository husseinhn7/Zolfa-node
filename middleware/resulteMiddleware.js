import Exam from "../models/examModel.js"
import ExamResult from "../models/resultsModel.js"
import { Questions } from "../models/examModel.js"



export const evaluateExam = async (req, res, next) =>{
    const { body, user } = req
    const result = await ExamResult.find({exam : body.exam, student: user._id})
 
    if (result ){ return res.status(403).json({msg:"unath"}) }
    let totalMark = 0
    for (const answer of body.answers){
        const question = await Questions.findById(answer.question);
        if (answer.selectedAnswer == question.correctOption ){
            totalMark += question.mark
        }
    }
    req.body = {
        student: user._id,
        exam: body.exam,
        marks: totalMark,
        status: "done"
    }
    next()
}


// export const 