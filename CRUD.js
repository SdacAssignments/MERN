const express = require('express');   //The Express module is a web application framework for Node.js, designed to make building web applications and APIs simpler and more robust.
const mongoose = require('mongoose');

const app = express(3000);
app.use(express.json());//The '.json()' Middleware is a Built-In Middleware used to parse incoming JSON requests.
app.use(express.urlencoded({extended:true}));


//- - - Connecting With MongoDB and Creating A Database - - -//
mongoose.connect('mongodb://localhost:27017/Rest')  //Connecting With MongoDB
.then(() => {
    console.log('Connected to DB');
}).catch((err)=>{
    console.log(err);  
});

const structure = new mongoose.Schema({
   name:{
    type:String,
    required:true,
   },salary:{
    type:Number,
    required:true,
   }
});

const emp = mongoose.model('emp',structure);


//- - - CRUD Operations Using Express - - -//

app.post('/insert', async(req,resp)=>{                     //INSERT DATA ('.post()')
        const data = new emp(req.body);
        const res = await data.save();
        if(res){
            resp.json({message:'Data Stored in DB!'});
        }else{
            resp.json({message:'Error Occured!'});
        }
});

app.put('/update/:id', async(req,resp)=>{                  //UPDATE DATA ('.put()/.patch()')
    const id = req.params.id;
    const res = await emp.findByIdAndUpdate(id,req.body);
    if(res){
        resp.json({message:'Data Updated in DB!'});
    }else{
        resp.json({message:'Error Occured!'});
    }
});

app.delete('/del/:id', async(req,resp)=>{                  //DELETE DATA ('.delete()')
    const id = req.params.id;
    const res = await emp.findByIdAndDelete(id);
    if(res){
        resp.json({message:'Data Deleted in DB!'});
    }else{
        resp.json({message:'Error Occured!'});
    }
});

app.get('/select', async(req,resp)=>{                      //SHOW DATA ('.get()')
    const res = await emp.find({});
    if(res){
        resp.json(res);
    }else{
        resp.json({message:'Error Occured!'});
    }
});


//- - - Running Server on Port::4000 - - -//
app.listen(4000,()=>{
    console.log('Server is Running on Port::4000'); 
});