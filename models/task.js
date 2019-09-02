const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({

   _id: mongoose.Schema.Types.ObjectId,
   name : {
       type: String,
       required: true
   },
    due:{
       type: Date,
        required: true
    },
    status:{
       type: String,
        validate: {
           validator: function(statusVal){
               return statusVal === "Complete" || statusVal === "inProgress";
           }
        },
        required: true
    },
    desc:{
      type: String,
      required: true
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    }
});

module.exports = mongoose.model('Task', taskSchema);