// models/ExamResult.js
import mongoose from "mongoose";




const examResultSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',  
    required: true,
  },
  exam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Exam',
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
   status: {
    type: String,
    enum: ["Pending", "Passed", "Failed"],  
    default: "Pending"
  },
  dateTaken: {
    type: Date,
    default: Date.now,
  },
});

const ExamResult = mongoose.model('ExamResult', examResultSchema);



export default ExamResult
