import "../../styles/navStyles/navRegister.css";
import { showDropdown } from "../../redux/features/navigationSlice";
import { setPopUpMessage } from "../../redux/features/popUpMessagSlice";
import { testRegisterUser } from "../../redux/features/usersSlice";
import { useDispatch } from "react-redux";
import useInputState from "../../hooks/useInputState";

interface RegisterProps {
  forwardRef: React.RefObject<HTMLDivElement>;
}

const Register: React.FC<RegisterProps> = ({ forwardRef }) => {
  const [name, setName, , , , , error, handleError] = useInputState("");
  const [password, setPassword] = useInputState("");

  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const testRegistration = (testLogin: string, testPassword: string) => {
    const user = { login: testLogin, password: testPassword };
    dispatch(testRegisterUser(user));
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
      setDropdown("");
      setMessage(`${name} registered in`);
      testRegistration(name, password);
      setTimeout(() => {
        setMessage("");
      }, 1500);
    }
  };

  return (
    <div ref={forwardRef} className="registerDiv">
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
