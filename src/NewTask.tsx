// import { useEffect } from "react";
// import { observer } from "mobx-react";
import Tuka from "./store";
export const NewTasks = () => {
  if (Tuka.task.length !== 0) {
    const total = Tuka.choiceListe();
    return <>{total}</>;
  }
  return <div id="nothing">No tasks</div>;
};
