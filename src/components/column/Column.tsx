import "../../styles/columnStyles/column.css";
import { TaskInterface } from "../../interfaces/WorkspaceInterface";
import EditColumnForm from "./EditColumnForm";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import AddTaskForm from "../task/AddTaskForm";
import Task from "../task/Task";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { reArangeColumn } from "../../redux/features/WorkspaceSlice";

interface ColumnInterface {
  columnName: string;
  columnId: string | undefined;
  boardId: string | undefined;
  workspaceId: string | undefined;
  columnTasks: TaskInterface[];
}

const Column: React.FC<ColumnInterface> = (props) => {
  const [columnEditing, setColumnEditing] = useState<boolean>(false);
  const [taskAdding, setTaskAdding] = useState<boolean>(false);

  const dispatch = useDispatch();

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

  const columnReArange = (tasks: TaskInterface[] | undefined) => {
    dispatch(
      reArangeColumn({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.columnId,
        tasks: tasks,
      })
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const items = columnTasks;

    if (items) {
      const [newOrder] = items.splice(source.index, 1);

      items.splice(destination.index, 0, newOrder);
    }

    columnReArange(items);
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

      {/* REFACTOR COLUMN NAME TO COLUMN ID */}

      <Droppable droppableId={props.columnName}>
        {(provided) => (
          <div
            className="droppableTasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columnTasks?.map((task, index) => {
              return (
                <Task
                  key={task.taskId}
                  taskName={task.taskName}
                  taskId={task.taskId}
                  taskIndicatorColor={task.taskIndicatorColor}
                  taskDescription={task.taskDescription}
                  taskComments={task.taskComments}
                  workspaceId={props.workspaceId}
                  boardId={props.boardId}
                  columnId={props.columnId}
                  columnName={props.columnName}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {taskAdding ? (
        <AddTaskForm
          key={props.columnId}
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

export default Column;
