const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title:{
        type:string,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:string,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

module.exports = mongoose.model('notes',NotesSchema)