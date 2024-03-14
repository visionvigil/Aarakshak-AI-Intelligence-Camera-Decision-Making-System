import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputControl from '../InputControl/InputControl';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase';

export default function SignUp(props) {

    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    })

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    const handleOnSubmisson = () => {

        // console.log(values);
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Fill All Fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true)
        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                // console.log(res);
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name,
                });
                setSubmitButtonDisabled(false)
                navigate("/");
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
                    <h2 style={{ padding: 0 }}>Sign Up</h2>

                    <form>

                        <InputControl
                            label='Username'
                            type='text'
                            onChange={(event) =>
                                setValues((prev) => ({ ...prev, name: event.target.value }))
                            }
                            icon='user'
                        />

                        <InputControl
                            label='Email'
                            type='text'
                            onChange={(event) =>
                                setValues((prev) => ({ ...prev, email: event.target.value }))
                            }
                            icon="envelope"
                        />

                        <InputControl
                            label='Password'
                            type='password'
                            onChange={(event) =>
                                setValues((prev) => ({ ...prev, pass: event.target.value }))
                            }
                            icon="lock"
                        />
                        <b className='err-msg center'>{errorMsg}</b>
                        <button
                            id="btn"
                            defaultValue="Sign Up"
                            onClick={handleOnSubmisson}
                            disabled={submitButtonDisabled}
                        >
                            Sign Up
                        </button>
                         
                        <p>Already Have a Account <Link to='/'>Login</Link></p>

                    </form>
                </div>
            </div>
        </>
    )
}
