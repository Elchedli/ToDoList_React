import React, { useEffect, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { observer } from "mobx-react";
import todoStore, { Todo } from "../../context/todoStore";
import "./styles.css";

const List = observer(
  ({
    filterBy,
    setItemsLeftNum,
  }: {
    filterBy: "ALL" | "DONE" | "UNDONE";
    setItemsLeftNum: (itemsLeft: number) => void;
  }) => {
    const [filteredList, setFilteredList] = useState<Todo[]>([]);
    useEffect(() => {
      switch (filterBy) {
        case "DONE":
          setFilteredList(
            todoStore.todoList.filter((todo: Todo) => todo.completed)
          );
          break;
        case "UNDONE":
          setFilteredList(
            todoStore.todoList.filter((todo: Todo) => !todo.completed)
          );
          break;
        default:
          setFilteredList(todoStore.todoList);
      }
      setItemsLeftNum(
        todoStore.todoList.filter((todo: Todo) => !todo.completed).length
      );
    }, [todoStore.todoList, filterBy]);

    function handleOnDragEnd(result: any) {
      if (!result.destination) return;
      todoStore.swapOrder(
        filteredList[result.source.index].id,
        filteredList[result.destination.index].id
      );
    }

    function editableHandler(e: ContentEditableEvent, itemId: string) {
      const todo = filteredList.find((e) => e.id === itemId);
      if (todo) {
        todoStore.updateItem({
          ...todo,
          content: e.target.value,
        });
      }
    }

    function reverseCompleted(itemId: string) {
      const todo = filteredList.find((e) => e.id === itemId);
      if (todo) {
        todoStore.updateItem({
          ...todo,
          completed: !todo.completed,
        });
      }
    }
    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              className="list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredList.map((item: Todo, i: number, arr: Todo[]) => (
                <Draggable key={item.id} draggableId={`${item.id}`} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="list__item"
                    >
                      <input
                        className="item__completedCheckbox"
                        type="checkbox"
                        style={{
                          background:
                            item.completed ?
                            'url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E")' : undefined,
                        }}
                        onClick={(e) => {
                          reverseCompleted(item.id);
                        }}
                      />

                      <ContentEditable
                        style={{
                          textDecoration: item.completed && "line-through",
                          opacity: item.completed && 0.5,
                        }}
                        className="todoItem"
                        html={item.content}
                        onChange={(e) => editableHandler(e, item.id)}
                      />
                      <button
                        className="item__destroy"
                        onClick={() => todoStore.deleteItem(item.id)}
                      ></button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

export default List;
