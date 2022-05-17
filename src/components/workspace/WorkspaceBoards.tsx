import "../../styles/workspaceStyles/workspaceBoards.css";
import { WorkspaceInterface } from "../../interfaces/WorkspaceInterface";

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
          Showing 1 of{" "}
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
                  <div className="workspaceYourBoard">
                    <p>{board.boardName}</p>
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
