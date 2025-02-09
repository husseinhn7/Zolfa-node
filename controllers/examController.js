 import Exam,  { Questions }  from "../models/examModel.js";



 
export const createExam = async (req, res) =>{
    const { body, user } = req
    const { questions } = body
    const ques = await Questions.insertMany(questions)    
    const newExam = await Exam.create({...body, questions : ques}) 
    res.status(200).json({msg : "done", exam : newExam})
 }



export const getExam = async (req, res) =>{
    const { examId } = req.params
    const exam = await Exam.findById(examId).populate({
        path : "questions",
    })
    if (exam && exam.endDate > Date.now()){

    }
    res.json({exam : exam})
}