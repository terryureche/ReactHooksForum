import React from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";
import { Link } from "react-router-dom";


const INITIAL_STATE = {
    name: "",
    email: "",
    password: ""
}

function Login(props) {
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isSubmitting
    } = useFormValidation(
        INITIAL_STATE,
        validateLogin,
        authenticateUser
    );
    const [login, setLogin] = React.useState(true);
    const [firebaseError, setFirebaseError] = React.useState(null);

    async function authenticateUser() {
        const { name, email, password } = values;
        try {
            const response = login
                ? await firebase.login(email, password)
                : await firebase.register(name, email, password);

            props.history.push("/");
        } catch (err) {
            console.error('Auth error', err);
            setFirebaseError(err.message);
        }
    }

    return (
        <div>
            <h2 className="mv3">{login ? "Login" : "CreateAccount"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-column">
                {!login &&
                    (<input
                        type="text"
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        placeholder="Your name"
                        autoComplete="off"
                    />)}
                <input
                    type="email"
                    name="email"
                    className={errors.email && 'error-input'}
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    autoComplete="off"
                />
                {
                    errors.email && <p className="error-text">{errors.email}</p>
                }
                {
                    firebaseError && <p className="error-text">{firebaseError}</p>
                }
                <input
                    type="password"
                    name="password"
                    className={errors.password && 'error-input'}
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Choose a secure password"
                />
                {
                    errors.password && <p className="error-text">{errors.password}</p>
                }
                <div className="flex mt3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ background: isSubmitting ? "grey" : "orange" }}
                        className="button pointer mr2"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="pointer button"
                        onClick={() => setLogin(prevLogin => !prevLogin)}>
                        {login ? "need to create an account?" : "already have an account?"}
                    </button>
                </div>
            </form>
            <div className="forgot-password">
                <Link to="/forgot">
                    Forgot password?
                </Link>
            </div>
        </div>
    )
}

export default Login;
