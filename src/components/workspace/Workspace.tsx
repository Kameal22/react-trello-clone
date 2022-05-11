import "../../styles/workspaceStyles/workspace.css";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import Nav from "../nav/Nav";
import { useState } from "react";
import { editWorkspace } from "../../redux/features/WorkspaceSlice";
import { useSelector, useDispatch } from "react-redux";
import EditWorkspaceDetails from "./EditWorkspaceDetails";

const Workspace: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);
  const [workspaceEditing, setWorkspaceEditing] = useState<boolean>(false);

  const { workspaceName } = useParams();
  const dispatch = useDispatch();

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  const setEditting = () => {
    setWorkspaceEditing(!workspaceEditing);
  };

  const editWorkspaceFunc = (id: number | undefined, name?: string) => {
    dispatch(editWorkspace({ id, name }));
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceName === workspaceName;
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
