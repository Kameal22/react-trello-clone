import "../../styles/workspaceStyles/workspaceBoards.css";
import {
  WorkspaceInterface,
  BoardInterface,
} from "../../interfaces/WorkspaceInterface";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchForBoards from "./SearchForBoards";
import { useEffect, useState } from "react";
import { deleteBoard } from "../../redux/features/WorkspaceSlice";
import { removeRecentlyViewedThatWasDeleted } from "../../redux/features/recentlyViewedSlice";
import { setCreateBoard } from "../../redux/features/popUpCreateComponentSlice";

interface WorkspaceBoardsInterface {
  shownWorkspace: WorkspaceInterface | undefined;
}

const WorkspaceBoards: React.FC<WorkspaceBoardsInterface> = (props) => {
  const [initialBoards] = useState<BoardInterface[] | undefined>(
    props.shownWorkspace?.workspaceBoards
  );
  const [shownBoards, setShownBoards] = useState<BoardInterface[] | undefined>(
    props.shownWorkspace?.workspaceBoards
  );

  const dispatch = useDispatch();

  const showBoardCreating = () => {
    dispatch(
      setCreateBoard()
    )
  }

  const deleteBoardFunc = (workspaceName: string | undefined, boardId: string) => {
    dispatch(
      deleteBoard({
        workspaceName: workspaceName,
        boardId: boardId,
      })
    );
  };

  const removeFromLastWatched = (workspaceName: string) => {
    dispatch(
      removeRecentlyViewedThatWasDeleted({
        boardsWorkspaceName: workspaceName,
      })
    );
  };

  const handleWorkspaceRemove = (
    workspaceName: string,
    workspaceId: string
  ) => {
    deleteBoardFunc(workspaceName, workspaceId);
    removeFromLastWatched(workspaceName);
    window.location.reload();
  };

  const showSearchedBoards = (searchingValue: string) => {
    if (searchingValue) {
      const filtered = props.shownWorkspace?.workspaceBoards.filter((board) => {
        return board.boardName
          .toLowerCase()
          .includes(searchingValue.toLowerCase());
      });

      setShownBoards(filtered);
    }
  };

  const setBoardsBackToInitial = (
    initialBoards: BoardInterface[] | undefined
  ) => {
    setShownBoards(initialBoards);
  };

  useEffect(() => {
    setBoardsBackToInitial(props.shownWorkspace?.workspaceBoards);
  }, [props.shownWorkspace?.workspaceId]); // Do this to update shown boards in workspace that user routed to.

  return (
    <div className="workspaceBoardsDiv">
      <div className="workspaceBoardsHeading">
        <h4>Your boards</h4>
        <SearchForBoards
          setBoardsBackToInitial={setBoardsBackToInitial}
          initialBoards={initialBoards}
          showSearchedBoards={showSearchedBoards}
        />
      </div>

      <div className="workspaceBoardsBoards">
        <p className="showingBoards">
          Showing {shownBoards?.length} of{" "}
          {props.shownWorkspace
            ? props.shownWorkspace.workspaceBoards.length
            : null}
        </p>

        <div className="workspaceBoards">
          <div
            onClick={() => showBoardCreating()}
            className="workspaceCreateBoard"
          >
            <p>Create new board</p>
          </div>

          {props.shownWorkspace
            ? shownBoards?.map((board) => {
              return (
                <div
                  key={board.boardId}
                  style={{ background: `${board.boardBackground}` }}
                  className="workspaceYourBoard"
                >
                  <Link
                    className="workspaceMenuLink"
                    to={`/board/${props.shownWorkspace?.workspaceName}/${board.boardId}`}
                  >
                    <p>{board.boardName}</p>
                  </Link>
                  <i onClick={() => handleWorkspaceRemove(board.boardWorkspace, board.boardId)} className="bi bi-trash3"></i>
                </div>
              );
            })
            : null}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceBoards;
