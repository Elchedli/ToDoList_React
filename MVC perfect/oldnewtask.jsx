import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContentEditable from "react-contenteditable";
export const NewTasks = ({ elements, setTasks }) => {
  var OldInput = "";
  function checkTest(i) {
    setTasks((prev) => {
      let total = { ...prev };
      total.choice = 1;
      total.task[i].checked = !total.task[i].checked;
      total.uncompleted = total.task[i].checked
        ? total.uncompleted - 1
        : total.uncompleted + 1;
      return total;
    });
  }

  function deleteTask(i) {
    setTasks(() => {
      let total = { ...elements };
      total.task.splice(i, 1);
      elements = total;
      return total;
    });
  }
  function editableHandler(e) {
    if (e.target.value !== "")
      elements.task[e.currentTarget.parentNode.id].name = e.target.value;
    else {
      deleteTask(e.currentTarget.parentNode.id);
    }
  }

  const disableNewlines = (event) => {
    const Code = event.code;
    if (Code === "Enter") {
      event.target.blur();
      if (event.preventDefault) event.preventDefault();
    } else if (Code === "Escape") {
      setTasks(() => {
        let total = { ...elements };
        total.task[event.target.parentNode.id].name = OldInput;
        elements = total;
        return total;
      });
      event.target.blur();
    }
  };

  function ActionAfterDrag(result) {
    if (!result.destination) return;
    setTasks(() => {
      const { source, destination } = result;
      let copiedItems = [...elements.task];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      elements.task = [...copiedItems];
      return elements;
    });
  }

  const escDataAndStyle = (e) => {
    setTasks(() => {
      let total = { ...elements };
      OldInput = e.target.innerText;
      total.task[e.target.parentNode.id].status = true;
      elements = total;
      return total;
    });
  };

  const resetStyle = (e) => {
    setTasks(() => {
      let total = { ...elements };
      total.task[parseInt(e.target.parentNode.id)].status = false;
      elements = total;
      return total;
    });
  };
  const content = (element, i) => {
    return (
      <Draggable key={element.id} draggableId={`${element.id}`} index={i}>
        {(provided) => (
          <div
            onClick={(e) => e.preventDefault()}
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
              onChange={() => checkTest(i)}
            />

            <label>
              <h2 id={i}>
                <ContentEditable
                  className="todoItem"
                  html={element.name}
                  onChange={(e) => editableHandler(e)}
                  onKeyDown={(e) => disableNewlines(e)}
                  onFocus={(e) => escDataAndStyle(e)}
                  onBlur={(e) => resetStyle(e)}
                />
              </h2>
              <button onClick={(e) => deleteTask(i)} />
            </label>
          </div>
        )}
      </Draggable>
    );
  };

  function choiceListe() {
    let choice;
    const x = elements.choice;
    switch (x) {
      case 1:
        choice = elements.task.map((element, i) => {
          return content(element, i);
        });
        break;
      case 2:
        choice = elements.task.map((element, i) => {
          if (!element.checked) return content(element, i);
        });
        break;
      case 3:
        choice = elements.task.map((element, i) => {
          if (element.checked) {
            return content(element, i);
          }
        });
        break;
      case 4:
        choice = elements.task.map((element, i) => {
          return element.checked ? deleteTask(i) : content(element, i);
        });
        elements.choice = 1;
        break;
      default:
        choice = elements.task.map((element, i) => {
          return content(element, i);
        });
        break;
    }
    return (
      <DragDropContext onDragEnd={(result) => ActionAfterDrag(result)}>
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
  if (elements.task.length !== 0) {
    const total = choiceListe();
    return <>{total}</>;
  }

  return <div id="nothing">No tasks</div>;
};
