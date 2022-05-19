import "../../styles/boardStyles/addColumnForm.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BoardTaskInterface } from "../../interfaces/WorkspaceInterface";

const AddColumnForm: React.FC = () => {
  const [addingColumn, setAddingColumn] = useState(false);
  const [columnName, setColumnName] = useState<string>("");
  const [columnId, setColumnId] = useState<string>(uuidv4());
  const [columnTasks, setColumnTasks] = useState<BoardTaskInterface>();

  const handleColumnNameChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setColumnName(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="addColumnFormDiv">
      {addingColumn ? (
        <div className="addColumnForm">
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
              <button>Add Column</button>
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
