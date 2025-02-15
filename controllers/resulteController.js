import { Response } from "../common/success.js"
import ExamResult from "../models/resultsModel.js"
import { catchError } from "../common/errorHandlers.js"
import userModel from "../models/userModel.js"

 

export const getAllResults = catchError( async (req, res) =>{
    const { page = 1, limit = 10, exam, name } = req.query;

    let filter = {};
    if (exam) filter.exam = exam;

         if (name) {
            const nameParts = name.trim().split(/\s+/);  
            let searchConditions = [];

            if (nameParts.length === 1) {
                searchConditions = [
                    { firstName: new RegExp(`^${nameParts[0]}`, "i") },  
                    { lastName: new RegExp(`^${nameParts[0]}`, "i") }    
                ];
            } else if (nameParts.length === 2) {
                 searchConditions = [
                    { firstName: new RegExp(`^${nameParts[0]}`, "i"), lastName: new RegExp(`^${nameParts[1]}`, "i") }
                ];
            } else {
                 searchConditions = [
                    { firstName: new RegExp(`^${nameParts[0]}`, "i"), lastName: new RegExp(`^${nameParts.slice(1).join(" ")}`, "i") }
                ];
            }

            const students = await userModel.find({ $or: searchConditions }).select("_id");
            const studentIds = students.map(student => student._id);
            if (studentIds.length > 0) {
                filter.student = { $in: studentIds };
            } else {
                return Response(res, 200, "Fetched data successfully", {
                    results: [],
                    totalPages: 0,
                    totalCount: 0
                });
            }
        }

        const results = await ExamResult.find(filter)
            .populate("student", "firstName lastName personalImage")
            .populate("exam", "title")
            .sort({ dateTaken: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalCount = await ExamResult.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);

        return Response(res, 200, "Fetched data successfully", {
            results,
            totalPages,
            totalCount
        });
        
    
    
})


export const getMyExams = catchError(async (req, res, nex) =>{
        const id = req.user._id
        const query  = req.query
        query._id = id
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        const totalCount = await ExamResult.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);
    
        const results = await ExamResult.find(query).skip(skip).limit(limit)
        .populate({
            "path" : "Exam ",
            "select" : "title subject"
        }).populate({
            path : "exam.subject",
            select : "name"
        });
    
        return Response(res, 200, "fetched data successfully" ,  {results, totalPages, totalCount})
} )


export const answerExam = async (req, res) =>{
    const { body } = req
    const result = await ExamResult.create(body)
    res.status(201).json({result : result })
}