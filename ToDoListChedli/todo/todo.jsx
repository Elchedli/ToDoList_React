import "./design.css";
import React, { useState } from "react";
import { NewTasks } from "./NewTask";

const ToDo = () => {
  const [Tasks, setTasks] = useState({ task: [], uncompleted: 0, choice: 1 });
  var test = "";
  const inputTextHandler = (e) => {
    test = e.target.value;
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (test === "") alert("veuillez remplir votre tache");
    else {
      const old = { ...Tasks };
      old.task.push({
        name: test,
        completed: false,
        checked: false,
        id: Math.floor(Math.random() * Math.floor(1000)),
      });
      old.uncompleted = old.uncompleted + 1;
      setTasks(old);
      document.getElementsByName('f')[0].handler.value = "";
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
            id="zemzem"
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
