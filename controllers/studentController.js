import userModel from "../models/userModel.js";
import { catchError } from "../common/errorHandlers.js";
import { Response } from "../common/success.js";
import { ApiError } from "../common/errorHandlers.js";
import ExamResult from "../models/resultsModel.js";

import Exam from "../models/examModel.js";

export const getAllStudents = catchError( async (req, res) =>{
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { name, intake, level } = req.query;
    let filter = { role: "student" };
    
    // Handle name filtering (first or last name or both)
    if (name) {
        const nameParts = name.trim().split(/\s+/);
        if (nameParts.length === 1) {
            // If only one word is provided, search in first or last name
            filter.$or = [
                { firstName: new RegExp(`^${nameParts[0]}`, "i") },
                { lastName: new RegExp(`^${nameParts[0]}`, "i") }
            ];
        } else if (nameParts.length === 2) {
            // If two words are provided, search for exact first and last name
            filter.firstName = new RegExp(`^${nameParts[0]}`, "i");
            filter.lastName = new RegExp(`^${nameParts[1]}`, "i");
        }
    }
    
    // Handle intake and level filtering
    if (intake) filter.intake = intake;
    if (level) filter.level = level;
    
    // Get total count for pagination
    const totalCount = await userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
    
    // Fetch students with filters and pagination
    const results = await userModel.find(filter)
        .skip(skip)
        .limit(limit)
        .populate("level", "name")
        .populate("intake", "name");
    
    return Response(res, 200, "Fetched data successfully", { results, totalPages, totalCount });
    
})



export const deleteStudent = async (req, res, next) =>{
    const { id }= req.params
    const student = await userModel.findByIdAndDelete(id, 
        {
            new: true,
            runValidators: true,
        }
    )
     if(!student){
            return next(ApiError.notFound("the student not found "))
    }
    return Response(res, 200, "deleted successfully", {})
}

export const  addAdmin = async (req, res, next) =>{
    const permissions = req.body
    const { id } = req.params
    const student = await userModel.findByIdAndUpdate(id, {role:"admin", permissions: permissions})
    if(!student){
        return next(ApiError.notFound("the student not found "))
    }
    return Response(res, 200, "admin added successfully", {})
} 






export const listAvailableExams = catchError(async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const userId = req.user._id;  
        const takenExams = await ExamResult.find({ student: userId }).select("exam");
        const takenExamIds = takenExams.map(result => result.exam);
        const filter = {
            _id: { $nin: takenExamIds },  
             $or: [
                { startDate: { $exists: false } },  
                { startDate: { $lte: new Date() } }  
            ],
            $or: [
                { endDate: { $exists: false } },  
                { endDate: { $gte: new Date() } }   
            ]
        }
        const totalCount = await Exam.countDocuments(filter);

        const availableExams = await Exam.find(filter).populate("subject", "name").skip(skip).limit(limit);
        const totalPages = Math.ceil(totalCount / limit);

        return Response(res, 200, "Fetched data successfully", { availableExams, totalPages, totalCount });
    })

    export const getPastExamsForStudent = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const studentId = req.user._id;
    
            const filter = { student: studentId };
            const totalCount = await ExamResult.countDocuments(filter);
            const pastExams = await ExamResult.find(filter)
                .populate({
                    path: "exam",
                    // match: { endDate: { $lt: new Date() } },  
                    populate: { path: "subject", select: "name" },  
                    select : "title subject"
                }).populate({
                    path : "exam.subject",
                    select : "name"
                })
                .select("exam dateTaken")
                .skip(skip)
                .limit(limit);
    console.log(pastExams)
            if (!pastExams.length) {
                return Response(res, 200, "No past exam results found.", { pastExams: [], totalPages: 0, totalCount: 0 });
            }
    
            const totalPages = Math.ceil(totalCount / limit);
            return Response(res, 200, "Fetched past exams successfully", { pastExams, totalPages, totalCount });
        } catch (error) {
            console.error("Error fetching past exams:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    
    export const getExamResultsForStudent = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const studentId = req.user._id;
    
            const filter = { student: studentId };
            const totalCount = await ExamResult.countDocuments(filter);
            const results = await ExamResult.find(filter)
                .populate({
                    path: "exam",
                    select: "title startDate endDate subject",
                    populate: { path: "subject", select: "name" }
                })
                .select("exam marks status dateTaken")
                .skip(skip)
                .limit(limit);
    
            if (!results.length) {
                return Response(res, 200, "No exam results found for this student.", { results: [], totalPages: 0, totalCount: 0 });
            }
    
            const totalPages = Math.ceil(totalCount / limit);
            return Response(res, 200, "Fetched exam results successfully", { results, totalPages, totalCount });
        } catch (error) {
            console.error("Error fetching exam results:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    