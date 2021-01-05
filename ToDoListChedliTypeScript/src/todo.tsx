import "./design.css";
import React, { useState } from "react";
import { NewTasks } from "./NewTask";
import uuid from "uuid/v4";
interface Custom {
  task: ElAttr[];
  uncompleted: number;
  choice: number;
}

interface ElAttr {
  name: string;
  completed: boolean;
  checked: boolean;
  id: number;
}
const ToDo = () => {
  const [input, setInput] = useState<string>("");
  const [Tasks, setTasks] = useState<Custom>({
    task: [],
    uncompleted: 0,
    choice: 1,
  });
  const inputTextHandler = (e: any) => {
    setInput(e.target.value);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    if (input === "") alert("veuillez remplir votre tache");
    else {
      const old = { ...Tasks };
      old.task.push({
        name: input,
        completed: false,
        checked: false,
        id: uuid(),
      });
      old.uncompleted = old.uncompleted + 1;
      setTasks(old);
      setInput("");
    }
  };

  const changechoice = (e, x) => {
    e.preventDefault();
    const old = { ...Tasks };
    old.choice = x;
    setTasks(old);
    // debugger;
  };
  return (
    <div className="App">
      <div className="tasks">
        <form name="f">
          <h1 className="title">To Do List</h1>
          <input
            value={input}
            name="handler"
            placeholder="What needs to be added?"
            className="modifier"
            onChange={inputTextHandler}
            type="text"
          />
          <button onClick={handleClick}></button>
          <div className="Tasks">
            <NewTasks elements={Tasks} setTasks={setTasks} />
          </div>
          <div className="params">
            <span>{Tasks.uncompleted} items left</span>
            <button onClick={(e) => changechoice(e, 1)}>All</button>
            <button onClick={(e) => changechoice(e, 2)}>Active</button>
            <button onClick={(e) => changechoice(e, 3)}>Completed</button>
            <button id="clear" onClick={(e) => changechoice(e, 4)}>
              Clear Completed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ToDo;
