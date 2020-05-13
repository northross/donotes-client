import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
// import { Link } from 'react-router-dom'
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
    console.log(this.props)
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
      .catch(console.error)
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

    if (!todo) {
      todosJsx = 'Loading...'
    } else if (deleted) {
      todosJsx = <Redirect to ="/todos"/>
    } else {
      todosJsx = (
        <div>
          <h3>Task: {todo.title}</h3>
          <h5>Due: {todo.due}</h5>
          <h4>Details: {todo.item}</h4>
          <button onClick={this.destroy}>Delete</button>
          <button>
            <Link to={`/todos/${this.props.match.params.id}/edit`}>Update</Link>
          </button>
        </div>
      )
    }

    return (
      <div>
        <h1>Show To Do</h1>
        {todosJsx}
      </div>
    )
  }
}

export default TodosShow
