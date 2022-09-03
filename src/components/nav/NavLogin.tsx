import "../../styles/navStyles/navRegister.css";
import { setPopUpMessage } from "../../redux/features/popUpMessagSlice";
import { loginUser } from "../../redux/features/usersSlice";
import { useDispatch } from "react-redux";
import useInputState from "../../hooks/useInputState";

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setOpen }) => {
    const [login, setLogin, , , , , error, handleError] = useInputState("");
    const [password, setPassword] = useInputState("");

    const dispatch = useDispatch();

    const logginIn = (login: string, password: string, isLoggedIn: boolean) => {
        const user = { login: login, password: password, isLoggedIn: isLoggedIn }
        dispatch(loginUser(user))
    }

    const setMessage = (message: string) => {
        dispatch(setPopUpMessage({ message }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (login === "" || password === "") {
            handleError("Please provide name and password");
        } else {
            setMessage(`${login} logged in`);
            logginIn(login, password, true)
            setOpen(false);
            setTimeout(() => {
                setMessage("");
            }, 1500);
        }
    };

    return (
        <div onClick={(e) => e.stopPropagation()} className="registerDiv">
            <p className="registerHeading">Log in</p>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="registerInputs">
                    <input
                        placeholder="email"
                        value={login}
                        onChange={setLogin}
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

export default Login;
