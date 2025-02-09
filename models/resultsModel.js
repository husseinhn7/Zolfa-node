// models/ExamResult.js
import mongoose from "mongoose";

const myDB = mongoose.connection.useDb('zolfa');



const examResultSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',  
    required: true,
  },
  exam: {
    type: mongoose.Schema.ObjectId,
    ref: 'exam',
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  status: {
    type: String,  
   },
  dateTaken: {
    type: Date,
    default: Date.now,
  },
});

const ExamResult = myDB.model('examResult', examResultSchema);



export default ExamResult
