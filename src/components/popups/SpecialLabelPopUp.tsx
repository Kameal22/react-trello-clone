import "../../styles/popUpStyles/specialLabelPopUp.css";
import { fancyColorChoices } from "../../utils/TaskLabelColorChoices";
import { selectTaskLabel } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";

interface CreateLabelInterface {
  setCreating: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string;
}

const CreateLabelPopUp: React.FC<CreateLabelInterface> = (props) => {
  const dispatch = useDispatch();

  const setLabel = (indicator: string) => {
    dispatch(
      selectTaskLabel({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.columnId,
        taskId: props.taskId,
        taskIndicator: indicator,
      })
    );
    props.setCreating();
  };

  return (
    <div className="createLabel">
      <p className="createBoardHeading">Select special label</p>
      <i
        id="cornerIcon"
        onClick={() => props.setCreating()}
        className="bi bi-x"
      ></i>

      <div className="createLabelOptions">
        {fancyColorChoices.map((choice) => {
          return (
            <div
              onClick={() => setLabel(choice)}
              className="labelOption"
              style={{ background: choice }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateLabelPopUp;
