import "../../styles/popUpStyles/taskDetailsPopUp.css";

const TaskDetailsPopUp: React.FC = () => {
  return (
    <div className="taskDetailsDiv">
      <div className="taskDetailsName">
        <p>Name</p>
        <i className="bi bi-x"></i>
      </div>

      <p className="taskDetailsListName">In column: To Do</p>

      <div className="taskDetailsLabel">
        <p>Label</p>
        <div className="taskDetailsLabelDivWithColor"></div>
      </div>

      <div className="taskDetailsDescriptionDiv">
        <p className="taskDetailsDescriptionHeading">Description</p>
        <p className="taskDetailsDescription">Description goes here look its very cool OR FORM to enter a description.</p>
      </div>

      <div className="taskDetailsActivityDiv">
        <p className="taskDetailsActivityHeading">Activity</p>
        <p className="taskDetailsActivityComment">Here is a comment on this task OR input to enter one. Each comment should be a separate component with some logic like deleting etc.</p>
      </div>
    </div>
  );
};

export default TaskDetailsPopUp;
