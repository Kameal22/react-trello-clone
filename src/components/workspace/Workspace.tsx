import "../../styles/workspaceStyles/workspace.css";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import Nav from "../nav/Nav";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WorkspaceInterface } from "../../interfaces/WorkspaceInterface";
import EditWorkspaceDetails from "./EditWorkspaceDetails";

const Workspace: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);
  const [shownWorkspace, setShownWorkspace] = useState<
    WorkspaceInterface | undefined
  >();
  const [workspaceEditing, setWorkspaceEditing] = useState<boolean>(false);

  const { workspaceName } = useParams();

  useEffect(() => {
    const shownWorkspace = workspaces.find((workspace) => {
      return workspace.workspaceName === workspaceName;
    });

    setShownWorkspace(shownWorkspace);
  }, []);

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  const setEditting = () => {
    setWorkspaceEditing(!workspaceEditing);
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  return (
    <div className="yourWorkspaceDiv">
      <Nav showCreateWorkspace={showWorkspaceCreation} />
      <div className="yourWorkspaceHeadingDiv">
        {workspaceEditing ? (
          <EditWorkspaceDetails
            setEditting={setEditting}
            workspaceName={shownWorkspace?.workspaceName}
            workspaceDescription={shownWorkspace?.workspaceDescription}
            workspaceId={shownWorkspace?.workspaceId}
          />
        ) : (
          <div className="yourWorkspaceHeadingDivComponents">
            <h2 className="yourWorkspaceHeading">
              {shownWorkspace?.workspaceName}
            </h2>
            <p className="yourWorkspaceDescription">
              {shownWorkspace?.workspaceDescription}
            </p>
            <div className="editWorkspaceDiv">
              <i
                style={{ fontSize: ".8em", marginRight: "1em" }}
                className="bi bi-pencil"
              ></i>
              <p onClick={() => setEditting()}>Edit workspace details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
