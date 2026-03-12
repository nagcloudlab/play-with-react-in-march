import { useState, useReducer, useEffect, useMemo } from 'react'

import { todosReducer } from './reducers/todos'
import Input from './components/Input'
import DataList from './components/DataList'
import Footer from './components/Footer'
import TodosContext from './contexts/TodosContext'

function App() {
  console.log('App rendered')

  const [filter, setFilter] = useState('all')

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

  const [filteredTodos, setFilteredTodos] = useState(todos)
  //const [activeCount, setActiveCount] = useState(todos.filter(item => !item.completed).length)
  const activeCount = useMemo(() => {
    console.log("calculating activeCount ( expected to run only when todos changes )")
    return todos.filter(item => !item.completed).length
  }, [todos])

  useEffect(() => {
  }, [])
  useEffect(() => {
    console.log(filter)
    let result = todos.filter(todo => {
      console.log("filtering todos ( expected to run only when filter changes )")
      if (filter === 'all') return true
      if (filter === 'active') return !todo.completed
      if (filter === 'completed') return todo.completed
    })
    setFilteredTodos(result)
  }, [filter, todos])

  // useEffect(() => {
  //   console.log("calculating activeCount ( expected to run only when todos changes )")
  //   const result = todos.filter(item => !item.completed).length
  //   setActiveCount(result)
  // }, [todos])

  return (
    <>
      <div className='container'>
        <div className='display-1'>todos</div>
        <hr />
        <TodosContext.Provider value={{ todos, filter, dispatch }}>
          <Input placeholder='What needs to be done?' />
          <DataList todos={filteredTodos} />
          <Footer onFilterChange={setFilter} activeCount={activeCount} />
        </TodosContext.Provider>
      </div>
    </>
  )
}

export default App
