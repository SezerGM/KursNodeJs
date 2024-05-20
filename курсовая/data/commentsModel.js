const mongoose = require('mongoose');


const Comments = new mongoose.Schema({
    user:{
        type: String
    },
    comment:{
        type: String
    },
    topicId:{
        type: String
    }
  });


module.exports = mongoose.model('Comments', Comments);