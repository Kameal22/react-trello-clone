import "../../styles/boardStyles/board.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { addRecentlyViewed } from "../../redux/features/recentlyViewedSlice";
import Column from "../column/Column";
import AddColumnForm from "../column/AddColumnForm";
import { changeColor } from "../../redux/features/navigationSlice";
import { reArangeColumn, reArangeBetweenColumn } from "../../redux/features/WorkspaceSlice";
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

  const reArangeColumnFunc = (newColumn: ColumnInterface, columnId: string) => {
    dispatch(
      reArangeColumn({
        workspaceId: shownWorkspace?.workspaceId,
        boardId: shownBoard?.boardId,
        newColumn,
        columnId,
      })
    );
  };

  const reArangeBetweenColumnFunc = (startId: string, finishId: string, newColumnStart: ColumnInterface, newColumnFinish: ColumnInterface) => {
    console.log("It executes!")
    dispatch(
      reArangeBetweenColumn({
        workspaceId: shownWorkspace?.workspaceId,
        boardId: shownBoard?.boardId,
        startColumnId: startId,
        finishColumnId: finishId,
        newStartColumn: newColumnStart,
        newFinishColumn: newColumnFinish
      })
    )
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    console.log(destination) //Returns null when dropping on other column

    if (!destination) {
      return;
    }
    // THERE IS A PROBLEM WITH DESTINATION. THERE IS NO DESTINATION ON THE OTHER COLUMN

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = boardsColumns?.find(
      (column) => column.columnId === source.droppableId
    );
    const endColumn = boardsColumns?.find(
      (column) => column.columnId === destination.droppableId
    );

    if (startColumn === endColumn) {
      if (startColumn) {
        const newTaskIds = Array.from(startColumn?.columnTasks);

        const itemToReArange = newTaskIds.find(
          (item) => item.taskId === draggableId
        );

        newTaskIds.splice(source.index, 1);

        if (itemToReArange) {
          newTaskIds.splice(destination.index, 0, itemToReArange);
        }

        const newColumn = {
          ...startColumn,
          columnTasks: newTaskIds,
        };

        reArangeColumnFunc(newColumn, source.droppableId);
        return
      }
    }

    if (startColumn && endColumn) {
      const startTaskIds = Array.from(startColumn?.columnTasks);

      const itemToReArange = startTaskIds.find(
        (item) => item.taskId === draggableId
      );

      startTaskIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        columnTasks: startTaskIds,
      };

      const finishTaskIds = Array.from(endColumn?.columnTasks);

      if (itemToReArange) {
        finishTaskIds.splice(destination.index, 0, itemToReArange)
      }

      const newFinishColumn = {
        ...endColumn,
        columnTasks: finishTaskIds,
      };

      console.log("TEST") // This doesn't happen
      reArangeBetweenColumnFunc(source.droppableId, destination.droppableId, newStartColumn, newFinishColumn)
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
        <DragDropContext onDragEnd={onDragEnd}>
          {boardsColumns?.map((column) => {
            return (

              <Column
                key={column.columnId}
                columnId={column.columnId}
                boardId={shownBoard?.boardId}
                workspaceId={shownWorkspace?.workspaceId}
              />
            );
          })}
        </DragDropContext>

        <AddColumnForm
          workspaceId={shownWorkspace?.workspaceId}
          boardId={shownBoard?.boardId}
        />
      </div>
    </div>
  );
};

export default Board;
