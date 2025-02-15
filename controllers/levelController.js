import levelModel from "../models/levelModel.js";
import { Response } from "../common/success.js";
import paginate from "../common/pagination.js";
import { ApiError } from "../common/errorHandlers.js";




export const getAllLevels = async (req, res, next) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * limit;
    const query = req.query
    const filter = {}
    const {name} = req.query
    if (name) {
        filter.name = new RegExp(name, "i"); 
    }
    const totalCount = await levelModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
  
    const results = await levelModel.find(filter)
        .skip(skip).limit(limit)
   
  
    const levels =  {
      data: results,
        total: totalCount,
        totalPages,
    };
    return Response(res, 200, "fetched", levels)
}


 
export const updateLevel = async (req, res, next) =>{
    const { id }= req.params
    const updatedLevel = await levelModel.findByIdAndUpdate(id, req.body, 
        {
            new: true,
            runValidators: true,
        }
    )
    if (!updatedLevel){
        return next(ApiError.notFound("level not found"))
    }
    return Response(res, 200, "updated", updatedLevel)
}


export const deleteLevel = async (req, res, next) =>{
    const { id }= req.params
    const updatedLevel = await levelModel.findByIdAndDelete(id, req.body, 
        {
            new: true,
            runValidators: true,
        }
    )
    if (!updatedLevel){
        return next(ApiError.notFound("level not found"))
    }
    return Response(res, 200, "deleted", {})
}


export const addLevel = async (req, res, next) =>{
    const level = await levelModel.create(req.body)
    return Response(res, 200, "created", level)
}