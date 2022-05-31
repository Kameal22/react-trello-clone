import "../../styles/popUpStyles/taskDetailsPopUp.css";

const TaskDetailsPopUp: React.FC = () => {
  return (
    <div className="taskDetailsDiv">
      <div className="taskDetailsName">
        <p>Name</p>
        <i className="bi bi-x"></i>
      </div>

      <p className="taskDetailsListName">In column: To Do</p>

      <div className="taskDetailsDescription">
        <p className="taskDetailsDescriptionHeading">Description</p>
      </div>

      <div className="taskDetailsActivityDiv">
        <p>Activity</p>
      </div>
    </div>
  );
};

export default TaskDetailsPopUp;
