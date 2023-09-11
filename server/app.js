const express = require('express');
const redis= require('./db/redisconnection');
const app = express();
const subscriber = require('./db/mqttconnection');
const publisher = require('./db/mqttconnection');
const Todo = require('./model/todomodel');
const path = require('path')
const cors=require('cors');
app.use(cors({
    origin:"*",
    credentials:true
}));


subscriber.subscribe("/add_todo")
subscriber.on("message", async(cahnnel,data) => {
    switch(cahnnel){
        case '/add':{
          if(data){
            let todo = JSON.parse(data);
            console.log('===========================Todo Reecived =====================================',todo)
            let redisTodo = await redis.getRedisKey();
            if(!redisTodo){
                redisTodo=[];
            }
            redisTodo.push(todo)
           // console.log("-------------",redisTodo)
            if(redisTodo.length<=49){
                await redis.setRedisKey(redisTodo)
            }else{
                await Todo.insertMany(redisTodo);
                await redis.clearreddis();
            } 
          }
        }
        break;
      }

});


app.get('/fetchAllTasks',async(req,res)=>{
    try {
        let todos=[];
        let redisTodo = await redis.getRedisKey();
        if(redisTodo){
           todos=redisTodo;
        }
        //hit the data
        const dbTodo = await Todo.find();
        todos.push(...dbTodo);
        res.status(201).json({
            success:true,
            todo:todos
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            err:error.message
        })
    }
})

app.get("/test",(req,res)=>{
    res.status(201).json({
     success:true,
     message:"Server is working fine"
    })
})
//initalized frontend
app.use(express.static(path.join(__dirname,'../client/build')));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
})

app.get("*",(req,res)=>{
    res.status(201).json({
     success:true,
     message:"Server is working fine"
    })
})




module.exports =app;