import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';
import './App.css'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    <div className="flex flex-col items-center">
      <form onSubmit={createTask}>
        <input type="text" name="heading" placeholder="Heading" id="heading" onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" id="description" onChange={handleChange} />
        <Button type="submit">Create</Button>
      </form>
      <form onSubmit={() => updateTask(editTask.id)}>
        <input type="text" name="heading" defaultValue={editTask.heading} id="heading" onChange={handleEditChange} />
        <input type="text" name="description" defaultValue={editTask.description} id="description" onChange={handleEditChange} />
        <Button type="submit">Save changes</Button>
      </form>
      {tasks.map((task) => 
        <Card key={task.id} className="w-[350px] mt-4">
          <CardHeader>
            <CardTitle>{task.heading}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => {displayTask(task.id)}}>Edit</Button>
            <Button className="ml-2" onClick={() => {deleteTask(task.id)}}>Delete</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default App