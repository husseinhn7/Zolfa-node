 
const paginate = async (req, model, query = {}) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const totalCount = await model.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
  
    const results = await model.find(query).skip(skip).limit(limit);
  
    return {
      data: results,
        total: totalCount,
        totalPages,
    };
  };
  
export default paginate;
  