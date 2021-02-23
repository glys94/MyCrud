import React, { useState} from 'react'
import { isEmpty, size, throttle } from 'lodash'
import shortid from 'shortid'

function App() {
  const [task, settask] = useState("")
  const [tasks, settasks] = useState([])
 const [edidMode, setedidMode] = useState(false)
 const [id, setId] = useState("")
 const [error,seterror] = useState(null)


 const validForm = () =>{
   let isValid = true
   seterror(null)

  if (isEmpty(task)){
      seterror("Debes ingresar una tarea")
    isValid = false
        }
      return isValid  
 }

  const addTask= (e)=>{
    e.preventDefault()
    if (!validForm()){
      return
    }

    const newtask = {
      id: shortid.generate(),
      name: task
    }
    settasks([... tasks, newtask])
    settask("")
    

  }

  const saveTask= (e)=>{
    e.preventDefault()

    if (!validForm()){
      return
    }
    
    const editedatasks = tasks.map(item=> item.id === id ? {id, name: task} : item)
    settasks(editedatasks)
    //settask([... task, newtask])
    setedidMode(false)
    settask("")
    setId("")
    //console.log("settasks")

  }

const deleteTask = (id)=>{
  const filterTasks = tasks.filter(task => task.id !== id) 
  settasks(filterTasks)
}

const editTask = (theTask) => {
  settask(theTask.name)
  setedidMode(true)
  setId(theTask.id)
  }

  return (
   <div className="container mt-5">
     <h1>task</h1>
     <hr/>
     <div className = "row">
       <div className="col-8">
         <h4 className = "text-center" > Task list </h4>

         {
           size(tasks) === 0 ?(
           <li className= "list-group-item" > Aun  no Hay tareas programadas.</li>
           ):(

          
        <ul className="list-group">

           {
              tasks.map((task) =>(
               <li className="list-group-item" key={task.id}>
               <span className="lead"> {task.name}</span>

               <button 
               className="btn btn-danger btn-sm float-right mx-2"
               onClick={()=> deleteTask(task.id)}
               > 
               delete 
               </button>
               <button
                className="btn btn-warning btn-sm float-right"
                onClick={()=> editTask(task.id)}
               
                >
               edit
               </button>
               </li>
             ))
           }

         </ul>
           )

        }  

       </div>
       <div className="col-4">

       <h4 className="text-center">
         {edidMode ? "task modify" : "Add Task"}
         </h4>

       <form onSubmit={ edidMode ? saveTask : addTask}>
         {
           error && <span className ="text-danger mb-2">{error}</span>
         }
         <input 
         type="text"
         className=" form-comtrol mb-2"
         placeholder="Enter task..."
         onChange={(Text)=> settask(Text.target.value)}
         value={task}
         />
          <button className = { edidMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
         type="submit">
           { edidMode ? "save" : "add" }
           </button>
       </form>
         </div>
     </div>
   </div>
  )
}

export default App
