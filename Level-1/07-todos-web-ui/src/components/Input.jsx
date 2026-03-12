
import { useContext } from 'react'
import TodosContext from '../contexts/TodosContext'

function Input({ placeholder }) {

    const { dispatch } = useContext(TodosContext)

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            dispatch({ type: 'ADD_TODO', title: e.target.value })
            e.target.value = ''
        }
    }

    return (
        <>
            <input onKeyUp={handleKeyUp} type='text' className='form-control' placeholder={placeholder} />
        </>
    )
}

export default Input