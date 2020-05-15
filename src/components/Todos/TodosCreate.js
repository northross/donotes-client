import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
    const heading = {
      textAlign: 'center'
    }
    let todosJsx = ''

    if (createdId) {
      todosJsx = <Redirect to={`/todos/${createdId}`}/>
    } else {
      todosJsx = (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Task</Form.Label>
            <Form.Control
              placeholder="Task"
              name="title"
              value={todo.title || ''}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="due">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="YEAR-MO-DY"
              name="due"
              value={todo.due || ''}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="due">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Details"
              name="item"
              value={todo.item || ''}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Submit Update</Button>
        </Form>
      )
    }

    return (
      <div style={heading}>
        <h1>Create a Task</h1>
        {todosJsx}
      </div>
    )
  }
}

export default TodosCreate
