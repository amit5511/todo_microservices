import { useEffect, useState,useRef } from 'react';
import './App.css';
import  axios from 'axios'
import client from './mqtt';

function App() {
  const [todo, setTodo]=useState([]);
  const [bool, setBool]=useState(false);
  const todoref = useRef('')
  const addTask = async() => {
    if (todoref.current.value.trim() !== "") {
      const val={
        id:todo?Number(todo.length)+1:1,
        name:todoref.current.value
      }
    client.publish("/add_todo",JSON.stringify(val));
    todoref.current.value =''
    await new Promise(resolve => setTimeout(resolve, 500));
    getTodo()
    }
  };
  const getTodo=async()=>{
    try {
      let {data} = await axios.get('/fetchAllTasks');
      setTodo(data.todo)
    } catch (error) {
      console.log('error in fetching todos from api',error);
    }
  }

  
  useEffect(()=>{
    getTodo();
  },[]);

 

  
  return (
    <div className="px-8 w-96 h-96 ml-auto mr-auto mt-40 border-slate-400 shadow-md">
      <svg className="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24"></svg>
      <h1 className="text-slate-900 group-hover:text-white text-lg font-semibold">Note App</h1>
      <div className=''>
        <input type='text' className='border-2 rounded-md shadow' ref={todoref} id='todo-item' placeholder='Add New...'/>
      
        <button type='button' className="w-20 h-11 rounded-full ml-6 bg-blue-400" onClick={addTask} id='save'><span className='rounded-full mr-2 bg-white-300'>&#43;</span>Add</button>
        </div>
        <div>
          <h1 className='text-lg font-semibold mt-7'>Notes</h1>
          <div className='divide-y divide-blue-200' id='todo-list'>
            {
              todo.map((item)=>item.name&&<div key={item.id}>{`${item.id}. ${item.name}`}</div>)
            }
           </div>
        </div>
    </div>
  );
}

export default App;
