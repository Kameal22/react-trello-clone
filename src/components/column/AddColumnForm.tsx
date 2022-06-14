import "../../styles/columnStyles/addColumnForm.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskInterface } from "../../interfaces/WorkspaceInterface";
import { addColumn } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";

interface AddingColumnFormInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
}

const AddColumnForm: React.FC<AddingColumnFormInterface> = (props) => {
  const [addingColumn, setAddingColumn] = useState(false);
  const [columnName, setColumnName] = useState<string>("");
  const [columnTasks] = useState<TaskInterface[]>([]);

  const dispatch = useDispatch();

  const handleColumnNameChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setColumnName(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (columnName) {
      dispatch(
        addColumn({
          columnName,
          columnId: uuidv4(),
          boardId: props.boardId,
          workspaceId: props.workspaceId,
          columnTasks,
        })
      );
      setAddingColumn(!addingColumn);
      setColumnName("");
    }
  };

  return (
    <div className="addCOLUMNFORMDiv">
      {addingColumn ? (
        <div className="addCOLUMNFORM">
          <form
            className="addColumnFormForm"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <input
              className="columnNameInput"
              onChange={handleColumnNameChange}
              type="text"
              name="columnName"
              placeholder="Enter column title.."
            />
            <div className="addColumnButtonIcon">
              <button type="submit">Add Column</button>
              <i
                onClick={() => setAddingColumn(!addingColumn)}
                style={{ fontSize: "1.1em" }}
                className="bi bi-x-lg"
              ></i>
            </div>
          </form>
        </div>
      ) : (
        <div
          onClick={() => setAddingColumn(!addingColumn)}
          className="addColumnHeading"
        >
          <i className="bi bi-plus-lg"></i>
          <p> Add a column</p>
        </div>
      )}
    </div>
  );
};

export default AddColumnForm;
