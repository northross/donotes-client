import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class TodosShow extends Component {
  constructor () {
    super()

    this.state = {
      todo: null
    }
  }

  componentDidMount () {
    console.log('got this far')
    console.log(this.props.match.params.id)
    axios({
      url: apiUrl + '/todos/' + this.props.match.params.id,
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

  render () {
    const { todo } = this.state
    let todosJsx

    if (!todo) {
      todosJsx = 'Loading...'
    } else {
      todosJsx = (
        <div>
          <h3>Task: {todo.title}</h3>
          <h5>Due: {todo.due}</h5>
          <h4>Details: {todo.item}</h4>
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
