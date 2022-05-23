import "../../styles/workspaceStyles/workspaceBoards.css";
import { WorkspaceInterface } from "../../interfaces/WorkspaceInterface";
import { Link } from "react-router-dom";

interface WorkspaceBoardsInterface {
  setBoardCreating: () => void;
  shownWorkspace: WorkspaceInterface | undefined;
}

const WorkspaceBoards: React.FC<WorkspaceBoardsInterface> = (props) => {
  return (
    <div className="workspaceBoardsDiv">
      <div className="workspaceBoardsHeading">
        <h4>Your boards</h4>
        <p>Search for boards</p>
      </div>

      <div className="workspaceBoardsBoards">
        <p className="showingBoards">
          Showing {props.shownWorkspace?.workspaceBoards.length} of{" "}
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
            ? props.shownWorkspace.workspaceBoards.map((board) => {
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
