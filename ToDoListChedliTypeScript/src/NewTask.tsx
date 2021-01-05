import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
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

const content = (elements, element, setTasks, i) => {
  return (
    <Draggable key={element.id} draggableId={`${element.id}`} index={i}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={element.checked ? "checked" : "notchecked"}
        >
          <input
            id={"label-" + element.id}
            type="checkbox"
            onChange={() => checkTest(elements, setTasks, i)}
          />

          <label htmlFor={"label-" + element.id}>
            <h2>
              <ContentEditable
                className="todoItem"
                html={element.name}
                onChange={(e) => editableHandler(e, elements, i)}
                onKeyPress={disableNewlines}
              />
            </h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteTask(elements, setTasks, i);
              }}
            ></button>
          </label>
        </div>
      )}
    </Draggable>
  );
};

function ActionAfterDrag(result, elements, setTasks) {
  console.log("drag done");
  if (!result.destination) return;
  const { source, destination } = result;
  const copiedItems = [...elements.task];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
  setTasks({
    ...elements,
    task: copiedItems,
  });
}

function editableHandler(e: ContentEditableEvent, elements, i) {
  if (e.target.value !== "") elements.task[i].name = e.target.value;
}

const disableNewlines = (event) => {
  const keyCode = event.keyCode || event.which;
  if (keyCode === 13) {
    event.target.blur();
    if (event.preventDefault) event.preventDefault();
  }
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
