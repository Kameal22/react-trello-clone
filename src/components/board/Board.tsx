import "../../styles/boardStyles/board.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { addRecentlyViewed } from "../../redux/features/recentlyViewedSlice";
import Column from "../column/Column";
import AddColumnForm from "../column/AddColumnForm";
import { changeColor } from "../../redux/features/navigationSlice";
import { reArangeColumn } from "../../redux/features/WorkspaceSlice";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ColumnInterface } from "../../interfaces/WorkspaceInterface";

const Board: React.FC = () => {
  const { workspaceName, boardId } = useParams();

  const dispatch = useDispatch();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const user = useSelector((state: RootState) => state.users.user);

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceName === workspaceName;
  });

  const shownBoard = shownWorkspace?.workspaceBoards.find((board) => {
    return board.boardId === boardId;
  });

  const boardsColumns = shownBoard?.boardColumns;

  useEffect(() => {
    if (shownBoard) {
      dispatch(addRecentlyViewed(shownBoard));
      changeColorFunc(shownBoard.boardBackground);
    }
  }, []);

  useEffect(() => {
    if (shownBoard) {
      changeColorFunc(shownBoard.boardBackground);
    }
  }, [shownBoard?.boardId]); // To change navbar color when going from one board to another directly.

  const changeColorFunc = (color: string) => {
    dispatch(
      changeColor({
        color: color,
      })
    );
  };

  const reArangeColumnFunc = (
    newColumn: ColumnInterface,
    columnName: string
  ) => {
    dispatch(
      reArangeColumn({
        workspaceId: shownWorkspace?.workspaceId,
        boardId: shownBoard?.boardId,
        columnName,
        newColumn,
      })
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // VERY IMPORTANT = REFACTOR TO COLUMN ID INSTEAD OF NAME. THERE COULD BE MANY COLUMNS WITH THE SAME NAME!

    const column = boardsColumns?.find(
      (column) => column.columnName === source.droppableId
    );

    if (column) {
      const newTaskIds = Array.from(column?.columnTasks);

      const itemToReArange = newTaskIds.find(
        (item) => item.taskId === draggableId
      );

      newTaskIds.splice(source.index, 1);

      if (itemToReArange) {
        newTaskIds.splice(destination.index, 0, itemToReArange);
      }

      const newColumn = {
        ...column,
        columnTasks: newTaskIds,
      };

      reArangeColumnFunc(newColumn, source.droppableId);
    }
  };

  return (
    <div
      style={{ background: `${shownBoard?.boardBackground}` }}
      className="boardDivBOARD"
    >
      <div className="boardHeadingBOARD">
        <h3 className="boardNameBOARD">board: {shownBoard?.boardName}</h3>
        {user.name ? (
          <h4 className="boardUserNameBOARD">{user.name} </h4>
        ) : (
          <h4 className="boardUserNameBOARD">
            {shownWorkspace?.workspaceMember}
          </h4>
        )}
      </div>

      <div className="boardAllColumnsDivBOARD">
        {boardsColumns?.map((column) => {
          return (
            <DragDropContext key={column.columnId} onDragEnd={onDragEnd}>
              <Column
                key={column.columnId}
                columnName={column.columnName}
                columnId={column.columnId}
                boardId={shownBoard?.boardId}
                workspaceId={shownWorkspace?.workspaceId}
                columnTasks={column.columnTasks}
              />
            </DragDropContext>
          );
        })}

        <AddColumnForm
          workspaceId={shownWorkspace?.workspaceId}
          boardId={shownBoard?.boardId}
        />
      </div>
    </div>
  );
};

export default Board;
