import "../../styles/boardStyles/board.css";
import Nav from "../nav/Nav";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { addRecentlyViewed } from "../../redux/features/recentlyViewedSlice";
import BoardColumn from "../column/Column";
import AddColumnForm from "../column/AddColumnForm";

const Board: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);

  const { workspaceName, boardId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (shownBoard) dispatch(addRecentlyViewed(shownBoard));
  }, []);

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

  const boardsColumn = shownBoard?.boardColumns;

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  return (
    <div
      style={{ background: `${shownBoard?.boardBackground}` }}
      className="boardDivBOARD"
    >
      <Nav showCreateWorkspace={showWorkspaceCreation} />
      <div className="boardHeadingBOARD">
        <h3 onClick={() => console.log(shownBoard)} className="boardNameBOARD">
          board: {shownBoard?.boardName}
        </h3>
        {user.name ? (
          <h4 className="boardUserNameBOARD">{user.name} </h4>
        ) : (
          <h4 className="boardUserNameBOARD">
            {shownWorkspace?.workspaceMember}
          </h4>
        )}
      </div>

      <div className="boardAllColumnsDivBOARD">
        {boardsColumn?.map((column) => {
          return (
            <BoardColumn
              columnName={column.columnName}
              columnId={column.columnId}
              boardId={shownBoard?.boardId}
              workspaceId={shownWorkspace?.workspaceId}
              columnTasks={column.columnTasks}
            />
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
