import { observable } from "mobx";
import { createContext } from "react";
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
  @observable task = new Array<ElAttr>();
  @observable uncompleted = 0;
  @observable choice = 1;
  @observable escapedata = "";
  @observable input = "";
}

var Tuka = new ToDo();
export default Tuka;
