import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthService from "../services/AuthService";
import { notify } from "../services/toast";

const Login = () => {

    const { setAuth } = useAuth();
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        AuthService.login({ username: usernameRef.current.value, password: passwordRef.current.value })
            .then(response => {
                console.log(response);
                notify('Login successful', 'success');

                // Store credentials in AuthContext
                const { username, authToken, refreshToken } = response.data;
                setAuth({ username, authToken, refreshToken });
                navigate('/', { replace: true });
            })
            .catch(err => {
                console.log(err.response);
                notify(err.response.data.errorMessage, 'error');
            });
    }

    return (
        <div className="card text-center mx-auto"
            style={{ width: "20vw" }}>
            <div className="card-header"><h5>Login</h5></div>
            <div className="card-body">
                <form
                    onSubmit={handleSubmit}
                    method="post" className="px-2">
                    <div className="form-group mb-3">
                        <input type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            name="username"
                            ref={usernameRef} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="text"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            name="password"
                            ref={passwordRef} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;