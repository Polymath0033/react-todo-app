import { useState, useEffect } from "react";
import Top from "./components/Top";
import Todo from "./components/Todo";
import "./App.css";
let completed = [];
let active = [];
function App() {
  const [mode, setMode] = useState("light");
  const [todo, setTodo] = useState([]);
  const [filter, setFilter] = useState("All");
  const [mediaQ, setMediaQ] = useState();
  const switchMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:600px)");
    setMediaQ(mediaQuery.matches);
    const mediaQueryChange = (event) => {
      setMediaQ(event.matches);
    };
    mediaQuery.addListener(mediaQueryChange);
    return () => {
      mediaQuery.removeListener(mediaQueryChange);
    };
  }, []);
  const addTodo = (value, checkbox) => {
    setTodo([
      ...todo,
      {
      id: new Date().toISOString(),
      text: value,
      checked: checkbox,
      completed: false,
        },
    ]);
  };
  const activateTodo = (id) => {
    setTodo(
      todo.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  const completeTodo = (id) => {
    setTodo(
      todo.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  const deleteTodo = (id) => {
    const todos = todo.filter((item) => item.id !== id);
    setTodo(todos);
  };

  const clearCompleted = () => {
    let completed = todo.filter((item) => item.completed !== true);
    setTodo(completed);
  };
  const dragSort = (di, doc) => {
    let _todo = [...todo];
    const draggedContent = _todo.splice(di, 1)[0];
    _todo.splice(doc, 0, draggedContent);
    di = null;
    doc = null;
    setTodo(_todo);
  };

  let length = todo.filter((item) => item.completed !== true).length;
  completed = todo.filter((item) => item.completed === true);
  active = todo.filter((item) => item.checked === true);
  const todos =
    filter === "All"
      ? todo
      : filter === "Active"
      ? active
      : filter === "Completed"
      ? completed
      : todo;
  const filterHandler = (current) => {
    setFilter(current);
  };

  return (
    <div className="App">
      <article className={`upper ${mode}`}>
        <Top switchMode={switchMode} mode={mode} addTodo={addTodo} />
      </article>
      <div className={`todo ${mode}`}>
        <div className={`content ${mode}`}>
          <ul className={mode}>
            <Todo
              mode={mode}
              todo={todos}
              activateTodo={activateTodo}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
              filter={filter}
              dragSort={dragSort}
            />
            <li>
              <div className="time">
                {length} item{length === 1 ? "" : "s"} left
              </div>
              {!mediaQ &&
                ["All", "Active", "Completed"].map((button, index) => (
                  <div className="switch" key={index}>
                    <button
                      key={index}
                      className={filter === button ? "active-tab" : ""}
                      onClick={() => filterHandler(button)}
                    >
                      {button}
                    </button>
                  </div>
                ))}
              <button className="clear" onClick={clearCompleted}>
                Clear Completed
              </button>
            </li>
          </ul>
          {mediaQ && (
            <div className={`media ${mode}`}>
              {["All", "Active", "Completed"].map((button, index) => (
                <button
                  key={index}
                  className={filter === button ? "active-tab" : ""}
                  onClick={() => filterHandler(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          )}
          <h4 className="bottom">Drag and drop reorder list</h4>
        </div>
      
      </div>
    </div>
  );
}

export default App;
