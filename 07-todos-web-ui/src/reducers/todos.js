


function todosReducer(todos = [], action) {
    let { type } = action
    switch (type) {
        case 'ADD_TODO': {
            let { title } = action
            let newTodo = {
                id: todos.length + 1,
                title,
                completed: false
            }
            return [...todos, newTodo]
        }
        case 'TOGGLE_TODO': {
            let { id } = action
            return todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo
            })
        }
        case 'DELETE_TODO': {
            let { id } = action
            return todos.filter(todo => todo.id !== id)
        }
        default:
            return todos
    }
}

export { todosReducer }