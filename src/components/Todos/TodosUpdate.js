import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class TodosUpdate extends Component {
  constructor () {
    super()
    this.state = {
      todo: null,
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/todos/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ todo: res.data.todo })
      })
      .catch(console.error)
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
    axios({
      url: `${apiUrl}/todos/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        todo: this.state.todo
      }
    })
      .then(() => {
        this.setState({ updated: true })
      })
      .catch(console.error)
  }

  render () {
    const { todo, updated } = this.state

    let todosJsx = ''
    if (!todo) {
      todosJsx = 'Loading...'
    } else if (updated) {
      todosJsx = <Redirect to={`/todos/${this.props.match.params.id}`}/>
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
            placeholder="Example"
            name="due"
            value={todo.due}
            required
            onChange={this.handleChange}
          />
          <label>Description</label>
          <input
            placeholder="Details"
            name="item"
            value={todo.item}
            required
            onChange={this.handleChange}
          />
          <button type="submit">Submit Update</button>
        </form>
      )
    }

    return (
      <div>
        <h1>To Do Update</h1>
        {todosJsx}
      </div>
    )
  }
}

export default TodosUpdate
