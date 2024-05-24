import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';
import './App.css'

const App = () => {

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
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const { data } = await supabase
    .from('tasks')
    .select('*')
    setTasks(data)
  }

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

  async function createTask() {
    const { error } = await supabase
      .from('tasks')
      .insert({ heading: task.heading, description: task.description })

    fetchTasks()

    if(error) {
      console.log(error)
    }
  }

  async function deleteTask(id) {
    const { data, error } = await supabase 
      .from('tasks')
      .delete()
      .eq('id', id)
    
    fetchTasks()

    if(error) {
      console.log(error)
    }

    if(data) {
      console.log(data)
    }
  }

  async function updateTask(id) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ heading: editTask.heading, description: editTask.description })
      .eq('id', id)

    fetchTasks()

    if(error) {
      console.log(error)
    }

    if(data) {
      console.log(data)
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
    <div>
      <form onSubmit={createTask}>
        <input type="text" name="heading" placeholder="Heading" id="heading" onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" id="description" onChange={handleChange} />
        <button type="submit">Create</button>
      </form>
      <form onSubmit={() => updateTask(editTask.id)}>
        <input type="text" name="heading" defaultValue={editTask.heading} id="heading" onChange={handleEditChange} />
        <input type="text" name="description" defaultValue={editTask.description} id="description" onChange={handleEditChange} />
        <button type="submit">Save changes</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>heading</th>
            <th>description</th>
            <th>is_done</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => 
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.heading}</td>
              <td>{task.description}</td>
              <td>{String(task.is_done)}</td>
              <td>
                <button onClick={() => {deleteTask(task.id)}}>Delete</button>
                <button onClick={() => {displayTask(task.id)}}>Edit</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App