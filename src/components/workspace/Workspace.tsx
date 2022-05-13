import "../../styles/workspaceStyles/workspace.css";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import Nav from "../nav/Nav";
import { useState } from "react";
import { editWorkspace } from "../../redux/features/WorkspaceSlice";
import { useSelector, useDispatch } from "react-redux";
import EditWorkspaceDetails from "./EditWorkspaceDetails";
import WorkspaceBoards from "./WorkspaceBoards";
import { showDropdown } from "../../redux/features/navigationSlice";

const Workspace: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);
  const [workspaceEditing, setWorkspaceEditing] = useState<boolean>(false);

  const { workspaceId } = useParams(); //This gives you ID of workspace

  const dispatch = useDispatch();

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  const setEditting = () => {
    setWorkspaceEditing(!workspaceEditing);
  };

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const dropdown = useSelector(
    (state: RootState) => state.dropdown.navDropdown
  );

  const editWorkspaceFunc = (
    id: string | undefined,
    name: string | undefined,
    description: string | undefined
  ) => {
    dispatch(editWorkspace({ id, name, description }));
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceId === workspaceId;
  });

  return (
    <div className="yourWorkspaceDiv">
      <Nav showCreateWorkspace={showWorkspaceCreation} />
      <div className="yourWorkspaceHeadingDiv">
        {workspaceEditing ? (
          <EditWorkspaceDetails
            editWorkspace={editWorkspaceFunc}
            setEditting={setEditting}
            workspaceName={shownWorkspace?.workspaceName}
            workspaceDescription={shownWorkspace?.workspaceDescription}
            workspaceId={shownWorkspace?.workspaceId}
          />
        ) : (
          <div className="yourWorkspaceHeadingDivComponents">
            <div className="yourWorkspaceUpperComponents">
              <div className="yourWorkspaceHeadingAndDescriptionDiv">
                <h2 className="yourWorkspaceHeading">
                  {shownWorkspace?.workspaceName}
                </h2>
                <p className="yourWorkspaceDescription">
                  {shownWorkspace?.workspaceDescription}
                </p>
              </div>
              <div className="editWorkspaceDiv">
                <i
                  style={{ fontSize: ".8em", marginRight: "1em" }}
                  className="bi bi-pencil"
                ></i>
                <p onClick={() => setEditting()}>Edit workspace details</p>
              </div>
            </div>

            <div className="workspaceOptions">
              <div className="boards">Boards</div>
              <div className="settings">Settings</div>
            </div>
          </div>
        )}
      </div>
      <WorkspaceBoards />
    </div>
  );
};

export default Workspace;
