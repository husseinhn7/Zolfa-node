// models/ExamResult.js
import mongoose from "mongoose";




const levelSchema = mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: Boolean,  
   },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const levelModel = mongoose.model('Level', levelSchema);



export default levelModel
