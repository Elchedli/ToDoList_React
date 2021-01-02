import { observer } from "mobx-react";
import React, { useState } from "react";
import todoStore, { Todo } from "../../context/todoStore";
import "./styles.css";

interface FormProps {
  originalTodo: Todo | null;
}

const Form = observer(({ originalTodo }: FormProps) => {
  const [input, setInput] = useState<string>(originalTodo?.content || "");
  function handleSubmit(e: any) {
    e.preventDefault();
    if (originalTodo === null) {
      todoStore.addTodoItem({ completed: false, content: input });
      setInput("");
    } else {
      todoStore.updateItem({
        ...originalTodo,
        content: input,
      });
      setInput("");
      // setItemsLeft(
      //   todoStore.todoList.filter((todo: Todo) => !todo.completed).length
      // );
    }
  }

  return (
    <div className="form">
      <form action="">
        <h1 className="form__label">todos</h1>
        <input
          className="form__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          type="text"
        />  
        <button className="form__submitTodo" onClick={handleSubmit}>
          set todo
        </button>
      </form>
    </div>
  );
});
export default Form;
