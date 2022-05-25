import "../../styles/boardStyles/editColumnForm.css";

interface EditColumnInterface {
  closeEditing: () => void;
}

const EditColumnForm: React.FC<EditColumnInterface> = (props) => {
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
