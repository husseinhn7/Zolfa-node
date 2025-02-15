import ExamResult from "../../models/resultsModel"
import paginate from "../../common/pagination"
import { catchError } from "../../common/errorHandlers"
import { Response } from "../../common/success"





export const getAllResults =catchError( async (req, res) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const totalCount = await model.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
  
    const results = await model.find(query).skip(skip).limit(limit)
    .populate({
        "path" : "student",
        "select" : "firstName lastName"
    });
  
    // const query = req.query
    // const results = await paginate(req, results, query)
    return Response(res, 200, "fetched data successfully" , results)
})


