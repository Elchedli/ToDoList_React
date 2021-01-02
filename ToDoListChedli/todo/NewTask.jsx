import React from "react";
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
  if(!newState.task[i].checked) newState.uncompleted = newState.uncompleted - 1;
  newState.task.splice(i, 1);
  setTasks(newState);
}
const content = (elements, element, setTasks, i) => {
  return (
    <div className={element.checked ? "checked" : "todo"}>
      <input
        id={"label-" + element.id}
        type="checkbox"
        onChange={() => checkTest(elements, setTasks, i)}
      />
      <label htmlFor={"label-" + element.id}>
        <h2>
          {element.name}
          <span>{element.name}</span>
        </h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteTask(elements, setTasks, i);
          }}
        ></button>
      </label>
    </div>
  );
};

function choiceListe(elements, setTasks) {
  let choice;
  debugger;
  const x = elements.choice;
  // debugger;
  switch (x) {
    case 1:
      choice = elements.task.map((element, i) => {
        return content(elements, element, setTasks,i);
      });
      break;
    case 2:
      choice = elements.task.map((element, i) => {
        // debugger;
        if (!element.checked) return content(elements, element, setTasks,i);
      });
      break;
    case 3:
      choice = elements.task.map((element, i) => {
        if (element.checked){
          // debugger;
          return content(elements, element, setTasks,i);
        }
      });
      break;
    case 4:
      choice = elements.task.map((element, i) => {
        return element.checked ? deleteTask(elements, setTasks, i) :  content(elements, element, setTasks,i);          
      });
      elements.choice = 1;
      break;
    default:
      choice = elements.task.map((element, i) => {
        return elements, element, setTasks, i;
      });
      break;
  }
  return choice;
}

export const NewTasks = ({ elements, setTasks }) => {
  if (elements.task.length !== 0) {
    // debugger;
    const total = choiceListe(elements,setTasks);
    return <>{total}</>;
  }

  return <div id="nothing">No tasks</div>;
};
