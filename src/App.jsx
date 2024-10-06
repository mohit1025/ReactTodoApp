import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'


function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        const todos = JSON.parse(storedTodos);
        if (Array.isArray(todos)) {
          setTodos(todos);
        }
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
      }
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (todo) => {
    setTodos((todos) => [...todos, { id: Date.now(), ...todo }])
  }
  const updateTodo = (id, todo) => {
    setTodos((todos) =>
      todos.map((eachTodo) => (eachTodo.id === id ? { ...eachTodo, ...todo } : eachTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((todos) => todos.filter((eachTodo) => eachTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((todos) =>
      todos.map((eachTodo) =>
        eachTodo.id === id ? { ...eachTodo, completed: !eachTodo.completed } : eachTodo
      )
    );
  };



  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#2e2e2e] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg bg-[#010936] px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">TODO'S App Using React</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key = {todo.id} className='w-full'>
                <TodoItem todo={todo}/>
              </div>

            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
