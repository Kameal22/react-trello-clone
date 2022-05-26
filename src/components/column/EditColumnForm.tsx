import "../../styles/columnStyles/editColumnForm.css";
import { deleteColumn } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";

interface EditColumnInterface {
  closeEditing: () => void;
  columnId: string | undefined;
  boardId: string | undefined;
  workspaceId: string | undefined;
}

const EditColumnForm: React.FC<EditColumnInterface> = (props) => {
  const dispatch = useDispatch();

  const deleteColumnFunc = () => {
    dispatch(
      deleteColumn({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.workspaceId,
      })
    );
  };

  return (
    <div className="editColumnFormDiv">
      <div className="edidColumnFormDivHeading">
        <p className="editColumnHeading">Column actions</p>
        <i onClick={() => props.closeEditing()} className="bi bi-x-lg"></i>
      </div>

      <div className="editColumnFormActions">
        <p>Add task..</p>
        <p onClick={() => deleteColumnFunc()}>Delete column..</p>
        <p>Copy column..</p>
      </div>
    </div>
  );
};

export default EditColumnForm;
