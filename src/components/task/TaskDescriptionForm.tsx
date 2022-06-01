import "../../styles/taskStyles/taskDescriptionForm.css";
import { useState } from "react";

const TaskDescriptionForm: React.FC = () => {
  const [taskDescription, setTaskDescription] = useState<string>("");

  const handleDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setTaskDescription(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="taskDescriptionFormDiv">
      <form
        className="taskDescriptionForm"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          className="taskDescriptionInput"
          onChange={handleDescriptionChange}
          type="text"
          name="description"
          placeholder="Enter description"
        />
      </form>
    </div>
  );
};

export default TaskDescriptionForm;
