import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Todos = () => {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    axios(`${apiUrl}/todos`)
      .then(res => setTodos(res.data.todos))
      .catch(console.error)
  }, [])
  const todosJsx = todos.map(todo => (
    <li key={todo.id}>
      <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
    </li>
  ))
  return (
    <div>
      <h4>Todo List</h4>
      <ul>
        {todosJsx}
      </ul>
    </div>
  )
}

export default Todos
