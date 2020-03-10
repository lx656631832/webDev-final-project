let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/final',{useUnifiedTopology: true, useNewUrlParser: true})

const Schema = mongoose.Schema;

let userSchema = Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enmu:['petOwner','sitter']
    },
    myPet:[{
        type:Schema.Types.ObjectId,ref:'pets'
    }],
    avatar:{
        type:String,
        default:'../public/img/avatar.png'
    }
});

let User = mongoose.model('User',userSchema);

let petSchema=Schema({
    host:{
        type:Schema.Types.ObjectId,ref:'User'
    },
    nickName:{
        type: String,
        required: true
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true
    },
    petType:{
        type:String,
        enum: ['Dog','Cat','Hamster','Rabbit','Snake'],
        required:true
    },
    age:{
        type:Number
    },
    photo:{
        type:String
    }
});

let Pet = mongoose.model('Pet',petSchema);

let posterSchema = Schema({
    user:{
        type:Schema.Types.ObjectId,ref:'User'
    },
    name:{
        type:String
    },
    type:{
        type:String,
        enum:['boarding','sitting'],
        required:true
    },
    pet:{
        type:Schema.Types.ObjectId,ref:'Pet',
    },
    petType:{
        type:String,
        enum:['Dog','Cat','Hamster','Rabbit','Snake']
    },
    petTypes:{
        type:Array
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
    price:{
        type:Number
    },
    address:{
        type:String,
        required:true
    }
});

let Poster = mongoose.model('Poster',posterSchema);
module.exports = User,Pet,Poster;


