import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';
import './App.css'
import { Button } from "@/components/ui/button"
import Task from './components/Task';
import taskService from './services/taskService';

const App = () => {

  const { getTasks } = taskService();
  const [tasks, setTasks] = useState([])

  const [task, setTask] = useState({
    heading: '',
    description: ''
  })

  const [editTask, setEditTask] = useState({
    id: '',
    heading: '',
    description: ''
  })

  useEffect(() => {
    setTasks(getTasks());
  }, [])

  function handleChange(event) {
    setTask(previousFormData =>{
      return {
        ...previousFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleEditChange(event) {
    setEditTask(previousFormData =>{
      return {
        ...previousFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  async function createTask(event) {
    event.preventDefault()
    const { error } = await supabase
      .from('tasks')
      .insert({ heading: task.heading, description: task.description })

    getTasks()

    if(error) {
      console.log(error)
    }
  }

  async function deleteTask(id) {
    const { data, error } = await supabase 
      .from('tasks')
      .delete()
      .eq('id', id)
    
    getTasks()

    if(error) {
      console.log(error)
    }
  }

  async function updateTask(id) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ heading: editTask.heading, description: editTask.description })
      .eq('id', id)

    getTasks()

    if(error) {
      console.log(error)
    }
  }

  function displayTask(id) {
    tasks.map((task) => {
      if(task.id === id){
        setEditTask({ id: task.id, heading: task.heading, description: task.description })
      }
    })
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={createTask}>
        <input type="text" name="heading" placeholder="Heading" id="heading" onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" id="description" onChange={handleChange} />
        <Button type="submit">Create</Button>
      </form>
      
      {tasks.map((task) => 
        <Task task={task} deleteTask={deleteTask} key={task.id} />
      )}
    </div>
  )
}

export default App