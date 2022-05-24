import "../../styles/boardStyles/addColumnForm.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BoardTaskInterface } from "../../interfaces/WorkspaceInterface";
import { addColumn } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";

interface AddingColumnFormInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
}

const AddColumnForm: React.FC<AddingColumnFormInterface> = (props) => {
  const [addingColumn, setAddingColumn] = useState(false);
  const [columnName, setColumnName] = useState<string>("");
  const [columnId] = useState<string>(uuidv4());
  const [columnTasks] = useState<BoardTaskInterface[]>([]);

  const dispatch = useDispatch();

  const handleColumnNameChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setColumnName(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addColumn({
        columnName,
        columnId,
        boardId: props.boardId,
        workspaceId: props.workspaceId,
        columnTasks,
      })
    );
    setAddingColumn(!addingColumn);
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
