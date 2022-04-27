import "../../styles/mainSectionStyles/mainSectionMenu.css";

const MainSectionMenu: React.FC = () => {
  return (
    <div className="mainSectionMenuDiv">
      <h3>Main Section menu</h3>

      <div className="menuBoards"></div>
      <div className="menuHome"></div>

      <div className="menuWorkspaces">
        <div className="menuWorkspace">
          <div className="menuWorkspaceBoard"></div>
          <div className="menuWorkspaceSettings"></div>
        </div>
      </div>
    </div>
  );
};

export default MainSectionMenu;
