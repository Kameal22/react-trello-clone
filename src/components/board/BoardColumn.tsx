import "../../styles/boardStyles/boardColumn.css";
import { BoardTaskInterface } from "../../interfaces/WorkspaceInterface";
import EditColumnForm from "./EditColumnForm";
import { useState } from "react";

interface ColumnInterface {
  columnName: string;
  columnId: string | undefined;
  columnTasks: BoardTaskInterface[];
}

const BoardColumn: React.FC<ColumnInterface> = (props) => {
  const [columnEditing, setColumnEditing] = useState<boolean>(false);

  return (
    <div className="boardCOLUMNdiv">
      <div className="boardCOLUMNHeader">
        <p>{props.columnName}</p>
        <i className="bi bi-three-dots"></i>
      </div>

      <div className="boardCOLUMNAddTask">
        <i style={{ fontSize: "1.3em" }} className="bi bi-plus"></i>
        <p>Add a task</p>
      </div>
    </div>
  );
};

export default BoardColumn;
