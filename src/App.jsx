import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';

const App = () => {

  const [ users, setUsers ] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const { data } = await supabase
    .from('users')
    .select('*')
    setUsers(data)
    console.log(data)
  }


  return (
    <div>App</div>
  )
}

export default App