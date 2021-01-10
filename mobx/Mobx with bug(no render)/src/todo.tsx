import "./style.css";
import React, { useState, useContext } from "react";
import { NewTasks } from "./NewTask";
import uuid from "uuid/v4";
import Tuka from "./store";
import { observer } from "mobx-react";

const ToDo = observer(() => {
  const [input, setInput] = useState<string>("");
  const inputTextHandler = (e: any) => {
    setInput(e.target.value);
  };
  // const handleClick = (e: any) => {};

  const switchcheck = (e) => {
    if (e.target.checked) {
      Tuka.task.map((element) => (element.checked = true));
      Tuka.uncompleted = 0;
    } else {
      Tuka.task.map((element) => (element.checked = false));
      Tuka.uncompleted = Tuka.task.length;
    }
  };
  const changechoice = (e, x) => {
    e.preventDefault();
    Tuka.choice = x;
  };

  const AddTask = (e) => {
    if (e.code === "Enter") {
      if (input === "") alert("veuillez remplir votre tache");
      else {
        Tuka.task.push({
          name: input,
          completed: false,
          checked: false,
          status: false,
          id: uuid(),
        });
        Tuka.uncompleted = Tuka.uncompleted + 1;
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
            <NewTasks elements={Tuka} />
          </div>
          <div className="ToDof_params">
            <span>{Tuka.uncompleted} items left</span>
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
});
export default ToDo;
