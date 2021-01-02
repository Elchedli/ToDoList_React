import React from "react";
import todoStore, { Todo } from "../../context/todoStore";
import { observer } from "mobx-react";
import "./styles.css";

type FilterType = "ALL" | "DONE" | "UNDONE";
const Footer = observer(
  ({
    setFilterBy,
    itemsLeft,
  }: {
    setFilterBy: (filterBy: FilterType) => void;
    itemsLeft: number;
  }) => {
    const clearCompletedHandler = () => {
      let completedTodoList = todoStore.todoList.filter(
        (todo: Todo) => !todo.completed
      );
      todoStore.todoList = completedTodoList;
    };
    return (
      <footer className="footer">
        <span>{itemsLeft} items left</span>

        <button
          className="footer__filterButton"
          onClick={() => setFilterBy("ALL")}
          value="ALL"
        >
          All
        </button>
        <button
          className="footer__filterButton"
          onClick={() => setFilterBy("DONE")}
          value="DONE"
        >
          Completed
        </button>
        <button
          className="footer__filterButton"
          onClick={() => setFilterBy("UNDONE")}
          value="UNDONE"
        >
          Active
        </button>
        <button
          className="footer__clearCompletedButton"
          onClick={clearCompletedHandler}
        >
          Clear completed
        </button>
      </footer>
    );
  }
);

export default Footer;
