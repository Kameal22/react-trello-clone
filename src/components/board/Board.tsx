import "../../styles/boardStyles/board.css";
import Nav from "../nav/Nav";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { addRecentlyViewed } from "../../redux/features/recentlyViewedSlice";
import { addColumn } from "../../redux/features/WorkspaceSlice";
import AddColumnForm from "./AddColumnForm";

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

  // if !boardsColumn - show AddColumnForm.

  return (
    <div
      style={{ background: `${shownBoard?.boardBackground}` }}
      className="boardDiv"
    >
      <Nav showCreateWorkspace={showWorkspaceCreation} />
      <div className="boardHeading">
        <h3 className="boardBoardName">board: {shownBoard?.boardName}</h3>
        {user.name ? (
          <h4 className="boardUserName">{user.name} </h4>
        ) : (
          <h4 className="boardUserName">{shownWorkspace?.workspaceMember}</h4>
        )}
      </div>

      <div className="boardColumnsDiv">
        {boardsColumn ? <AddColumnForm /> : null}
      </div>
    </div>
  );
};

export default Board;
