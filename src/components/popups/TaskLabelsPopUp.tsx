import "../../styles/popUpStyles/taskLabelsPopUp.css";
import { colorChoices } from "../../utils/TaskLabelColorChoices";
import { selectTaskLabel } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";

interface TaskLabelsInterface {
  editLabels: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string;
  chosenIndicator: string;
}

const TaskLabelsPopUp: React.FC<TaskLabelsInterface> = (props) => {
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
    props.editLabels();
  };

  return (
    <div className="editTaskLabelsDiv">
      <div className="edidTaskDivHeading">
        <p className="editTaskHeading">Labels</p>
        <i
          id="cornerIcon"
          onClick={() => props.editLabels()}
          className="bi bi-x"
        ></i>
      </div>

      <p className="labelsInfo">Labels</p>

      <div className="colorLabels">
        {colorChoices.map((choice) => {
          return (
            <div
              key={choice}
              onClick={() => setLabel(choice)}
              className="colorLabelDiv"
              style={{ background: choice }}
            >
              <i
                style={
                  props.chosenIndicator === choice
                    ? { display: "block" }
                    : { display: "none" }
                }
                className="bi bi-check-lg"
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskLabelsPopUp;
