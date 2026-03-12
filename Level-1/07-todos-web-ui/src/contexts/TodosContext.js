

import React from "react";

const TodosContext = React.createContext({
    todos: [],
    filter: 'all',
    dispatch: () => { }
})

export default TodosContext