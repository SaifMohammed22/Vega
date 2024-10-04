const express=require('express');
const bodyparser=require('body-parser');
const dotenv=require('dotenv');
dotenv.config();
const messageCreator=require('./utilities/Generatemsg');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBDp3VMJnZkVXjFxTLQDDN5cjkoP0PL1qI");
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
const port=process.env.port||8080;
app.post('/story',async(req,res,next)=>{
  try{
    const {name,lang,planet,interests,school}=req.body;
    console.log(name,lang,planet,interests,school);
    const msg=messageCreator(name,interests,lang,school,planet);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent([msg]);
   const data=result.response.text().split('$');
    return res.status(200).json({data});
  }
  catch(err){
    if(!err.statusCode){
      err.statusCode=500;
    }
   return res.status(500).json({error:err.message});
  }


})


app.listen(port,()=>console.log(`app is running on ${port}`));