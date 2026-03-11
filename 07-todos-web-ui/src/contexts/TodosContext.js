

import React from "react";

const TodosContext = React.createContext({
    todos: [],
    dispatch: () => { }
})

export default TodosContext