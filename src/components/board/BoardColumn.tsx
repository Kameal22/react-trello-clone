import "../../styles/boardStyles/boardColumn.css";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { BoardTaskInterface } from "../../interfaces/WorkspaceInterface";

interface ColumnInterface {
  columnName: string;
  columnId: string | undefined;
  columnTasks: BoardTaskInterface[];
}

const BoardColumn: React.FC<ColumnInterface> = (props) => {
  return (
    <div className="boardColumnDIV">
      <p>{props.columnName}</p>
    </div>
  );
};

export default BoardColumn;
