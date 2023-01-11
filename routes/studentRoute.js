const express=require('express')
const { addStudent, studentResult, studentsResultstatus, uploadFile, getStudents } = require('../controllers/studentController')
const router=express.Router()
const {upload}=require('../utils/uploadFile')

router.post('/addstudent',addStudent)
router.post('/upload',upload.single('csvFile'),uploadFile)
router.get('/students/:id/result',studentResult)
router.get('/students',studentsResultstatus)
router.get('/getstudents',getStudents)

module.exports=router