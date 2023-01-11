const express=require('express');
const app=express();
const connectDB=require('./config/db');
const dotenv=require('dotenv');

dotenv.config()
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send("Api Running")
})
app.use('/',require('./routes/studentRoute'))

app.listen(8000,()=>{
    console.log("Server Start");
})