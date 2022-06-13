import "../../styles/taskStyles/taskOptionsForm.css";
import { deleteTask, copyTask } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";

interface OptionsFormInterface {
  showForm: () => void;
  editLabels: () => void;
  showDetails: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string;
}

const TaskOptionsForm: React.FC<OptionsFormInterface> = (props) => {
  const dispatch = useDispatch();

  const deleteTaskFunc = () => {
    dispatch(
      deleteTask({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.columnId,
        taskId: props.taskId,
      })
    );
    props.showForm();
    window.location.reload();
  };

  const copyTaskFunc = () => {
    dispatch(
      copyTask({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.columnId,
        taskId: props.taskId,
      })
    );
    props.showForm();
  };

  const showDetailsFunc = () => {
    props.showDetails();
    props.showForm();
  };

  const editLabelsFunc = () => {
    props.editLabels();
    props.showForm();
  };

  return (
    <div className="taskOptionsFormDiv">
      <p onClick={() => showDetailsFunc()}>Open task</p>

      <p onClick={() => editLabelsFunc()}>Edit labels</p>

      <p onClick={() => copyTaskFunc()}>Copy task</p>

      <p onClick={() => deleteTaskFunc()}>Delete task</p>
    </div>
  );
};

export default TaskOptionsForm;
