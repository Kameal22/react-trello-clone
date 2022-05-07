import "../../styles/workspaceStyles/workspace.css";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import Nav from "../nav/Nav";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WorkspaceInterface } from "../../interfaces/WorkspaceInterface";

const Workspace: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);

  const [shownWorkspace, setShownWorkspace] = useState<
    WorkspaceInterface[] | undefined
  >([]);

  const { workspaceName } = useParams();

  useEffect(() => {
    const shownWorkspace = workspaces.find((workspace) => {
      return workspace.workspaceName === workspaceName;
    });

    // setShownWorkspace(shownWorkspace);
    console.log(shownWorkspace);
  }, []);

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  //Now I can acces specific workspace. In UseEffect - find this workspace by name and view it's data

  return (
    <div className="yourWorkspaceDiv">
      <Nav showCreateWorkspace={showWorkspaceCreation} />
      <div className="yourWorkspaceHeading">
        <h2>{workspaceName}</h2>
        {}
      </div>
    </div>
  );
};

export default Workspace;
