import { Response } from "../common/success.js";
import { ApiError } from "../common/errorHandlers.js";
import intakeModel from "../models/intakeModel.js";
 

export const getAllIntake = async (req, res, next) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * limit;
     const { name, level } = req.query;  

    const filter = {};  

    if (name) {
        filter.name = new RegExp(name, "i"); 
    }

    if (level) {
        filter.level = level;  
    }
    const totalCount = await intakeModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
  
    const results = await intakeModel.find(filter)
        .skip(skip).limit(limit)
    .populate({
        path : "level", 
        select : "name"
    });
  
    const intake =  {
      data: results,
        total: totalCount,
        totalPages,
    };
    return Response(res, 200, "fetched", intake)
}


 
export const updateIntake = async (req, res, next) =>{
    const {id} = req.params
    const intake = await intakeModel.findByIdAndUpdate(id, req.body, 
        {
            new: true,
            runValidators: true,
        }
        
    )
    if (!intake){
        return next(ApiError.notFound("Intake not found"))
    }
    return Response(res, 200, "updated", intake)
}


export const deleteIntake = async (req, res, next) =>{
    const {id} = req.params
    const intake = await intakeModel.findByIdAndDelete(id, req.body, 
        {
            new: true,
            runValidators: true,
        }
    )
    if (!intake){
        return next(ApiError.notFound("Intake not found"))
    }
    return Response(res, 200, "deleted", {})
}


export const addIntake = async (req, res, next) =>{
    const Intake = await intakeModel.create(req.body)
    return Response(res, 200, "created", Intake)
}