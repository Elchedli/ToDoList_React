import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
// import { useEffect } from "react";
import { observer } from "mobx-react";
function checkTest(elements, i) {
  elements.task[i].checked = !elements.task[i].checked;
  elements.uncompleted = elements.task[i].checked
    ? elements.uncompleted - 1
    : elements.uncompleted + 1;
}

function deleteTask(elements, i) {
  if (!elements.task[i].checked)
    elements.uncompleted = elements.uncompleted - 1;
  elements.task.splice(i, 1);
}

function editableHandler(e, elements) {
  // debugger;
  if (e.target.value !== "")
    elements.task[e.currentTarget.parentNode.id].name = e.target.value;
  else deleteTask(elements, e.currentTarget.parentNode.id);
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

function ActionAfterDrag(result, elements) {
  console.log("Drag fuck : ");
  console.log(elements);
  if (!result.destination) return;
  const { source, destination } = result;
  let copiedItems = [...elements.task];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
  elements.task = [...copiedItems];
}

const escDataAndStyle = (e, elements) => {
  elements.escapedata = e.target.innerText;
  elements.task[e.target.parentNode.id].status = true;
};

const resetStyle = (e, elements) => {
  elements.task[parseInt(e.target.parentNode.id)].status = false;
};
const content = (elements, element, i) => {
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
            onChange={() => checkTest(elements, i)}
          />

          <label>
            <h2 id={i}>
              <ContentEditable
                className="todoItem"
                html={element.name}
                onChange={(e) => editableHandler(e, elements)}
                onKeyDown={(e) => disableNewlines(e, elements)}
                onFocus={(e) => escDataAndStyle(e, elements)}
                onBlur={(e) => resetStyle(e, elements)}
              />
            </h2>
            <button
              onChange={() => {
                deleteTask(elements, i);
              }}
            ></button>
          </label>
        </div>
      )}
    </Draggable>
  );
};

function choiceListe(elements) {
  let choice;
  const x = elements.choice;
  switch (x) {
    case 1:
      choice = elements.task.map((element, i) => {
        return content(elements, element, i);
      });
      break;
    case 2:
      choice = elements.task.map((element, i) => {
        if (!element.checked) return content(elements, element, i);
      });
      break;
    case 3:
      choice = elements.task.map((element, i) => {
        if (element.checked) {
          return content(elements, element, i);
        }
      });
      break;
    case 4:
      choice = elements.task.map((element, i) => {
        return element.checked
          ? deleteTask(elements, i)
          : content(elements, element, i);
      });
      elements.choice = 1;
      break;
    default:
      choice = elements.task.map((element, i) => {
        return content(elements, element, i);
      });
      break;
  }
  return (
    <DragDropContext onDragEnd={(result) => ActionAfterDrag(result, elements)}>
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

export const NewTasks = ({ elements }) => {
  if (elements.task.length !== 0) {
    const total = choiceListe(elements);
    return <>{total}</>;
  }

  return <div id="nothing">No tasks</div>;
};
