import "../../styles/workspaceStyles/workspace.css";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import Nav from "../nav/Nav";
import { useState, useEffect } from "react";
import { editWorkspace } from "../../redux/features/WorkspaceSlice";
import { useSelector, useDispatch } from "react-redux";
import EditWorkspaceDetails from "./EditWorkspaceDetails";
import WorkspaceBoards from "./WorkspaceBoards";
import CreateBoardPopUp from "../popups/CreateBoardPopUp";
import PopUp from "../popups/PopUpMessage";
import { useNavigate } from "react-router-dom";

const Workspace: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);
  const [workspaceEditing, setWorkspaceEditing] = useState<boolean>(false);
  const [boardCreating, setBoardCreating] = useState<boolean>(false);

  const workspaces = useSelector(
    // These are all workspaces from redux store
    (state: RootState) => state.workspace.workspace
  );

  useEffect(() => {
    if (workspaces.length < 1) {
      navigate('/', { replace: true });
    }
  }, [workspaces])

  const { workspaceId } = useParams(); //This gives you ID of workspace showing in the component

  const shownWorkspace = workspaces.find((workspace) => {
    //And this is the specific workspace that is viewed in component found by this ID up above.
    return workspace.workspaceId === workspaceId;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showBoardCreating = () => {
    setBoardCreating(!boardCreating);
  };

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  const setEditting = () => {
    setWorkspaceEditing(!workspaceEditing);
  };

  const editWorkspaceFunc = (
    id: string | undefined,
    name: string | undefined,
    description: string | undefined
  ) => {
    dispatch(editWorkspace({ id, name, description }));
  };

  return (
    <div className="yourWorkspaceDiv">
      <Nav showCreateBoard={showBoardCreating} showCreateWorkspace={showWorkspaceCreation} />
      {boardCreating ? (
        <CreateBoardPopUp
          setBoardCreating={showBoardCreating}
        />
      ) : null}

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
            <div className="yourWorkspaceHeadingAndDescriptionDiv">
              <h2 className="yourWorkspaceHeading">
                <span
                  style={{
                    color: shownWorkspace?.workspaceLetterColor,
                    fontSize: "1.4em",
                    marginRight: ".1em",
                  }}
                >
                  {shownWorkspace?.workspaceName[0]}
                </span>
                {shownWorkspace?.workspaceName.substring(1)}
              </h2>
              <p className="yourWorkspaceDescription">
                {shownWorkspace?.workspaceDescription}
              </p>
            </div>
            <div onClick={() => setEditting()} className="editWorkspaceDiv">
              <i
                style={{ fontSize: ".8em", marginRight: "1em" }}
                className="bi bi-pencil"
              ></i>
              <p>Edit workspace details</p>
            </div>
          </div>
        )}
      </div>
      <WorkspaceBoards
        shownWorkspace={shownWorkspace}
        setBoardCreating={showBoardCreating}
      />
      <PopUp />
    </div>
  );
};

export default Workspace;
