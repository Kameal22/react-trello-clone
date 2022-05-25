import "../../styles/boardStyles/addTaskForm.css";
import { useState } from "react";

interface AddTaskInterface {
    addTask: () => void
}

const AddTaskForm: React.FC<AddTaskInterface> = (props) => {
    const [taskName, setTaskName] = useState<string>("");

    const handleTaskNameChange = (
        e: React.FormEvent<HTMLInputElement>
    ): void => {
        setTaskName(e.currentTarget.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="addTaskFormDiv">
            <div className="addTaskDiv">
                <form
                    className="addTaskForm"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="taskNameInput"
                        onChange={handleTaskNameChange}
                        type="text"
                        name="taskName"
                        placeholder="Enter a title for this task.."
                    />
                    <div className="addTaskButtonIcon">
                        <button type="submit">Add Task</button>
                        <i style={{ fontSize: "1.4em" }} onClick={() => props.addTask()} className="bi bi-x-lg"></i>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTaskForm;