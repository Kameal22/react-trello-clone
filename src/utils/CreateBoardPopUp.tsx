import "../styles/popUpStyles/createBoardPopUp.css";

interface CreateBoardInterface {
    setBoardCreating: () => void
}

const CreateBoardPopUp: React.FC<CreateBoardInterface> = (props) => {
    return (
        <div className="createBoardDiv">
            <p className="createBoardHeading">Create board</p>
            <i onClick={() => props.setBoardCreating()} className="bi bi-x"></i>
        </div>
    )
}

export default CreateBoardPopUp