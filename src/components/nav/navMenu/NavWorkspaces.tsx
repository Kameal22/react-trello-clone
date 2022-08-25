import "../../../styles/navStyles/navMenuStyles/workspaceMenu.css";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCreateWorkspace } from "../../../redux/features/popUpCreateComponentSlice";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavWorkspaces: React.FC<Props> = ({ setOpen }) => {
  const dispatch = useDispatch();

  const showWorkspaceCreating = () => {
    dispatch(setCreateWorkspace());
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const isWorkspace = workspaces[0];

  return (
    <div className="navWorkspacesDiv">
      <div className="navWorkspacesHeading">
        <p>Workspaces</p>
        <i className="bi bi-x" onClick={() => setOpen(false)} />
      </div>

      {isWorkspace ? (
        <div className="navWorkspaceChoices">
          <p className="navYourWorkspaces">Your workspaces</p>

          {workspaces.map((workspace) => {
            return (
              <div key={workspace.workspaceId} className="navWorkspaceItems">
                <p className="navWorkspaceItemHeading">
                  <Link
                    className="workspaceMenuLink"
                    to={`/workspace/${workspace.workspaceId}`}
                  >
                    <span
                      style={{
                        color: workspace.workspaceLetterColor,
                        fontSize: "1.4em",
                        marginRight: ".1em",
                      }}
                    >
                      {workspace.workspaceName[0]}
                    </span>
                    {workspace.workspaceName.substring(1)}
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="navWorkspaceChoices">
          <p onClick={showWorkspaceCreating} className="navCreateWorkspace">
            Create workspace
          </p>
        </div>
      )}
    </div>
  );
};

export default NavWorkspaces;
