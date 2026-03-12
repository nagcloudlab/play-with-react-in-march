
import { useContext, useCallback } from "react"
import TodosContext from "../contexts/TodosContext"

function DataList({ todos }) {
    console.log('DataList render')
    const { filter, dispatch } = useContext(TodosContext)
    const handleToggle = useCallback((id) => {
        dispatch({ type: 'TOGGLE_TODO', id })
    }, [])
    const handleDelete = useCallback((id) => {
        dispatch({ type: 'DELETE_TODO', id })
    }, [])

    return (
        <>
            <hr />
            {filter === 'all' && <div className='text-secondary'>All</div>}
            {filter === 'active' && <div className='text-secondary'>Pending</div>}
            {filter === 'completed' && <div className='text-secondary'>Completed</div>}
            <hr />
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