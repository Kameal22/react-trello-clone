import "../../styles/navStyles/navRegister.css";
import { setPopUpMessage } from "../../redux/features/popUpMessagSlice";
import { registerUser } from "../../redux/features/usersSlice";
import { useDispatch } from "react-redux";
import useInputState from "../../hooks/useInputState";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<Props> = ({ setOpen }) => {
  const [name, setName, , , , , error, handleError] = useInputState("");
  const [password, setPassword] = useInputState("");

  const dispatch = useDispatch();

  const registration = (testLogin: string, testPassword: string) => {
    const user = { login: testLogin, password: testPassword };
    dispatch(registerUser(user));
  };

  const setMessage = (message: string) => {
    dispatch(setPopUpMessage({ message }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "" || password === "") {
      handleError("Please provide name and password");
    } else if (password.length < 5) {
      handleError("Password must contain at least 5 characters");
    } else {
      setMessage(`${name} registered in`);
      registration(name, password);
      setOpen(false);
      setTimeout(() => {
        setMessage("");
      }, 1500);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="registerDiv">
      <p className="registerHeading">Create account</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="registerInputs">
          <input
            placeholder="email"
            value={name}
            onChange={setName}
            type="text"
            name="name"
          />
          <input
            placeholder="password"
            value={password}
            onChange={setPassword}
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
