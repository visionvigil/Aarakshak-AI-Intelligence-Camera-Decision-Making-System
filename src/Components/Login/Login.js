import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputControl from '../InputControl/InputControl';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';

export default function Login(props) {

    const [values, setValues] = useState({
        email: "",
        pass: ""
    });


    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    const handleOnSubmisson = () => {

        // console.log(values);
        if (!values.email || !values.pass) {
            setErrorMsg("Fill All Fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                console.log(res);
                navigate("panel/dashboard");
                setSubmitButtonDisabled(false)
            })
            .catch((err) => {
                setSubmitButtonDisabled(false)
                // console.log("ERROR - ", err.message);
                setErrorMsg(err.message);
            });
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={props.logo} alt="Logo" width="20" height="24" className="d-inline-block align-text-top logo-align" />
                        <span style={{ marginLeft: `34px` }}>{props.title}</span>
                    </a>
                </div>
            </nav>
            <div className="form-container">
                <div className="body-container">
                    <h2>Login</h2>

                    <form>

                        <InputControl
                            label='Email'
                            type='email'
                            onChange={(event) =>
                                setValues((prev) => ({ ...prev, email: event.target.value }))
                            }
                            icon='envelope'
                        />

                        <InputControl
                            label='Password'
                            type='password'
                            onChange={(event) =>
                                setValues((prev) => ({ ...prev, pass: event.target.value }))
                            }
                            icon='lock'
                        />

                        <p className='for-rem'>
                            <span><input type="checkbox" />Remember Me</span>
                            <a href='/'>Forget Password</a>
                        </p>

                        <b className='err-msg center'>{errorMsg}</b>
                        <button
                            id="btn"
                            defaultValue="Login"
                            onClick={handleOnSubmisson}
                            disabled={submitButtonDisabled}
                        >
                            Login
                        </button>

                        <p>Don't have a account? <Link to='/signup'>Register</Link></p>

                    </form>
                </div>
            </div>
        </>
    )
}
