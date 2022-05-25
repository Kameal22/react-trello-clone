import "../../styles/boardStyles/editColumnForm.css";
import { deleteColumn } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";

interface EditColumnInterface {
  closeEditing: () => void;
}

const EditColumnForm: React.FC<EditColumnInterface> = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="editColumnFormDiv">
      <div className="edidColumnFormDivHeading">
        <p className="editColumnHeading">Column actions</p>
        <i onClick={() => props.closeEditing()} className="bi bi-x-lg"></i>
      </div>

      <div className="editColumnFormActions">
        <p>Add task..</p>
        <p>Delete column..</p>
        <p>Copy column..</p>
      </div>
    </div>
  );
};

export default EditColumnForm;
