
import { useContext } from "react"
import TodosContext from "../contexts/TodosContext"


function Footer() {
    const { todos, dispatch } = useContext(TodosContext)
    const activeCount = todos.filter(item => !item.completed).length
    const handleClearCompleted = () => {
        dispatch({ type: 'CLEAR_COMPLETED' })
    }
    return (
        <div className='mt-3'>
            <div className='d-flex'>
                <span>{activeCount} items left</span>
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
                <button onClick={() => handleClearCompleted()} className='btn btn-sm btn-danger float-end me-2'>Clear completed</button>
            </div>
            <hr />
        </div>
    )
}

export default Footer