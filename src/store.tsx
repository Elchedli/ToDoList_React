import { makeObservable, observable, action } from "mobx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContentEditable from "react-contenteditable";
import uuid from "uuid/v4";
interface ElAttr {
  name: string;
  completed: boolean;
  checked: boolean;
  status: boolean;
  id: number;
}

interface Custom {
  task: ElAttr[];
  uncompleted: number;
  choice: number;
  escapedata: string;
  input: string;
}

class ToDo {
  task = new Array<ElAttr>();
  uncompleted = 0;
  choice = 1;
  escapedata = "";
  input = "";
  constructor() {
    makeObservable(this, {
      task: observable,
      uncompleted: observable,
      choice: observable,
      input: observable,
      inputTextHandler: action,
      switchcheck: action,
      changechoice: action,
      AddTask: action,
      checkTest: action,
      deleteTask: action,
      editableHandler: action,
      disableNewlines: action,
      ActionAfterDrag: action,
      escDataAndStyle: action,
      resetStyle: action,
      content: action,
      choiceListe: action,
    });
  }

  inputTextHandler = (e: any) => {
    this.input = e.target.value;
    //setInput(e.target.value);
  };
  // const handleClick = (e: any) => {};

  switchcheck = (e) => {
    if (e.target.checked) {
      this.task.map((element) => (element.checked = true));
      this.uncompleted = 0;
    } else {
      this.task.map((element) => (element.checked = false));
      this.uncompleted = this.task.length;
    }
  };
  changechoice = (e, x) => {
    e.preventDefault();
    this.choice = x;
    this.task[0].name = "bro";
  };
  AddTask = (e) => {
    if (e.code === "Enter") {
      if (this.input === "") alert("veuillez remplir votre tache");
      else {
        this.task.push({
          name: this.input,
          completed: false,
          checked: false,
          status: false,
          id: uuid(),
        });
        this.uncompleted = this.uncompleted + 1;
        this.input = "";
      }
    }
  };

  checkTest = (i: number) => {
    this.task[i].checked = !this.task[i].checked;
    this.uncompleted = this.task[i].checked
      ? this.uncompleted - 1
      : this.uncompleted + 1;
  };

  deleteTask = (i: number) => {
    if (!this.task[i].checked) this.uncompleted = this.uncompleted - 1;
    this.task.splice(i, 1);
  };

  editableHandler = (e) => {
    // debugger;
    if (e.target.value !== "")
      this.task[e.currentTarget.parentNode.id].name = e.target.value;
    else this.deleteTask(e.currentTarget.parentNode.id);
  };

  disableNewlines = (event) => {
    const Code = event.code;
    if (Code === "Enter") {
      event.target.blur();
      if (event.preventDefault) event.preventDefault();
    } else if (Code === "Escape") {
      debugger;
      console.log("please show it : " + this.escapedata);
      event.target.innerText = this.escapedata;
      event.target.blur();
    }
  };

  ActionAfterDrag = (result) => {
    console.log("Drag happened : ");
    console.log(this);
    if (!result.destination) return;
    const { source, destination } = result;
    let copiedItems = [...this.task];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    this.task = [...copiedItems];
  };

  escDataAndStyle = (e) => {
    this.escapedata = e.target.innerText;
    this.task[e.target.parentNode.id].status = true;
  };

  resetStyle = (e) => {
    this.task[parseInt(e.target.parentNode.id)].status = false;
  };
  content = (element, i) => {
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
              onChange={() => this.checkTest(i)}
            />

            <label>
              <h2 id={i}>
                <ContentEditable
                  className="todoItem"
                  html={element.name}
                  onChange={(e) => this.editableHandler(e)}
                  onKeyDown={(e) => this.disableNewlines(e)}
                  onFocus={(e) => this.escDataAndStyle(e)}
                  onBlur={(e) => this.resetStyle(e)}
                />
              </h2>
              <button
                onChange={() => {
                  this.deleteTask(i);
                }}
              ></button>
            </label>
          </div>
        )}
      </Draggable>
    );
  };

  choiceListe = () => {
    let choice;
    const x = this.choice;
    switch (x) {
      case 1:
        choice = this.task.map((element, i) => {
          return this.content(element, i);
        });
        break;
      case 2:
        choice = this.task.map((element, i) => {
          if (!element.checked) return this.content(element, i);
        });
        break;
      case 3:
        choice = this.task.map((element, i) => {
          if (element.checked) {
            return this.content(element, i);
          }
        });
        break;
      case 4:
        choice = this.task.map((element, i) => {
          return element.checked
            ? this.deleteTask(i)
            : this.content(element, i);
        });
        this.choice = 1;
        break;
      default:
        choice = this.task.map((element, i) => {
          return this.content(element, i);
        });
        break;
    }
    return (
      <DragDropContext onDragEnd={(result) => this.ActionAfterDrag(result)}>
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
}

var Tuka = new ToDo();
export default Tuka;
