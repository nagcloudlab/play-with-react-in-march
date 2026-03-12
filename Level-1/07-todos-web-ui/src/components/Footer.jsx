
import { useContext } from "react"
import TodosContext from "../contexts/TodosContext"


function Footer({ activeCount, onFilterChange }) {

    console.log('Footer render')

    const { todos, filter, dispatch } = useContext(TodosContext)
    const handleClearCompleted = () => {
        dispatch({ type: 'CLEAR_COMPLETED' })
    }
    return (
        <div className='mt-3'>
            <div className='d-flex'>
                <div>{activeCount} items left</div>
                <ul className='nav nav-pills'>
                    <li className='nav-item'>
                        <a href='#' className={`nav-link ${filter === 'all' ? 'active' : ''}`} onClick={() => onFilterChange('all')}>All</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#' className={`nav-link ${filter === 'active' ? 'active' : ''}`} onClick={() => onFilterChange('active')}>Active</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#' className={`nav-link ${filter === 'completed' ? 'active' : ''}`} onClick={() => onFilterChange('completed')}>Completed</a>
                    </li>
                </ul>
                <button onClick={() => handleClearCompleted()} className='btn btn-sm btn-danger float-end me-2'>Clear completed</button>
            </div>
            <hr />
        </div>
    )
}

export default Footer