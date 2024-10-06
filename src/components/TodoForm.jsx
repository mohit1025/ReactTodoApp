import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
    
    const[todo, setTodo]= useState("")
    const {addTodo} = useTodo()

    const add = (e)=> {
        e.preventDefault()

        if(!todo) return 

        addTodo({todo, completed: false})

        setTodo("")
    }

    return (
        <form  onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border mb-3 text-black placeholder:text-slate-700 rounded-l-lg px-3 outline-none duration-150 bg-[#d9d9d9] py-1.5"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 mb-3 py-1 bg-blue-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

