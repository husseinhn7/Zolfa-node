import { Response } from "../common/success.js";
import paginate from "../common/pagination.js";
import { ApiError } from "../common/errorHandlers.js";
import subjectModel from "../models/subjectModel.js";

export const getAllSubjects = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * limit;
    const query = req.query
    const { name, level } = req.query;  

    const filter = {};  

    if (name) {
        filter.name = new RegExp(name, "i"); 
    }

    if (level) {
        filter.level = level;  
    }
    const totalCount = await subjectModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
  
    const results = await subjectModel.find(filter)
        .skip(skip).limit(limit)
        .populate({
            path : "level",
            select : 'name'
        })
   
  
    const subject =  {
      data: results,
        total: totalCount,
        totalPages,
    };
    return Response(res, 200, "fetched", subject)
};

export const updateSubject = async (req, res, next) => {
    const { id } = req.params;
    const updatedSubject = await subjectModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedSubject) {
        return next(ApiError.notFound("Subject not found"));
    }
    return Response(res, 200, "updated", updatedSubject);
};

export const deleteSubject = async (req, res, next) => {
    const { id } = req.params;
    const deletedSubject = await subjectModel.findByIdAndDelete(id);

    if (!deletedSubject) {
        return next(ApiError.notFound("Subject not found"));
    }
    return Response(res, 200, "deleted", {});
};

export const addSubject = async (req, res, next) => {
    const subject = await subjectModel.create(req.body);
    return Response(res, 200, "created", subject);
};
