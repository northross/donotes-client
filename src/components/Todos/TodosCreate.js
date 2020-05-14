import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

import axios from 'axios'
import apiUrl from '../../apiConfig'

class TodosCreate extends Component {
  constructor () {
    super()
    this.state = {
      todo: {
        title: '',
        due: '',
        item: ''
      },
      createdId: null
    }
  }

  handleChange = (event) => {
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const editedTodo = Object.assign(this.state.todo, updatedField)
    this.setState({ todo: editedTodo })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { msgAlert } = this.props

    axios({
      url: `${apiUrl}/todos`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        todo: this.state.todo
      }
    })
      .then((res) => {
        this.setState({ createdId: res.data.todo.id })
      })
      .then(() => msgAlert({
        heading: 'Task Created!',
        message: messages.todoSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Create Task Failed',
        message: messages.todoFailure,
        variant: 'failure'
      }))
  }

  render () {
    const { todo, createdId } = this.state
    let todosJsx = ''

    if (createdId) {
      todosJsx = <Redirect to={`/todos/${createdId}`}/>
    } else {
      todosJsx = (
        <form onSubmit={this.handleSubmit}>
          <label>Task</label>
          <input
            placeholder="Task"
            name="title"
            value={todo.title || ''}
            required
            onChange={this.handleChange}
          />
          <label>Due Date</label>
          <input
            placeholder="YEAR-MO-DY"
            name="due"
            value={todo.due || ''}
            required
            onChange={this.handleChange}
          />
          <label>Description</label>
          <input
            placeholder="Details"
            name="item"
            value={todo.item || ''}
            required
            onChange={this.handleChange}
          />
          <button type="submit">Submit Update</button>
        </form>
      )
    }

    return (
      <div>
        <h1>Create a Task</h1>
        {todosJsx}
      </div>
    )
  }
}

export default TodosCreate
