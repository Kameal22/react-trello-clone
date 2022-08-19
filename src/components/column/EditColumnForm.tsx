import "../../styles/columnStyles/editColumnForm.css";
import { deleteColumn } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { copyColumn } from "../../redux/features/WorkspaceSlice";
import { useSetHT } from "../../context/highlightedTaskContext";
import { useContext } from "react";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";
import { handleRemoveHighlightedTaskOnColumnDeleting } from "../../utils/SetHighlightedTask";

interface EditColumnInterface {
  setEditing: () => void;
  setTaskAdding: React.Dispatch<React.SetStateAction<boolean>>;
  columnId: string | undefined;
  boardId: string | undefined;
  workspaceId: string | undefined;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const EditColumnForm: React.FC<EditColumnInterface> = ({
  setEditing,
  setTaskAdding,
  columnId,
  boardId,
  workspaceId,
  forwardRef,
}) => {
  const dispatch = useDispatch();
  const setHighlights = useSetHT();
  const highlights = useContext(HighlightedTaskContext);

  const handleHighlightRemove = (columnId: string | undefined) => {
    handleRemoveHighlightedTaskOnColumnDeleting(
      highlights,
      columnId,
      setHighlights
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
    setTaskAdding(false);
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
