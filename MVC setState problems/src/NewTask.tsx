import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
// import { useEffect } from "react";

export const NewTasks = ({ elements, setTasks }) => {
  var OldInput = "";
  function checkTest(i) {
    const newState = { ...elements };
    newState.task[i].checked = !newState.task[i].checked;
    newState.uncompleted = newState.task[i].checked
      ? newState.uncompleted - 1
      : newState.uncompleted + 1;
    setTasks(newState);
  }

  function deleteTask(i) {
    setTasks((prev) => {
      let total = { ...prev };
      total.task.splice(i, 1);
      return total;
    });
    // let newState = { ...elements };
    // if (!newState.task[i].checked)
    //   newState.uncompleted = newState.uncompleted - 1;
    // setTasks(newState);
  }

  function deleteTaskButton(e, i) {
    // debugger;
    // e.preventDefault();
    // e.stopPropagation();
    setTasks((prev) => {
      let total = { ...prev };
      total.task.splice(i, 1);
      return total;
    });
    console.log("normally you...");
  }

  function editableHandler(e) {
    // debugger;
    if (e.target.value !== "")
      elements.task[e.currentTarget.parentNode.id].name = e.target.value;
    else {
      deleteTask(e.currentTarget.parentNode.id);
      console.log("did you delete?");
    }
  }

  const disableNewlines = (event) => {
    const Code = event.code;
    if (Code === "Enter") {
      event.target.blur();
      if (event.preventDefault) event.preventDefault();
    } else if (Code === "Escape") {
      // debugger;
      // console.log("please show it : " + elements.escapedata);
      // event.target.innerText = OldInput;
      setTasks((prev) => {
        let total = { ...prev };
        total.task[event.target.parentNode.id].name = OldInput;
        return total;
      });
      event.target.blur();
      // elements.task[event.target.parentNode.id].name = OldInput;
      // event.target.blur();
    }
  };

  function ActionAfterDrag(result) {
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

  const escDataAndStyle = (e) => {
    setTasks((prev) => {
      let total = { ...prev };
      OldInput = e.target.innerText;
      total.task[e.target.parentNode.id].status = true;
      console.log("After Focus : ");
      return total;
    });
  };

  const resetStyle = (e) => {
    setTasks((prev) => {
      let total = { ...prev };
      total.task[parseInt(e.target.parentNode.id)].status = false;
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
              <button onClick={(e) => deleteTaskButton(e, i)} />
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
        // setTasks({
        //   choice: 1,
        // });
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
