import "../../styles/taskStyles/taskOptionsForm.css";

interface OptionsFormInterface {
  showForm: () => void;
}

const TaskOptionsForm: React.FC<OptionsFormInterface> = (props) => {
  return (
    <div className="taskOptionsFormDiv">
      <p>Open task</p>

      <p>Edit labels</p>

      <p>Copy task</p>

      <p>Delete task</p>
    </div>
  );
};

export default TaskOptionsForm;
