import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
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
    const { msgAlert } = this.props
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
      .then(() => msgAlert({
        heading: 'All To Do Tasks',
        message: messages.todoAllSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'All To Do Tasks Can Not Load',
        message: messages.todoAllFailure,
        variant: 'failure'
      }))
  }

  render () {
    const { todos } = this.state
    // const backgroundImageUrl = 'https://cdn.stocksnap.io/img-thumbs/960w/minimal-white_EAVNVUIK49.jpg'
    let todosJsx = ''
    const heading = {
      textAlign: 'center'
    }
    if (!todos) {
      todosJsx = 'Loading...'
    } else {
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
      <div style={heading}>
        <div>
          <h1>To Do List</h1>
          {todosJsx}
        </div>
      </div>
    )
  }
}

export default TodosIndex
