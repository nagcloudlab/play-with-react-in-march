
import { useContext } from "react"
import TodosContext from "../contexts/TodosContext"

function DataList({ }) {
    const { todos, dispatch } = useContext(TodosContext)
    const handleToggle = (id) => {
        dispatch({ type: 'TOGGLE_TODO', id })
    }
    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_TODO', id })
    }
    return (
        <>
            <ul className='list-group mt-3'>
                {todos.map(item => (
                    <li key={item.id} className='list-group-item'>
                        <input onChange={() => handleToggle(item.id)} type='checkbox' className='form-check-input me-2' checked={item.completed} />
                        <label style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.title}</label>
                        <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-danger float-end'>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DataList