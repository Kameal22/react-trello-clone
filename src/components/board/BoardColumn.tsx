import "../../styles/boardStyles/boardColumn.css";
import { BoardTaskInterface } from "../../interfaces/WorkspaceInterface";

interface ColumnInterface {
  columnName: string;
  columnId: string | undefined;
  columnTasks: BoardTaskInterface[];
}

const BoardColumn: React.FC<ColumnInterface> = (props) => {
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
