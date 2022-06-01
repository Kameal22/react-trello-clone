import "../../styles/columnStyles/boardColumn.css";
import { BoardTaskInterface } from "../../interfaces/WorkspaceInterface";
import EditColumnForm from "./EditColumnForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import AddTaskForm from "../task/AddTaskForm";
import Task from "../task/Task";

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

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceId === props.workspaceId;
  });

  const shownBoard = shownWorkspace?.workspaceBoards.find((board) => {
    return board.boardId === props.boardId;
  });

  const shownColumn = shownBoard?.boardColumns.find((column) => {
    return column.columnId === props.columnId;
  });

  const columnTasks = shownColumn?.columnTasks;

  const editAColumn = () => {
    setColumnEditing(!columnEditing);
  };

  const addATask = () => {
    setTaskAdding(!taskAdding);
  };

  return (
    <div className="boardCOLUMNdiv">
      <div className="boardCOLUMNHeader">
        <p>{props.columnName}</p>
        <i onClick={() => editAColumn()} className="bi bi-three-dots"></i>
      </div>

      {columnEditing ? (
        <EditColumnForm
          addTask={addATask}
          setEditing={editAColumn}
          columnId={props.columnId}
          boardId={props.boardId}
          workspaceId={props.workspaceId}
        />
      ) : null}

      {columnTasks?.map((task) => {
        return (
          <Task
            taskName={task.taskName}
            taskId={task.taskId}
            taskIndicatorColor={task.taskIndicatorColor}
            taskDescription={task.taskDescription}
            taskComments={task.taskComments}
            workspaceId={props.workspaceId}
            boardId={props.boardId}
            columnId={props.columnId}
            columnName={props.columnName}
          />
        );
      })}

      {taskAdding ? (
        <AddTaskForm
          addTask={addATask}
          workspaceId={props.workspaceId}
          boardId={props.boardId}
          columnId={props.columnId}
        />
      ) : (
        <div onClick={() => addATask()} className="boardCOLUMNAddTask">
          <i style={{ fontSize: "1.3em" }} className="bi bi-plus"></i>
          <p>Add a task</p>
        </div>
      )}
    </div>
  );
};

export default BoardColumn;
