import React, { useEffect, useState } from "react";
import Form from "../Form";
import List from "../List";
import Footer from "../Footer"
import todoStore, { Todo } from "../../context/todoStore";
import "./styles.css";

type FilterType = "ALL" | "DONE" | "UNDONE";
const App = () => {
  const [filterBy, setFilterBy] = useState<FilterType>("ALL");
  const [itemsLeft, setItemsLeftNum] = useState(0);
  const [toggleAll, setToggleAll] = useState<boolean | null>(null);

  const toggleAllHandler = () => {
    if (toggleAll) {
      todoStore.todoList.forEach((todo: Todo) =>
        !todo.completed ? todo.completed : (todo.completed = !todo.completed)
      );
      setToggleAll(false);
    } else {
      todoStore.todoList.forEach((todo: Todo) =>
        todo.completed ? todo.completed : (todo.completed = !todo.completed)
      );
      setToggleAll(true);
    }
    setItemsLeftNum(
      todoStore.todoList.filter((todo: Todo) => !todo.completed).length
    );
  };


  return (
    <div className="app">
      <div className="app__container">
        <Form originalTodo={null} />
        <input type="checkbox" className={`app__toggleAll ${toggleAll && "onKeyDown"}`} />
        <label onClick={toggleAllHandler} htmlFor="app__toggleAll"></label>
        <List setItemsLeftNum={setItemsLeftNum} filterBy={filterBy} />
        <Footer setFilterBy={setFilterBy} itemsLeft={itemsLeft} />
      </div>
    </div>
  );
};

export default App;
