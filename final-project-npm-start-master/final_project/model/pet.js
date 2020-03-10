let mongoose = require('mongoose')

mongoose.createConnection('mongodb://localhost/final',{useUnifiedTopology: true, useNewUrlParser: true})

const Schema = mongoose.Schema;
let petSchema=Schema({
    hostId:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    nickName:{
        type: String,
        required: true
    },
    gender:{
        type:String,
        enum:['male','female']

    },
    petType:{
        type:String,
        enum: ['Dog','Cat','Hamster','Rabbit','Snake']
    },
    age:{
        type:Number
    },
    photo:{
        type:String
    }
});

let Pet = mongoose.model('Pet',petSchema);

module.exports = Pet;
