import "../../styles/taskStyles/taskOptionsForm.css";
import { deleteTask } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";

interface OptionsFormInterface {
  showForm: () => void;
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
  };
  return (
    <div className="taskOptionsFormDiv">
      <p>Open task</p>

      <p>Edit labels</p>

      <p>Copy task</p>

      <p onClick={() => deleteTaskFunc()}>Delete task</p>
    </div>
  );
};

export default TaskOptionsForm;
