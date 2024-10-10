import React, {useState} from "react";
import "./index.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [work, setWork] = useState("");
  const [date, setDate] = useState(formateDate(new Date()));

  function formateDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  function addTodo() {
    if (work.trim() === "") {
      alert("Please Enter A Task");
      return;
    }
    const newTodo = {work, date, id: Date.now()};
    setTodos([...todos, newTodo]);
    setWork("");
    setDate(formateDate(new Date()));
  }

  function moveUp(index) {
    if (index === 0) return;
    const updatedTodos = [...todos];
    [updatedTodos[index - 1], updatedTodos[index]] = [
      updatedTodos[index],
      updatedTodos[index - 1],
    ];
    setTodos(updatedTodos);
  }

  // Function to move a task down in the list
  function moveDown(index) {
    if (index === todos.length - 1) return;
    const updatedTodos = [...todos];
    [updatedTodos[index + 1], updatedTodos[index]] = [
      updatedTodos[index],
      updatedTodos[index + 1],
    ];
    setTodos(updatedTodos);
  }

  // Function to remove a todo item by its id
  function removeTask(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <div className="todo-container">
      <h1>TODO LIST</h1>
      <div className="input-section">
        <input
          type="text"
          value={work}
          placeholder="Enter task..."
          onChange={(e) => setWork(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {/* Add the class add-button to apply the styles */}
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((item, index) => (
          <li key={item.id} className="todo-item">
            <span>
              {item.work} ({item.date})
            </span>
            <div className="button-group">
              <button
                className="delete-button"
                onClick={() => removeTask(item.id)}
              >
                Remove
              </button>
              <button
                className="move-button"
                onClick={() => moveUp(index)}
                aria-label="Move Up"
              >
                👆
              </button>
              <button
                className="move-button"
                onClick={() => moveDown(index)}
                aria-label="Move Down"
              >
                👇
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Todo;
