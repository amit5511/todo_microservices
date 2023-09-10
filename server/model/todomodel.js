const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    id:Number,
    todo:String
})

const Todo = mongoose.model('Todo',todoSchema,'assignment_atul');
module.exports =Todo;