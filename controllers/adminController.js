import userModel from "../models/userModel.js";
import { catchError } from "../common/errorHandlers.js";
import { Response } from "../common/success.js";
import { ApiError } from "../common/errorHandlers.js";




export const getAllAdmins = catchError( async (req, res) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { name } = req.query;
    let filter = { role: "admin" };
    
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
    const totalCount = await userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
  
    const results = await userModel.find(filter).skip(skip).limit(limit)
  
    return Response(res, 200, "fetched data successfully" , {results, totalPages, totalCount})
})



export const deleteAdmin = async (req, res, next) =>{
    const { id }= req.params
    const admin = await userModel.findByIdAndDelete(id, 
        {
            new: true,
            runValidators: true,
        }
    )
     if(!admin){
            return next(ApiError.notFound("the admin not found "))
    }
    return Response(res, 200, "deleted successfully", {})
}

export const  addAdmin = async (req, res, next) =>{
    const permissions = req.body
    const { id } = req.params
    const admin = await userModel.findByIdAndUpdate(id, {role:"admin", permissions: permissions})
    if(!admin){
        return next(ApiError.notFound("the admin not found "))
    }
    return Response(res, 200, "admin added successfully", {})
} 

