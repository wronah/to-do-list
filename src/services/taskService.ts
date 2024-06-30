import { supabase } from '@/createClient';

export default function taskService() {
  async function getTasks() {
    const { data } = await supabase
      .from('tasks')
      .select('*')
    console.log(data);
    return data;
  }

  return {
    getTasks,
  }
}