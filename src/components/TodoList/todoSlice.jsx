

import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
    name: 'todoList',
    initialState: [
        { id: 1, name: 'Learn Redux', completed: false, priority: 'Medium'},
        { id: 2, name: 'Learn React', completed: true, priority: 'High'},
        { id: 3, name: 'Learn TypeScript', completed: false, priority: 'Low'},
    ],
    reducers: {
        addTodo: (state,action) => {
            state.push(action.payload)
        },
        toggleTodoStatus: (state,action) => {
            const currentTodo = state.find(todo => todo.id === action.payload);
            if (currentTodo) {
                currentTodo.completed = !currentTodo.completed;
            }
        }
    }
})