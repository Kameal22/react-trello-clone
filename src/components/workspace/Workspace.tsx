import "../../styles/workspaceStyles/workspace.css";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { useState, useEffect } from "react";
import { editWorkspace } from "../../redux/features/WorkspaceSlice";
import { useSelector, useDispatch } from "react-redux";
import EditWorkspaceDetails from "./EditWorkspaceDetails";
import WorkspaceBoards from "./WorkspaceBoards";
import PopUp from "../popups/PopUpMessage";
import { changeColor } from "../../redux/features/navigationSlice";

const Workspace: React.FC = () => {
  const [workspaceEditing, setWorkspaceEditing] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { workspaceId } = useParams(); //This gives you ID of workspace showing in the component

  const workspaces = useSelector(
    // These are all workspaces from redux store
    (state: RootState) => state.workspace.workspace
  );

  const shownWorkspace = workspaces.find((workspace) => {
    //And this is the specific workspace that is viewed in component found by this ID up above.
    return workspace.workspaceId === workspaceId;
  });

  useEffect(() => {
    dispatch(
      changeColor({
        color: "#3cc384",
      })
    );
  }, []); // Change color to original after leaving a board.

  const setEditting = () => {
    setWorkspaceEditing(!workspaceEditing);
  };

  useEffect(() => {
    if (!shownWorkspace) {
      navigate(`/`, { replace: true });
    }
  }, [shownWorkspace]);

  const editWorkspaceFunc = (
    id: string | undefined,
    description: string | undefined
  ) => {
    dispatch(editWorkspace({ id, description }));
  };

  return (
    <div className="yourWorkspaceDiv">
      <div className="yourWorkspaceHeadingDiv">
        {workspaceEditing ? (
          <EditWorkspaceDetails
            editWorkspace={editWorkspaceFunc}
            setEditting={setEditting}
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
      <WorkspaceBoards shownWorkspace={shownWorkspace} />
      <PopUp />
    </div>
  );
};

export default Workspace;
