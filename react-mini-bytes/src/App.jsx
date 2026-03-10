import { useState, useReducer } from 'react'
import A from './components/A'
import ColorContext from './contexts/ColorContext';


function todosReducrer(currentState = [], action) {
  let { type, payload } = action;
  switch (type) {
    case "ADD_TODO": {
      const newTodo = {
        id: currentState.length + 1,
        text: payload,
        completed: false
      }
      return [...currentState, newTodo];
    }
    case "EDIT_TODO": {
      return currentState.map(todo => todo.id === payload.id ? { ...todo, text: payload.text } : todo);
    }
    case "TOGGLE_TODO": {
      return currentState.map(todo => todo.id === payload ? { ...todo, completed: !todo.completed } : todo);
    }
    case "DELETE_TODO": {
      return currentState.filter(todo => todo.id !== payload);
    }
    default:
      return currentState;
  }
}

function App() {

  const [color, setColor] = useState("red");
  // const [todos, setTodos] = useState([
  //   { id: 1, text: "Learn React", completed: true },
  //   { id: 2, text: "Learn Context API", completed: false },
  //   { id: 3, text: "Learn useReducer", completed: false },
  // ]);
  const [todos, dispatch] = useReducer(todosReducrer, [
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Learn Context API", completed: false },
    { id: 3, text: "Learn useReducer", completed: false },
  ]);

  // const addTodo = (text) => {
  //   const newTodo = {
  //     id: todos.length + 1,
  //     text: text,
  //     completed: false
  //   };
  //   setTodos([...todos, newTodo]);
  // }

  // const editTodo = (id, newText) => {
  //   setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  // }

  // const toggleTodo = (id) => {
  //   setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  // }

  // const deleteTodo = (id) => {
  //   setTodos(todos.filter(todo => todo.id !== id));
  // }

  return (
    <>
      <div className="container">
        <h1 className="text-center">Hello React Mini Bytes</h1>
        <ol>
          <li>context -  to keep global data for tree of components </li>
          <li>useReducer - to manage complex state logic in functional components</li>
        </ol>
        <hr />

        <h2>Todos</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.text}
              </span>
            </li>
          ))}
        </ul>

        <hr />

        <button className="btn btn-primary" onClick={() => dispatch({ type: "ADD_TODO", payload: "Learn useContext" })}>Add Todo</button>
        <button className="btn btn-primary" onClick={() => dispatch({ type: "EDIT_TODO", payload: { id: 2, text: "Learn Context API in depth" } })}>Edit Todo</button>
        <button className="btn btn-primary" onClick={() => dispatch({ type: "TOGGLE_TODO", payload: 3 })}>Toggle Todo</button>
        <button className="btn btn-primary" onClick={() => dispatch({ type: "DELETE_TODO", payload: 1 })}>Delete Todo</button>

        <hr />



        <button className="btn btn-primary" onClick={() => setColor("red")}>Red</button>
        <button className="btn btn-primary" onClick={() => setColor("green")}>Green</button>
        <button className="btn btn-primary" onClick={() => setColor("blue")}>Blue</button>
        <hr />
        <ColorContext.Provider value={{ color: color }}>
          <A />
        </ColorContext.Provider>
        <ColorContext.Provider value={{ color: "tomato" }}>
          <A />
        </ColorContext.Provider>
      </div>

    </>
  )
}

export default App
