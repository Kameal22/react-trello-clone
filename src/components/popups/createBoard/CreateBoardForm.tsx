import { WorkspaceInterface } from "../../../interfaces/WorkspaceInterface"

interface Props {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setBoardName: (e: React.FormEvent<HTMLInputElement>) => void;
    handleBoardWorkspaceChange: (e: React.FormEvent<HTMLSelectElement>) => void;
    workspaces: WorkspaceInterface[];
    boardName: string;
    boardWorkspace: string
}

const CreateBoardForm: React.FC<Props> = ({ handleSubmit, setBoardName, handleBoardWorkspaceChange, workspaces, boardName, boardWorkspace }) => {
    return (

        <form
            className="createBoardForm"
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div className="boardTitleDiv">
                <p className="boardTitle">Board title</p>
                <input
                    className="boardNameInput"
                    onChange={setBoardName}
                    type="text"
                    name="boardName"
                />
                <p className="boardTitleInfo">Board title is required!</p>
            </div>

            <div className="chooseWorkspaceDiv">
                <p className="workspaceChoiceHeading">Workspace</p>
                <select
                    onChange={handleBoardWorkspaceChange}
                    className="workspaceSelect"
                    name="workspaces"
                    id="workspaces"
                >
                    <option value="" disabled selected>
                        Select your option
                    </option>
                    {workspaces.map((workspace) => {
                        return (
                            <option
                                key={workspace.workspaceId}
                                value={workspace.workspaceName}
                            >
                                {workspace.workspaceName}
                            </option>
                        );
                    })}
                </select>
                <p className="boardTitleInfo">Workspace is required!</p>
            </div>

            <div className="submitDiv">
                <button
                    type="submit"
                    disabled={boardName === "" || !boardWorkspace}
                    className="submitBoardBtn"
                >
                    Create
                </button>
            </div>
        </form>
    )
}

export default CreateBoardForm;