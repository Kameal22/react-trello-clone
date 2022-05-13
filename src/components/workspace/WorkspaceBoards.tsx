import "../../styles/workspaceStyles/workspaceBoards.css";

const WorkspaceBoards: React.FC = () => {
  return (
    <div className="workspaceBoardsDiv">
      <div className="workspaceBoardsHeading">
        <h4>Your boards</h4>
        <p>Search for boards</p>
      </div>

      <div className="workspaceBoardsBoards">
        <p className="showingBoards">Showing 1 of 1 boards</p>

        <div className="workspaceBoards">
          <div className="workspaceCreateBoard">
            <p>Create new board</p>
          </div>
          <div className="workspaceYourBoard">
            <p>Callendar board</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceBoards;
