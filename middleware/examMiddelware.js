







export const canEditExam = async (req, res, next)=>{
    const { user } = req
    console.log(user)
    console.log(user.permissions)
    if (!user.permissions.includes("exam")) return res.json({msg: "un auth action"})
    next()
}