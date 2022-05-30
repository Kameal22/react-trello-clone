import "../../styles/columnStyles/editColumnForm.css";
import { deleteColumn } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { copyColumn } from "../../redux/features/WorkspaceSlice";
import { v4 as uuidv4 } from "uuid";

interface EditColumnInterface {
  setEditing: () => void;
  addTask: () => void;
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
        columnId: props.columnId,
      })
    );
    props.setEditing();
  };

  const addTask = () => {
    props.addTask();
    props.setEditing();
  };

  const copyColumnFunc = () => {
    dispatch(
      copyColumn({
        workspaceId: props.workspaceId,
        columnId: props.columnId,
        boardId: props.boardId,
      })
    );
    props.setEditing();
  };

  return (
    <div
      className="editColumnFormDiv"
    >
      <div className="edidColumnFormDivHeading">
        <p className="editColumnHeading">Column actions</p>
        <i onClick={() => props.setEditing()} className="bi bi-x-lg"></i>
      </div>

      <div className="editColumnFormActions">
        <p onClick={() => addTask()}>Add task..</p>
        <p onClick={() => deleteColumnFunc()}>Delete column..</p>
        <p onClick={() => copyColumnFunc()}>Copy column..</p>
      </div>
    </div>
  );
};

export default EditColumnForm;
