import { Fragment, useRef } from "react";
import cross from "../assets/icon-cross.svg";
const Todo = ({
  mode,
  todo,
  activateTodo,
  deleteTodo,
  completeTodo,
  filter,

  dragSort,
}) => {
  const dragItem = useRef();
  const dragOver = useRef();
  const handleSort = () => {
    const di = dragItem.current;
    const doc = dragOver.current;
    dragSort(di, doc);
  };
  return (
    <Fragment>
      {todo.length < 1 && (
        <li>
          <h5 style={{ textAlign: "center" }}>
            No {filter === "All" ? "" : filter} Todo yet
            {filter === "All" ? ", add todo in input field " : ""}
          </h5>
        </li>
      )}
      {todo.map((item,index) => (
        <li
          key={item.id}
          draggable
        
          onDragStart={(e) => (dragItem.current = index)}
          onDragEnter={(e) => (dragOver.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="checkbox"
            onChange={() => activateTodo(item.id)}
            name="checkbox"
            checked={item.checked}
          />
          <h5
            onClick={() => completeTodo(item.id)}
            className={item.completed ? `completed ${mode}` : ""}
          >
            {item.text}
          </h5>
          <img
            src={cross}
            alt="Completed"
            onClick={() => deleteTodo(item.id)}
          />
        </li>
      ))}
    </Fragment>
  );
};
export default Todo;
