// models/ExamResult.js
import mongoose from "mongoose";




const intakeSchema = mongoose.Schema({
    name: {
        type: String,  
    },
    level: {
        type: mongoose.Schema.ObjectId,
        ref: 'Level',
        required: true,
     },
    description: {
        type: String,  
    },
    telegramLinkMan: {
        type: String,  
    },
    telegramLinkWoman: {
        type: String,  
    },
    startDate: {
         type: Date,
  },
  endDate: {
    type: Date,
},
});

const intakeModel = mongoose.model('Intake', intakeSchema);



export default intakeModel
