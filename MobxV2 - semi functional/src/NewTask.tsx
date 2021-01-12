// import { useEffect } from "react";
// import { observer } from "mobx-react";
import Tuka from "./store";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContentEditable from "react-contenteditable";
import { observer } from "mobx-react";
var content = (element, i) => {
  return (
    <Draggable key={element.id} draggableId={`${element.id}`} index={i}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            "todocol" +
            (Tuka.task[i].checked ? " checked" : "") +
            (Tuka.task[i].status ? " focus" : "")
          }
        >
          <input
            id={"label-" + element.id}
            type="checkbox"
            onChange={() => Tuka.checkTest(i)}
          />

          <label>
            <h2 id={i}>
              <ContentEditable
                className="todoItem"
                html={element.name}
                onChange={(e) => Tuka.editableHandler(e)}
                onKeyDown={(e) => Tuka.disableNewlines(e)}
                onFocus={(e) => Tuka.escDataAndStyle(e)}
                onBlur={(e) => Tuka.resetStyle(e)}
              />
            </h2>
            <button
              onChange={() => {
                Tuka.deleteTask(i);
              }}
            ></button>
          </label>
        </div>
      )}
    </Draggable>
  );
};

const choiceListe = () => {
  let choice;
  const x = Tuka.choice;
  switch (x) {
    case 1:
      choice = Tuka.task.map((element, i) => {
        return content(element, i);
      });
      break;
    case 2:
      choice = Tuka.task.map((element, i) => {
        if (!element.checked) return content(element, i);
      });
      break;
    case 3:
      choice = Tuka.task.map((element, i) => {
        if (element.checked) {
          return content(element, i);
        }
      });
      break;
    case 4:
      choice = Tuka.task.map((element, i) => {
        return element.checked ? Tuka.deleteTask(i) : content(element, i);
      });
      Tuka.choice = 1;
      break;
    default:
      choice = Tuka.task.map((element, i) => {
        return content(element, i);
      });
      break;
  }
  return (
    <DragDropContext onDragEnd={(result) => Tuka.ActionAfterDrag(result)}>
      <Droppable droppableId="list" key="list">
        {(provided) => {
          return (
            <div
              className="list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {choice}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export var NewTasks = observer(() => {
  if (Tuka.task.length !== 0) {
    const total = choiceListe();
    return <>{total}</>;
  }
  return <div id="nothing">No tasks</div>;
});
