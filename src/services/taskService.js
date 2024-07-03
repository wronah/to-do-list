import { supabase } from '@/createClient';

export default function taskService() {
  async function getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
    return { data, error };
  }

  async function addTask(task) {
    const { data, error } = await supabase
      .from('tasks')
      .insert({ heading: task.heading, description: task.description })
    return { data, error };
  }

  return {
    getTasks,
    addTask
  }
}