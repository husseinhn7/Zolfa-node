export const Response = (res, status, msg, data) =>{
    res
    .status(status)
    .json({
        message: msg,
        data:data
    })

}