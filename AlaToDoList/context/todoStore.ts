// import { Todo } from "../components/List";
import { makeObservable, observable, computed, action } from "mobx";
import { nanoid } from "nanoid";
export interface Todo {
  completed: boolean;
  content: string;
  id: string;
}

class createTodoStore {
  todoList: Todo[] = [];

  constructor() {
    makeObservable(this, {
      todoList: observable,
      addTodoItem: action,
      deleteItem: action,
      updateItem: action,
    })
  }

  addTodoItem = ({
    completed,
    content,
  }: {
    completed: boolean;
    content: string;
  }): void => {
    this.todoList = [
      ...this.todoList,
      {
        id: nanoid(),
        completed,
        content,
      },
    ];
  };

  deleteItem = (id: string) => {
    this.todoList = this.todoList.filter((value: Todo) => value.id !== id);
  };

  updateItem = (todo: Todo) => {
    this.todoList = this.todoList.map((e) => (e.id === todo.id ? todo : e));
  };

  swapOrder = (firstItemId: string, secondItemId: string) => {
    const idList = this.todoList.map((e) => e.id);
    const firstItemIndex = idList.indexOf(firstItemId);
    const secondItemIndex = idList.indexOf(secondItemId);
    var temp = this.todoList[firstItemIndex];
    this.todoList[firstItemIndex] = this.todoList[secondItemIndex];
    this.todoList[secondItemIndex] = temp;
  };
}

const todoStore = new createTodoStore();

export default todoStore;
