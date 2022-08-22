import "../../styles/taskStyles/taskOptionsForm.css";
import { deleteTask, copyTask } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { handleRemoveHighlightedTaskOnTaskDeleting } from "../../utils/SetHighlightedTask";
import { useSetHT } from "../../context/highlightedTaskContext";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";
import { useContext } from "react";

interface OptionsFormInterface {
  showForm: () => void;
  editLabels: () => void;
  showDetails: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const TaskOptionsForm: React.FC<OptionsFormInterface> = ({
  showDetails,
  showForm,
  editLabels,
  workspaceId,
  boardId,
  columnId,
  taskId,
  forwardRef,
}) => {
  const dispatch = useDispatch();
  const highlights = useContext(HighlightedTaskContext);
  const setHighlights = useSetHT();

  const handleRemoveHighlight = (taskId: string) => {
    handleRemoveHighlightedTaskOnTaskDeleting(
      highlights,
      taskId,
      setHighlights
    );
  };

  const deleteTaskFunc = () => {
    dispatch(
      deleteTask({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
      })
    );
    handleRemoveHighlight(taskId);
    showForm();
  };

  const copyTaskFunc = () => {
    dispatch(
      copyTask({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
      })
    );
    showForm();
  };

  const showDetailsFunc = () => {
    showDetails();
    showForm();
  };

  const editLabelsFunc = () => {
    editLabels();
    showForm();
  };

  return (
    <div ref={forwardRef} className="taskOptionsFormDiv">
      <p onClick={showDetailsFunc}>Open task</p>

      <p onClick={editLabelsFunc}>Edit labels</p>

      <p onClick={copyTaskFunc}>Copy task</p>

      <p onClick={deleteTaskFunc}>Delete task</p>
    </div>
  );
};

export default TaskOptionsForm;
