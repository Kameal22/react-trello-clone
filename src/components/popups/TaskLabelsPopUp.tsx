import "../../styles/popUpStyles/taskLabelsPopUp.css";
import { colorChoices } from "../../utils/TaskLabelColorChoices";
import { selectTaskLabel } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface TaskLabelsInterface {
  editLabels: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string;
}

const TaskLabelsPopUp: React.FC<TaskLabelsInterface> = (props) => {
  const dispatch = useDispatch();

  const test = (indicator: string) => {
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
        <i onClick={() => props.editLabels()} className="bi bi-x"></i>
      </div>

      <p className="labelsInfo">Labels</p>

      <div className="colorLabels">
        {colorChoices.map((choice) => {
          return (
            <div
              onClick={() => test(choice)}
              className="colorLabelDiv"
              style={{ background: choice }}
            ></div>
          );
        })}
      </div>

      <button className="createLabelBtn">Create label</button>
    </div>
  );
};

export default TaskLabelsPopUp;
