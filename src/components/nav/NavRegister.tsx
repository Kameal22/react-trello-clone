import "../../styles/navStyles/navRegister.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, logoutUser } from "../../redux/features/registerSlice";

interface RegisterProps {
  setRegistering: () => void;
}

const Register: React.FC<RegisterProps> = (props) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

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
    } else {
      dispatch(registerUser({ name, password }));
      props.setRegistering();
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
