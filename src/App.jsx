import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';
import './App.css'

const App = () => {

  const [tasks, setTasks] = useState([])

  const [task, setTask] = useState({
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

  async function createTask() {
    await supabase
      .from('tasks')
      .insert({ heading: task.heading, description: task.description })
  }

  return (
    <div>
      <form onSubmit={createTask}>
        <input type="text" name="heading" placeholder="Heading" id="heading" onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" id="description" onChange={handleChange} />
        <button type="submit">Create</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>heading</th>
            <th>description</th>
            <th>is_done</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => 
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.heading}</td>
              <td>{task.description}</td>
              <td>{String(task.is_done)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App