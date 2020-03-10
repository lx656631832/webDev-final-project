let mongoose = require('mongoose')

mongoose.createConnection('mongodb://localhost/final',{useUnifiedTopology: true, useNewUrlParser: true})

const Schema = mongoose.Schema;

let posterSchema = Schema({
    type:{
        type:String,
        enum:['boarding','sitting']
    },
    pet:{
        type:Schema.Types.ObjectId,ref:'pets',
    },
    petType:{
      type:String,
      enum:['Dog','Cat','Hamster','Rabbit','Snake']
    },
    startTime:{
        type: Date,
        required: true
    },
    endTime:{
        type:Date,
        required:true
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:['posted','processing','confirmed'],
        default:'posted'
    },
    confirmedUserId:{
        type:String
    },
    confirmedUsername:{
        type:String
    },
    confirmedEmail:{
        type:String
    }
});

let Poster = mongoose.model('Poster',posterSchema);

module.exports = Poster;

