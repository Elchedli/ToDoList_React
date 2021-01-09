import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useEffect } from "react";
function checkTest(elements, setTasks, i) {
  const newState = { ...elements };
  newState.task[i].checked = !newState.task[i].checked;
  newState.uncompleted = newState.task[i].checked
    ? newState.uncompleted - 1
    : newState.uncompleted + 1;
  setTasks(newState);
}

function deleteTask(elements, setTasks, i) {
  let newState = { ...elements };
  if (!newState.task[i].checked)
    newState.uncompleted = newState.uncompleted - 1;
  newState.task.splice(i, 1);
  setTasks(newState);
}

function editableHandler(e, elements, setTasks) {
  // debugger;
  if (e.target.value !== "")
    elements.task[e.currentTarget.parentNode.id].name = e.target.value;
  else deleteTask(elements, setTasks, e.currentTarget.parentNode.id);
}

const disableNewlines = (event, elements) => {
  const Code = event.code;
  if (Code === "Enter") {
    event.target.blur();
    if (event.preventDefault) event.preventDefault();
  } else if (Code === "Escape") {
    debugger;
    console.log("please show it : " + elements.escapedata);
    event.target.innerText = elements.escapedata;
    event.target.blur();
  }
};

function ActionAfterDrag(result, elements, setTasks) {
  console.log("Drag fuck : ");
  console.log(elements);
  if (!result.destination) return;

  setTasks((prev) => {
    const { source, destination } = result;
    let copiedItems = [...elements.task];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    let total = { ...prev };
    total.task = [...copiedItems];
    return total;
  });
}

const escDataAndStyle = (e, setTasks) => {
  setTasks((prev) => {
    let total = { ...prev };
    total.escapedata = e.target.innerText;
    total.task[e.target.parentNode.id].status = true;
    console.log("After Focus : ");
    return total;
  });
};

const resetStyle = (e, elements, setTasks) => {
  setTasks((prev) => {
    let total = { ...prev };
    total.task[parseInt(e.target.parentNode.id)].status = false;
    return total;
  });
};
const content = (elements, element, setTasks, i) => {
  return (
    <Draggable key={element.id} draggableId={`${element.id}`} index={i}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            "todocol" +
            (element.checked ? " checked" : "") +
            (element.status ? " focus" : "")
          }
        >
          <input
            id={"label-" + element.id}
            type="checkbox"
            onChange={() => checkTest(elements, setTasks, i)}
          />

          <label>
            <h2 id={i}>
              <ContentEditable
                className="todoItem"
                html={element.name}
                onChange={(e) => editableHandler(e, elements, setTasks)}
                onKeyDown={(e) => disableNewlines(e, elements)}
                onFocus={(e) => escDataAndStyle(e, setTasks)}
                onBlur={(e) => resetStyle(e, elements, setTasks)}
              />
            </h2>
            <button
              onChange={() => {
                deleteTask(elements, setTasks, i);
              }}
            ></button>
          </label>
        </div>
      )}
    </Draggable>
  );
};

function choiceListe(elements, setTasks) {
  let choice;
  const x = elements.choice;
  switch (x) {
    case 1:
      choice = elements.task.map((element, i) => {
        return content(elements, element, setTasks, i);
      });
      break;
    case 2:
      choice = elements.task.map((element, i) => {
        if (!element.checked) return content(elements, element, setTasks, i);
      });
      break;
    case 3:
      choice = elements.task.map((element, i) => {
        if (element.checked) {
          return content(elements, element, setTasks, i);
        }
      });
      break;
    case 4:
      choice = elements.task.map((element, i) => {
        return element.checked
          ? deleteTask(elements, setTasks, i)
          : content(elements, element, setTasks, i);
      });
      elements.choice = 1;
      break;
    default:
      choice = elements.task.map((element, i) => {
        return content(elements, element, setTasks, i);
      });
      break;
  }
  return (
    <DragDropContext
      onDragEnd={(result) => ActionAfterDrag(result, elements, setTasks)}
    >
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
}

export const NewTasks = ({ elements, setTasks }) => {
  if (elements.task.length !== 0) {
    const total = choiceListe(elements, setTasks);
    return <>{total}</>;
  }

  return <div id="nothing">No tasks</div>;
};
