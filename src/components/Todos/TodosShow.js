import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class TodosShow extends Component {
  constructor () {
    super()

    this.state = {
      todo: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    // console.log(this.props.match.params.id)
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
        heading: 'Your Do Tasks',
        message: messages.todoShowSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Your To Do Tasks Did Not Load',
        message: messages.todoShowFailure,
        variant: 'success'
      }))
  }

  destroy = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/todos/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    const { todo, deleted } = this.state
    let todosJsx
    const heading = {
      textAlign: 'center'
    }
    if (!todo) {
      todosJsx = 'Loading...'
    } else if (deleted) {
      todosJsx = <Redirect to ="/todos"/>
    } else {
      todosJsx = (
        <Card
          bg={'info'}
          key={'idx'}
          text={'light'}
          style={{ width: '18rem' }}
        >
          <Card.Header>Task: {todo.title}</Card.Header>
          <Card.Body>
            <Card.Title>Due: {todo.due}</Card.Title>
            <Card.Text>Details: {todo.item}</Card.Text>
            <Button variant="dark" onClick={this.destroy}>Delete</Button>
            <Button variant="light">
              <Link to={`/todos/${this.props.match.params.id}/edit`}>Update</Link>
            </Button>
          </Card.Body>
        </Card>
      )
    }

    return (
      <div>
        <h1 style={heading}>Show To Do</h1>
        {todosJsx}
      </div>
    )
  }
}

export default TodosShow
