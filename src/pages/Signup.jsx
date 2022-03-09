import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { notify } from "../services/toast";

const Signup = () => {

    const emailRef = useRef("");
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: need to validate the form
        AuthService.signup({
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value })
            .then(response => {
                notify(response.data.message, 'success', 5000);
                navigate('/login', { replace: true });
            })
            .catch(err => {
                console.log(err.response);
                notify(err.response.data.message, 'error', 5000);
            });
    }
    return (
        <div className="card text-center mx-auto"
            style={{ width: "20vw" }}>
            <div className="card-header"><h5>Sign up</h5></div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="px-2">
                    <div className="form-group mb-3">
                        <input type="text"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            ref={emailRef} />
                    </div>
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
                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;