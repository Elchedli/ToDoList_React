import "./style.css";
import React, { useState, useContext } from "react";
import { NewTasks } from "./NewTask";
// import uuid from "uuid/v4";
import Tuka from "./store";
import { observer } from "mobx-react";

const ToDo = observer(() => {
  //const [input, setInput] = useState<string>("");

  return (
    <div className="App">
      <h1 className="title">todos</h1>
      <div className="tasks">
        <div className="ToDof">
          <div className="ToDof_SearchInputs">
            <input
              type="checkbox"
              className="SearchInputs_SelectAll"
              onChange={Tuka.switchcheck}
            />
            <input
              value={Tuka.input}
              name="handler"
              placeholder="What needs to be done?"
              className="searchInputs_Search"
              onChange={Tuka.inputTextHandler}
              onKeyUp={Tuka.AddTask}
              type="text"
              autoComplete="false"
            />
          </div>
          <div className="Tasks">
            <NewTasks />
          </div>
          <div className="ToDof_params">
            <span>{Tuka.uncompleted} items left</span>
            <button onClick={(e) => Tuka.changechoice(e, 1)}>All</button>
            <button onClick={(e) => Tuka.changechoice(e, 2)}>Active</button>
            <button onClick={(e) => Tuka.changechoice(e, 3)}>Completed</button>
            <button id="clear" onClick={(e) => Tuka.changechoice(e, 4)}>
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
