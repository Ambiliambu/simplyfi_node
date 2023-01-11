const mongoose=require('mongoose')

const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollNumber:{
        type:String,
        required:true,
        unique:true

    },
    age:{
        type:String,
        required:true
    },
    mark1:{
        type:Number,
        required:true
    },
    mark2:{
        type:Number,
        required:true
    },
    mark3:{
        type:Number,
        required:true
    },
    result:{
        type:Number,
        
    },
    resultStatus:{
        type:String
    },
   
})

const Student=mongoose.model('Student',studentSchema)

module.exports={Student}