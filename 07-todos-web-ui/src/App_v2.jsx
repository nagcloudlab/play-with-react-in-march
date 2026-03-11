import { useState, useReducer } from 'react'

import { todosReducer } from './reducers/todos'
import Input from './components/Input'
import DataList from './components/DataList'
import Footer from './components/Footer'
import TodosContext from './contexts/TodosContext'

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
        <TodosContext.Provider value={{ todos, dispatch }}>
          <Input placeholder='What needs to be done?' />
          <DataList data={todos} />
          <Footer />
        </TodosContext.Provider>
      </div>
    </>
  )
}

export default App
