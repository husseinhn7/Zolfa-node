 import Exam,  { Questions }  from "../models/examModel.js";
import { ApiError } from "../common/errorHandlers.js";
import { Response } from "../common/success.js";
import paginate from "../common/pagination.js";

 
export const createExam = async (req, res) =>{
    const { body, user } = req
    const { questions } = body
    const ques = await Questions.insertMany(questions)    
    const newExam = await Exam.create({...body, questions : ques}) 
    res.status(200).json({msg : "done", exam : newExam})
 }

export const deleteExam = async (req, res, next) =>{
    const {id} = req.params
    const deletedExam = await Exam.findByIdAndDelete(id)
    if(!deletedExam){
        return next(ApiError.notFound("the exam not found "))
    }
    return Response(res, 200, "deleted successfully", {})
}

export const  listExams = async (req, res, next) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit;

    const { title, subject } = req.query;  

    const filter = {};  

    if (title) {
        filter.title = new RegExp(title, "i"); 
    }

    if (subject) {
        filter.subject = subject;  
    }
     const totalCount = await Exam.countDocuments(filter);
    const totalPages = limit > 0 ? Math.ceil(totalCount / limit) : 1;

    const results = await Exam.find(filter)
        .skip(skip)
        .limit(limit)
        .select("-questions")
        .populate({
            path: "creator",
            select: "firstName lastName"
        })
        .populate({
            path: "subject",
            select: "name"
        });

    return Response(res, 200, "Exams fetched successfully", {
        data: results,
        total: totalCount,
        totalPages
    });

}


export const getExam = async (req, res, next) =>{
    const { examId } = req.params
    console.log(examId)
    const exam = await Exam.findById(examId).populate({
        path : "questions",
    }).populate({
        path :"subject", 
        select : "name"
    })
    console.log(exam)
    if (!exam){
        return next(ApiError.notFound("exam not found"))
    }
    if ( exam.endDate < Date.now()){
        return next(ApiError.forbidden("this exam is not available"))
    }
    return Response(res, 200, "fetched data ", exam)

}