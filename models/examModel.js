import mongoose from "mongoose";





const examSchema = mongoose.Schema({
    title:{
        type : String, 
        required : true
    }, 
    creator :{
        type : mongoose.Schema.ObjectId,
        ref : "User"
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
        type : mongoose.Schema.ObjectId,
        ref : "Subject"
    }, 
    comment: {
        type : String,
    }, 
    questions : {
        type : [mongoose.Schema.ObjectId],
        ref : "Questions"
    },
    duration: {
        type: Number, 
        required: true
    },

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
        type : String,
        select : false
    } ,
    mark : {
        type : Number
    }
}) 


const Exam = mongoose.model("Exam", examSchema)

export const Questions = mongoose.model("Questions", questionsSchema)

export default Exam 
