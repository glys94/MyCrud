import React, { useState} from 'react'
import { isEmpty } from 'lodash'
import shortid from 'shortid'

function App() {
  const [task, settask] = useState("")
  const [tasks, settasks] = useState([])

  const addTask= (e)=>{
    e.preventDefault()
    if (isEmpty(task)){
console.log("task emty")
return
    }

    const newtask = {
      id: shortid.generate(),
      name: task
    }
    settask([... task, newtask])
    settask("")

  }

  return (
   <div className="container mt-5">
     <h1>task</h1>
     <hr/>
     <div className = "row">
       <div className="col-8">
         <h4 className="Text-center"> Task list </h4>
         <ul className="list-group">

           {
              tasks.map((task) =>(
               <li className="list-group-item"  key={task.id}>
               <span className="lead"> {task.name}</span>
               <button className="btn btn-danger btn-sm float-right mx-2"> delete </button>
               <button className="btn btn-warning btn-sm float-right"> edit </button>
               </li>
             ))
           }

         </ul>
       </div>
       <div className="col-4">
       <h4 className="Text-center">Form</h4>
       <form onSubmit={addTask}>
         <input 
         type="text"
         className=" form-comtrol mb-2"
         placeholder="Enter task..."
         onChange={(Text)=> settask(Text.target.value)}
         value={task}
         />
         <button className="btn btn-dark btn-block"
         type="submit">
           Add
           </button>
       </form>
         </div>
     </div>
   </div>
  )
}

export default App
