import "../../styles/workspaceStyles/workspaceBoards.css";
import {
  WorkspaceInterface,
  BoardInterface,
} from "../../interfaces/WorkspaceInterface";
import { Link } from "react-router-dom";
import SearchForBoards from "./SearchForBoards";
import { useState } from "react";

interface WorkspaceBoardsInterface {
  setBoardCreating: () => void;
  shownWorkspace: WorkspaceInterface | undefined;
}

const WorkspaceBoards: React.FC<WorkspaceBoardsInterface> = (props) => {
  const [initialBoards] = useState<BoardInterface[] | undefined>(
    props.shownWorkspace?.workspaceBoards
  );
  const [shownBoards, setShownBoards] = useState<BoardInterface[] | undefined>(
    props.shownWorkspace?.workspaceBoards
  );

  const showSearchedBoards = (searchingValue: string) => {
    if (searchingValue) {
      const filtered = shownBoards?.filter((board) => {
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
            onClick={() => props.setBoardCreating()}
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
