const {Student}=require('../models/studentModel')
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv')

// add student 
// POST /addstudent
const addStudent=async(req,res)=>{
    
   const {name,rollNumber,age,mark1,mark2,mark3}=req.body;

    // checking all the required field

   if(!name || !rollNumber || !age || !mark1|| !mark2 || !mark3){
     res.status(400).json('Please enter all field')
   }


   // checking student is exist

   const studentExist=await Student.findOne({rollNumber})
   if(studentExist){
     res.status(409).json("Student already exist")
   }

   // result persentage (total 300)

   const totalper=((mark1+mark2+mark3)/300)*100;
   



// checkin valid mark
   let values;
   const marks=[mark1,mark2,mark3]
   marks.forEach((value)=>{
       if(value>100 || value<0){
           res.status(400).json('Please check entered marks')
           console.log("jjjjoooooj");
       }else{
        return values=[mark1,mark2,mark3]
       }
   })


 // resultstatus check outoff 100 for each subject mark;
 // less than 50 is failed , greater than or equal to 50 is passed for each subject mark


   
let state=values.every((value)=>{
       if(value>=50){
           return "passed"
       }
   })
  
let status;
if(state){
   status="passed"
}else{
    status="failed"
}
    
   // create student 

   try {
   const student=await Student.create({
     name,
     rollNumber,
     age,
     mark1,
     mark2,
     mark3,
     result:totalper,
     resultStatus:status

   })
    res.status(201).json(student)
   } catch (error) {
    res.status(400).json(error.message)
   }

}



// upload CSV file and insert into student data
// POST /upload

const uploadFile=async(req,res)=>{
    // console.log(req.file);
    const totalRecords = [];
  try{
  console.log(path.join(__dirname, '../', '/public/uploads/' + req.file.filename))
    fs.createReadStream(path.join(__dirname, '../', '/public/uploads/' + req.file.filename))
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', row =>totalRecords.push(row)) 
      .on('end', async rowCount => {
        try{

          const student = await Student.insertMany(totalRecords);
          res.status(200).json(student);
        }catch(err){
          res.status(400).json(err);
        }
      });
  
    }catch(error){
      res.status(400).json(error.message)
    }}

// get a student result with Id and name
// POST /students/:id/result
const studentResult=async(req,res)=>{
   
    try {
        const student=await Student.findById({_id:req.params.id})
        res.status(200).json({
          _id:student._id,
          name:student.name,
          result:student.result +'%'

        })
    } catch (error) {
        res.status(400).json(error.message)
    }

}

// get resultStatus of all students with Id and name
// GET /students 

const studentsResultstatus=async(req,res)=>{
    try {
      console.log("ppp",req.query.resultStatus);
        const students=await Student.find({resultStatus:req.query.resultStatus})
        let datas=students.map((value)=>{
        return {
          _id:value._id,
          name:value.name,
          resultStatus:value.resultStatus
        }
         
        })
        res.status(200).json(datas)
    } catch (error) {
      res.status(400).json(error.message)

    }
}

// get all student details
// GET /getstudents 

const getStudents=async(req,res)=>{
    try {
        let students=await Student.find({})
        res.status(200).json(students)
        
    } catch (error) {
        res.status(400).json(error.message)
        
    }

}

module.exports={
    addStudent,
    uploadFile,
    studentResult,
    studentsResultstatus,
    getStudents
}
