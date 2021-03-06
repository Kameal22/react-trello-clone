import "../../styles/columnStyles/editColumnForm.css";
import { deleteColumn } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { copyColumn } from "../../redux/features/WorkspaceSlice";
import { removeHighlightOnColumnDeleting } from "../../redux/features/highlightsSlice";

interface EditColumnInterface {
  setEditing: () => void;
  addTask: () => void;
  columnId: string | undefined;
  boardId: string | undefined;
  workspaceId: string | undefined;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const EditColumnForm: React.FC<EditColumnInterface> = ({
  setEditing,
  addTask,
  columnId,
  boardId,
  workspaceId,
  forwardRef,
}) => {
  const dispatch = useDispatch();

  const handleHighlightRemove = (columnId: string | undefined) => {
    dispatch(
      removeHighlightOnColumnDeleting({
        columnId: columnId,
      })
    );
  };

  const deleteColumnFunc = () => {
    handleHighlightRemove(columnId);
    dispatch(
      deleteColumn({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
      })
    );
    setEditing();
  };

  const addTaskFunc = () => {
    addTask();
    setEditing();
  };

  const copyColumnFunc = () => {
    dispatch(
      copyColumn({
        workspaceId: workspaceId,
        columnId: columnId,
        boardId: boardId,
      })
    );
    setEditing();
  };

  return (
    <div ref={forwardRef} className="editColumnFormDiv">
      <div className="edidColumnFormDivHeading">
        <p className="editColumnHeading">Column actions</p>
        <i onClick={() => setEditing()} className="bi bi-x-lg"></i>
      </div>

      <div className="editColumnFormActions">
        <p onClick={() => addTaskFunc()}>Add task..</p>
        <p onClick={() => deleteColumnFunc()}>Delete column..</p>
        <p onClick={() => copyColumnFunc()}>Copy column..</p>
      </div>
    </div>
  );
};

export default EditColumnForm;
