import mongoose from "mongoose";


const myDB = mongoose.connection.useDb('zolfa');



const examSchema = mongoose.Schema({
    title:{
        type : String, 
        required : true
    }, 
    creator :{
        type : mongoose.Schema.ObjectId,
        ref : "user"
    },
    startDate : {
        type : Date,
    }, 
    endDate: {
        type : Date,
    }, 
    final: {
        type :Boolean,
    },  
    subject: {
        type : String,
    }, 
    comment: {
        type : String,
    }, 
    questions : {
        type : [mongoose.Schema.ObjectId],
        ref : "questions"
    }

})







const questionsSchema = mongoose.Schema({
    question : {
        type : String,
    } ,
    options : {
        type : [
            {id: Number , option : String}
        ]
    },
    correctOption: {
        type : String
    } ,
    mark : {
        type : Number
    }
}) 


const Exam = myDB.model("exam", examSchema)

export const Questions = myDB.model("questions", questionsSchema)

export default Exam 
