// models/ExamResult.js
import mongoose from "mongoose";




const subjectSchema = mongoose.Schema({
  name: {
    type: String
  },
  level: {
    type: mongoose.Schema.ObjectId,
    ref: 'Level',
    required: true,
  }
});

const subjectModel = mongoose.model('Subject', subjectSchema);



export default subjectModel
