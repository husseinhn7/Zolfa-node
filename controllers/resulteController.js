import ExamResult from "../models/resultsModel.js";




export const answerExam = async (req, res) =>{
    const { body } = req
    const result = await ExamResult.create(body)
    res.status(201).json({result : result })
}