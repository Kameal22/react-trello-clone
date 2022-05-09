import "../../styles/workspaceStyles/workspace.css";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import Nav from "../nav/Nav";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WorkspaceInterface } from "../../interfaces/WorkspaceInterface";

const Workspace: React.FC = () => {
  const { workspaceName } = useParams();

  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);
  const [shownWorkspace, setShownWorkspace] = useState<
    WorkspaceInterface | undefined
  >();

  useEffect(() => {
    const shownWorkspace = workspaces.find((workspace) => {
      return workspace.workspaceName === workspaceName;
    });

    setShownWorkspace(shownWorkspace);
  }, []);

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  return (
    <div className="yourWorkspaceDiv">
      <Nav showCreateWorkspace={showWorkspaceCreation} />
      <div className="yourWorkspaceHeadingDiv">
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
          <p>Edit workspace details</p>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
