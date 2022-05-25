import "../../styles/boardStyles/boardColumn.css";
import { BoardTaskInterface } from "../../interfaces/WorkspaceInterface";
import EditColumnForm from "./EditColumnForm";
import { useState } from "react";
import AddTaskForm from "./AddTaskForm";

interface ColumnInterface {
  columnName: string;
  columnId: string | undefined;
  boardId: string | undefined;
  workspaceId: string | undefined;
  columnTasks: BoardTaskInterface[];
}

const BoardColumn: React.FC<ColumnInterface> = (props) => {
  const [columnEditing, setColumnEditing] = useState<boolean>(false);
  const [taskAdding, setTaskAdding] = useState<boolean>(false);

  const editAColumn = () => {
    setColumnEditing(!columnEditing);
  };

  const addATask = () => {
    setTaskAdding(!taskAdding)
  }

  return (
    <div className="boardCOLUMNdiv">
      <div className="boardCOLUMNHeader">
        <p>{props.columnName}</p>
        <i onClick={() => editAColumn()} className="bi bi-three-dots"></i>
      </div>

      {columnEditing ? (
        <EditColumnForm
          closeEditing={editAColumn}
          columnId={props.columnId}
          boardId={props.boardId}
          workspaceId={props.workspaceId}
        />
      ) : null}



      {taskAdding ? <AddTaskForm addTask={addATask} /> : <div onClick={() => addATask()} className="boardCOLUMNAddTask">
        <i style={{ fontSize: "1.3em" }} className="bi bi-plus"></i>
        <p>Add a task</p>
      </div>}
    </div>
  );
};

export default BoardColumn;
