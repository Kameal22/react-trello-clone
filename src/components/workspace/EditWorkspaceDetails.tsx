import "../../styles/workspaceStyles/editWorkspaceDetails.css";
import { useState } from "react";
import { editWorkspace } from "../../redux/features/WorkspaceSlice";
import { useSelector, useDispatch } from "react-redux";

interface EditWorkspaceProps {
  workspaceName: string | undefined;
  workspaceDescription: string | undefined;
  workspaceId: number | undefined;
  setEditting: () => void;
}

const EditWorkspaceDetails: React.FC<EditWorkspaceProps> = (props) => {
  const dispatch = useDispatch();
  const [workspaceName, setWorkspaceName] = useState<string | undefined>(
    props.workspaceName
  );
  const [workspaceDescription, setWorkspaceDescription] = useState<
    string | undefined
  >(props.workspaceDescription);

  const editWorkspaceFunc = (
    id: number | undefined,
    name?: string,
    description?: string
  ) => {
    dispatch(editWorkspace({ id, name, description }));
  };

  const handleWorkspaceNameChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setWorkspaceName(e.currentTarget.value);
  };
  const handleWorkspaceDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setWorkspaceDescription(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editWorkspaceFunc(props.workspaceId, workspaceName, workspaceDescription);
    props.setEditting();
  };

  return (
    <div className="editWorkspaceDetailsDiv">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="inputEditDiv">
          <p className="workspaceName">Workspace name</p>
          <input
            className="workspaceNameInput"
            placeholder="Code together"
            value={workspaceName}
            onChange={handleWorkspaceNameChange}
            type="text"
            name="workspaceName"
          />
        </div>

        <div className="inputEditDiv">
          <p className="workspaceDescription">Workspace description</p>
          <input
            placeholder="We organize everything here"
            className="workspaceDescriptionInput"
            value={workspaceDescription}
            onChange={handleWorkspaceDescriptionChange}
            type="text"
            name="workspaceName"
          />
        </div>

        <div className="editWorkspaceButtons">
          <button type="submit" className="saveButton">
            Save
          </button>
          <button onClick={() => props.setEditting()} className="cancelButton">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWorkspaceDetails;
