import { useState } from "react";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";

const Top = ({ mode, switchMode, addTodo }) => {
  const [check, setCheck] = useState(false);
  const [input, setInput] = useState("");
  const checkHandler = (e) => {
    setCheck(e.target.checked);
  };
  const inputHandler = (e) => {
    if (e.key === "Enter") {
      setInput(e.target.value);
      if (input.trim().length === 0 || input === "") {
        return;
      }
      addTodo(input, check);
      setInput("");
      setCheck(false);
    }
  };
  return (
    <div className="top-inner">
      <div className="top">
        <h1>TODO</h1>
        <img
          src={mode === "light" ? moon : sun}
          onClick={switchMode}
          alt={mode}
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="input">
        <input
          type="checkbox"
          name="checkbox"
          onChange={(e) => checkHandler(e)}
        />
        <input
          type="text"
          className={`input-${mode}`}
          name="todo"
          id="todo"
          required
          minLength={1}
          placeholder="Create new todo"
          onKeyDown={inputHandler}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </form>
    </div>
  );
};
export default Top;
