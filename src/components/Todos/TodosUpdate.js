import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
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
    const { msgAlert } = this.props
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
      .then(() => msgAlert({
        heading: 'Updated Your Do Task',
        message: messages.todoUpdateSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Updating Your Do Task Failed',
        message: messages.todoUpdateFailure,
        variant: 'failure'
      }))
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
    const heading = {
      textAlign: 'center'
    }

    let todosJsx = ''
    if (!todo) {
      todosJsx = 'Loading...'
    } else if (updated) {
      todosJsx = <Redirect to={`/todos/${this.props.match.params.id}`}/>
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
        <h2>Update Your Task</h2>
        {todosJsx}
      </div>
    )
  }
}

export default TodosUpdate
