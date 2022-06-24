import "../../styles/columnStyles/addColumnForm.css";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskInterface } from "../../interfaces/WorkspaceInterface";
import { addColumn } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";

interface AddingColumnFormInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
}

const AddColumnForm: React.FC<AddingColumnFormInterface> = ({
  boardId,
  workspaceId,
}) => {
  const [addingColumn, setAddingColumn] = useState(false);
  const [columnName, setColumnName] = useState<string>("");
  const [columnTasks] = useState<TaskInterface[]>([]);
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  const createColumnRef = useRef<HTMLDivElement>(null);

  const handleColumnNameChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    if (e.currentTarget.value.length > 50) {
      setError("Column name must be maximum of 30 characters");
    } else {
      setError("");
    }
    setColumnName(e.currentTarget.value.trim());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!columnName) {
      setError("Can't add an empty column")
    } else {
      dispatch(
        addColumn({
          columnName,
          columnId: uuidv4(),
          boardId: boardId,
          workspaceId: workspaceId,
          columnTasks,
        })
      );
      setAddingColumn(!addingColumn);
      setColumnName("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!createColumnRef.current?.contains(event.target as Node)) {
        setAddingColumn(false);
      }
    });
  });

  if (addingColumn) {
    return (
      <div ref={createColumnRef} className="addColumnFormDiv">
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
            autoFocus
          />
          {error ? <p className="error">{error}</p> : null}
          <div className="addColumnButtonIcon">
            <button disabled={error !== ""} type="submit">
              Add Column
            </button>
            <i
              onClick={() => setAddingColumn(!addingColumn)}
              style={{ fontSize: "1.1em" }}
              className="bi bi-x-lg"
            ></i>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => setAddingColumn(!addingColumn)}
        className="addColumnInitialDiv"
      >
        <i className="bi bi-plus-lg"></i>
        <p> Add a column</p>
      </div>
    );
  }
};

export default AddColumnForm;
