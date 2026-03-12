import { useState, useReducer } from 'react'

import { todosReducer } from './reducers/todos'

function App() {
  const [todos, dispatch] = useReducer(todosReducer, [
    {
      id: 1,
      title: 'Learn React',
      completed: true
    },
    {
      id: 2,
      title: 'Learn Redux',
      completed: false
    },
    {
      id: 3,
      title: 'Build a todo app',
      completed: false
    }
  ])

  const handleDelete = (id) => {
    const action = {
      type: 'DELETE_TODO',
      id
    }
    dispatch(action)
  }

  const handleToggle = (id) => {
    const action = {
      type: 'TOGGLE_TODO',
      id
    }
    dispatch(action)
  }

  const handleKeyUp = (e) => {
    if (e.key !== 'Enter') return
    const title = e.target.value.trim()
    if (title) {
      const action = {
        type: 'ADD_TODO',
        title
      }
      dispatch(action)
      e.target.value = ''
    }
  }

  return (
    <>
      <div className='container'>
        <div className='display-1'>todos</div>
        <hr />
        <input onKeyUp={handleKeyUp} type='text' className='form-control' placeholder='What needs to be done?' />
        <ul className='list-group mt-3'>
          {todos.map(todo => (
            <li key={todo.id} className='list-group-item'>
              <input onChange={() => handleToggle(todo.id)} type='checkbox' className='form-check-input me-2' checked={todo.completed} />
              <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</label>
              <button onClick={() => handleDelete(todo.id)} className='btn btn-sm btn-danger float-end'>Delete</button>
            </li>
          ))}
        </ul>
        <hr />
        <div className='mt-3'>
          <div className='d-flex'>
            <span>2 items left</span>
            <ul className='nav nav-pills'>
              <li className='nav-item'>
                <a href='#' className='nav-link'>All</a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link'>Active</a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link'>Completed</a>
              </li>
            </ul>
            <button className='btn btn-sm btn-danger float-end me-2'>Clear completed</button>
          </div>
          <hr />
        </div>
      </div>
    </>
  )
}

export default App
