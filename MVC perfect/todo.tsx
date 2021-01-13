import "./style.css";
import React, { useState } from "react";
import { NewTasks } from "./NewTask";
import uuid from "uuid/v4";
interface Custom {
  task: ElAttr[];
  uncompleted: number;
  choice: number;
  escapedata: string;
}

interface ElAttr {
  name: string;
  completed: boolean;
  checked: boolean;
  status: boolean;
  id: number;
}
const ToDo = () => {
  const [input, setInput] = useState<string>("");
  var [Tasks, setTasks] = useState<Custom>({
    task: [],
    uncompleted: 0,
    choice: 1,
    escapedata: "",
  });
  const inputTextHandler = (e) => {
    setInput(e.target.value);
  };

  // const handleClick = (e: any) => {};

  const switchcheck = (e) => {
    const old = { ...Tasks };
    if (e.target.checked) {
      old.task.map((element) => (element.checked = true));
      old.uncompleted = 0;
    } else {
      old.task.map((element) => (element.checked = false));
      old.uncompleted = old.task.length;
    }
    setTasks(old);
  };
  const changechoice = (e, x) => {
    e.preventDefault();
    Tasks.choice = x;
  };

  const AddTask = (e) => {
    if (e.code === "Enter") {
      if (input === "") alert("veuillez remplir votre tache");
      else {
        setTasks(() => {
          let total = { ...Tasks };
          total.task.push({
            name: input,
            completed: false,
            checked: false,
            status: false,
            id: uuid(),
          });
          total.uncompleted = Tasks.uncompleted + 1;
          // Tasks = total;
          Tasks = total;
          return total;
        });
        setInput("");
      }
    }
  };
  return (
    <div className="App">
      <h1 className="title">todos</h1>
      <div className="tasks">
        <div className="ToDof">
          <div className="ToDof_SearchInputs">
            <input
              type="checkbox"
              className="SearchInputs_SelectAll"
              onChange={switchcheck}
            />
            <input
              value={input}
              name="handler"
              placeholder="What needs to be done?"
              className="searchInputs_Search"
              onChange={inputTextHandler}
              onKeyUp={AddTask}
              type="text"
              autoComplete="false"
            />
          </div>
          <div className="Tasks">
            <NewTasks elements={Tasks} setTasks={setTasks} />
          </div>
          <div className="ToDof_params">
            <span>{Tasks.uncompleted} items left</span>
            <button onClick={(e) => changechoice(e, 1)}>All</button>
            <button onClick={(e) => changechoice(e, 2)}>Active</button>
            <button onClick={(e) => changechoice(e, 3)}>Completed</button>
            <button id="clear" onClick={(e) => changechoice(e, 4)}>
              Clear Completed
            </button>
          </div>
        </div>
        {/* <footer className="info"></footer> */}
      </div>
    </div>
  );
};

export default ToDo;
