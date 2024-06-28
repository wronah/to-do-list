import { supabase } from '../createClient';

export function taskService() {
  async function getTasks() {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      return data;
  }
}