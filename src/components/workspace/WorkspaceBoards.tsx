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
import { setCreateBoard } from "../../redux/features/popUpCreateComponentSlice";
import { removeHighlightOnBoardDeleting } from "../../redux/features/highlightsSlice";
import { includesIgnoredCase } from "../../utils/IgnoreCase";

interface WorkspaceBoardsInterface {
  shownWorkspace: WorkspaceInterface | undefined;
}

const WorkspaceBoards: React.FC<WorkspaceBoardsInterface> = (props) => {
  const [shownBoards, setShownBoards] = useState<BoardInterface[] | undefined>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setShownBoards(props.shownWorkspace?.workspaceBoards)
  }, [props.shownWorkspace?.workspaceId]); // Do this to update shown boards in workspace that user routed to.

  const showSearchedBoards = (searchingValue: string) => {
    const filtered = props.shownWorkspace?.workspaceBoards.filter((board) => {
      return includesIgnoredCase(board.boardName, searchingValue)
    });

    setShownBoards(filtered);
  };

  const deleteBoardFunc = (
    workspaceName: string | undefined,
    boardId: string
  ) => {
    dispatch(
      deleteBoard({
        workspaceName: workspaceName,
        boardId: boardId,
      })
    );
  };

  const removeFromLastWatched = (boardId: string) => {
    console.log("ADD REMOVAL FROM LAST WATCHED")
  };

  const removeFromHighlights = (boardId: string) => {
    dispatch(
      removeHighlightOnBoardDeleting({
        boardId: boardId,
      })
    );
  };

  const handleWorkspaceRemove = (workspaceName: string, boardId: string) => {
    deleteBoardFunc(workspaceName, boardId);
    removeFromLastWatched(boardId);
    removeFromHighlights(boardId);
    window.location.reload();
  };

  const showBoardCreating = () => {
    dispatch(setCreateBoard());
  };

  return (
    <div className="workspaceBoardsDiv">
      <div className="workspaceBoardsHeading">
        <h4>Your boards</h4>
        <SearchForBoards
          boards={shownBoards}
          showSearchedBoards={showSearchedBoards}
        />
      </div>

      <div className="workspaceBoardsBoards">
        <p className="showingBoards">
          Showing {shownBoards?.length} of{" "}
          {props.shownWorkspace && props.shownWorkspace.workspaceBoards.length}
        </p>
        <div className="workspaceBoards">
          <div
            onClick={() => showBoardCreating()}
            className="workspaceCreateBoard"
          >
            <p>Create new board</p>
          </div>

          {props.shownWorkspace &&
            shownBoards?.map((board) => {
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
                  <i
                    onClick={() =>
                      handleWorkspaceRemove(
                        board.boardWorkspace,
                        board.boardId
                      )
                    }
                    className="bi bi-trash3"
                  ></i>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default WorkspaceBoards;
