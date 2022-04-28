import "../../styles/mainSectionStyles/mainSectionMenu.css";

const MainSectionMenu: React.FC = () => {
  return (
    <div className="mainSectionMenuDiv">
      <h3>Menu</h3>

      <div className="menuBoards">
        <i className="bi bi-calendar-check"></i>
        <p className="menuBoardsDescription">Boards</p>
      </div>
      <div className="menuHome">
        <i className="bi bi-house"></i>
        <p className="menuHomeDescription">Home</p>
      </div>

      <div className="menuWorkspacesHeading">
        <p>Workspaces</p>
        <i style={{ fontSize: "1.2em" }} className="bi bi-plus"></i>
      </div>

      <div className="menuWorkspaces">
        <div className="workspace">
          <p>First Workspace!</p>
          <i
            style={{ fontSize: "1.3em" }}
            className="bi bi-arrow-down-short"
          ></i>
        </div>
        <div className="workspaceSettings">
          <div className="workspaceOption">
            <i className="bi bi-calendar-check"></i>
            <p className="menuBoardsDescription">Boards</p>
          </div>
          <div className="workspaceOption">
            <i className="bi bi-suit-heart"></i>
            <p className="menuBoardsDescription">Highlights</p>
          </div>
          <div className="workspaceOption">
            <i className="bi bi-gear"></i>
            <p className="menuBoardsDescription">Highlights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSectionMenu;
