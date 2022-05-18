import "../../styles/navStyles/navRegister.css";
import { useState } from "react";
import { registerUser } from "../../redux/features/registerSlice";
import { showDropdown } from "../../redux/features/navigationSlice";
import { setPopUpMessage } from "../../redux/features/popUpSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const setMessage = (message: string) => {
    dispatch(setPopUpMessage({ message }));
  };

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setName(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "" || password === "") {
      setError("Please provide name and password");
    } else if (password.length < 5) {
      setError("Password must contain at least 5 characters");
    } else {
      dispatch(registerUser({ name, password }));
      setDropdown("");
      setMessage(`${name} registered in`);
      setTimeout(() => {
        setMessage("");
      }, 1500);
    }
  };

  return (
    <div className="registerDiv">
      <p className="registerHeading">Create account</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="registerInputs">
          <input
            placeholder="email"
            value={name}
            onChange={handleNameChange}
            type="text"
            name="name"
          />
          <input
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            name="name"
          />
        </div>
        <p className="error">{error}</p>
        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
