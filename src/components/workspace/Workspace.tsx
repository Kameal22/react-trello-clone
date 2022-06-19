import "../../styles/workspaceStyles/workspace.css";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import Nav from "../nav/Nav";
import { useState, useEffect, useRef } from "react";
import { editWorkspace } from "../../redux/features/WorkspaceSlice";
import { useSelector, useDispatch } from "react-redux";
import EditWorkspaceDetails from "./EditWorkspaceDetails";
import WorkspaceBoards from "./WorkspaceBoards";
import CreateBoardPopUp from "../popups/CreateBoardPopUp";
import CreateWorkspacePopUp from "../popups/CreateWorkspacePopUp";
import PopUp from "../popups/PopUpMessage";
import { changeColor } from "../../redux/features/navigationSlice";
import { useNavigate } from "react-router-dom";

const Workspace: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);
  const [workspaceEditing, setWorkspaceEditing] = useState<boolean>(false);
  const [boardCreating, setBoardCreating] = useState<boolean>(false);

  const createWorkspaceRef = useRef<HTMLDivElement>(null);

  const createBoardRef = useRef<HTMLDivElement>(null);

  const workspaces = useSelector(
    // These are all workspaces from redux store
    (state: RootState) => state.workspace.workspace
  );

  const { workspaceId } = useParams(); //This gives you ID of workspace showing in the component

  const shownWorkspace = workspaces.find((workspace) => {
    //And this is the specific workspace that is viewed in component found by this ID up above.
    return workspace.workspaceId === workspaceId;
  });

  // useEffect(() => {
  //   if (workspaces.length < 1) {
  //     navigate("/", { replace: true });
  //   }
  // }, [workspaces]);

  useEffect(() => {
    dispatch(
      changeColor({
        color: "#3cc384",
      })
    );
  }, []); // Change color to original after leaving a board.

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
    description: string | undefined
  ) => {
    dispatch(editWorkspace({ id, description }));
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!createWorkspaceRef.current?.contains(event.target as Node)) {
        setCreateWorkspacePopUp(false);
      }
    });
  });

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!createBoardRef.current?.contains(event.target as Node)) {
        setBoardCreating(false);
      }
    });
  });

  return (
    <div className="yourWorkspaceDiv">
      <Nav
        showCreateBoard={showBoardCreating}
        showCreateWorkspace={showWorkspaceCreation}
      />
      {boardCreating ? (
        <CreateBoardPopUp forwardRef={createBoardRef} setBoardCreating={showBoardCreating} />
      ) : null}

      {createWorkspacePopUp ? (
        <CreateWorkspacePopUp forwardRef={createWorkspaceRef} showCreateWorkspace={showWorkspaceCreation} />
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
