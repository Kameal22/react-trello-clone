import "../../styles/popUpStyles/specialLabelPopUp.css";
import { fancyColorChoices } from "../../utils/TaskLabelColorChoices";
import { selectTaskLabel } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { addLabelToHighlightedTask } from "../../utils/SetHighlightedTask";
import { useSetHT } from "../../context/highlightedTaskContext";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";
import { useContext } from "react";

interface CreateLabelInterface {
  setCreating: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string;
}

const CreateLabelPopUp: React.FC<CreateLabelInterface> = (props) => {
  const dispatch = useDispatch();
  const setHighlight = useSetHT();
  const highlights = useContext(HighlightedTaskContext);

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
    addLabelToHighlightedTask(
      highlights,
      props.taskId,
      indicator,
      setHighlight
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
              key={choice}
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
