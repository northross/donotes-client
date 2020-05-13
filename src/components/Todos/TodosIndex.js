import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class TodosIndex extends Component {
  constructor () {
    super()

    this.state = {
      todos: null
    }
  }

  componentDidMount () {
    axios({
      url: apiUrl + '/todos',
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ todos: res.data.todos })
      })
      .catch(console.error)
  }

  render () {
    const { todos } = this.state
    let todosJsx = ''

    if (!todos) {
      todosJsx = 'Loading...'
    } else {
      console.log(todos)
      todosJsx = (
        <div className="bg-light">
          {todos.map(todo => (
            <div key={todo.id}>
              <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div>
        <h1>To Do List</h1>
        {todosJsx}
      </div>
    )
  }
}

export default TodosIndex
