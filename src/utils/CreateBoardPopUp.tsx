import "../styles/popUpStyles/createBoardPopUp.css";
import { colorChoices } from "../utils/BoardBgColorChoices"

interface CreateBoardInterface {
    setBoardCreating: () => void
}

const CreateBoardPopUp: React.FC<CreateBoardInterface> = (props) => {
    return (
        <div className="createBoardDiv">
            <p className="createBoardHeading">Create board</p>
            <i onClick={() => props.setBoardCreating()} className="bi bi-x"></i>

            <div className="createBoardImg"><img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" /></div>

            <div className="createBoardBackground">
                <p>Background</p>

                <div className="colorChoice">

                    {colorChoices.map((choice) => {
                        return (
                            <div className="colorChoiceDiv" style={{ backgroundColor: choice }}></div>
                        )
                    })}
                </div>
            </div>

            <div className="boardTitleDiv">
                <p className="boardTitle">Board title</p>
                <input
                    className="boardNameInput"
                    type="text"
                    name="boardName"
                />
                <p className="boardTitleInfo">Board title is required!</p>
            </div>

            <div className="chooseWorkspaceDiv">
                <p className="workspaceChoiceHeading">
                    Workspace
                </p>
                <select className="workspaceSelect" name="workspaces" id="workspaces">
                    <option value="volvo">First</option>
                    <option value="saab">Secound</option>
                </select>
            </div>

            <div className="submitDiv">
                <button className="submitBoardBtn">Create</button>
            </div>

        </div>
    )
}

export default CreateBoardPopUp