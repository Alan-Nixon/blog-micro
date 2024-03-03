import React, { useState } from 'react'
import { signupUser } from '../../BackendFunc'

export default function Signup() {
    const [formData, setFormData] = useState({ Email: "", Password: "", userName: "", Phone: "" })
    const [error, setError] = useState({ emailErr: "", passwordErr: "", userNameErr: "", PhoneErr: "" })

    const handleFormSubmit = async () => {
        if (validate(formData)) {
            if (await signupUser(formData)) {
                window.location.href = '/login'
            } else {
                setError((rest) => ({ ...rest, userNameErr: "user already exists" }))
            }
        }
    }

    function validate({ Email, Password, userName, Phone }) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(?:\+\d{1,3}\s?)?\(?\d{1,4}\)?\s?\d{6,}$/;
        const usernameRegex = /^[a-zA-Z0-9_ ]+$/;
        const passwordRegex = /^[a-zA-Z0-9]{6,}$/;

        if (emailRegex.test(Email)) {
            if (phoneRegex.test(Phone) && Number(Phone) > 0) {
                if (usernameRegex.test(userName) && userName.length > 2) {
                    if (passwordRegex.test(Password)) {
                        return true
                    } else {
                        setError((rest) => ({ ...rest, passwordErr: "Enter a valid password" }))
                        return false
                    }
                } else {
                    setError((rest) => ({ ...rest, userNameErr: "Enter a valid user name" }))
                    return false
                }

            } else {
                setError((rest) => ({ ...rest, PhoneErr: "Enter a valid Phone" }))
                return false
            }
        } else {
            setError((rest) => ({ ...rest, emailErr: "Enter a valid Email" }))
            return false
        }
    }


    return (
        <div className="formParent">
            <form>

                <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Sign up</h3>
                <div className="container">

                    {error.userNameErr && <p style={{ color: "red" }}>{error.userNameErr}</p>}
                    <label htmlFor="username"><b>User Name</b></label><br />
                    <input type="text" onChange={(e) => {
                        setFormData((prevState) => ({ ...prevState, userName: e.target.value }))
                        setError((rest) => ({ ...rest, userNameErr: "" }))
                    }} style={{ width: "52%" }} placeholder='Enter your user name' required /> <br />


                    <label htmlFor="Email"><b>Phone</b></label><br />
                    {error.PhoneErr && <p style={{ color: 'red' }}>{error.PhoneErr}</p>}
                    <input type="text" onChange={(e) => {
                        setFormData((prevState) => ({ ...prevState, Phone: e.target.value }))
                        setError((rest) => ({ ...rest, PhoneErr: "" }))
                    }} style={{ width: "52%" }} placeholder='Enter your Phone' required /> <br />


                    <label htmlFor="Email"><b>Email</b></label><br />
                    {error.emailErr && <p style={{ color: "red" }}>{error.emailErr}</p>}
                    <input type="text" onChange={(e) => {
                        setFormData((prevState) => ({ ...prevState, Email: e.target.value }))
                        setError((rest) => ({ ...rest, emailErr: "" }))
                    }} style={{ width: "52%" }} placeholder="Enter your Email" name="Email" required /> <br />


                    <label htmlFor="psw"><b>Password</b></label> <br />
                    {error.passwordErr && <p style={{ color: "red" }}>{error.passwordErr}</p>}
                    <input type="password" onChange={(e) => {
                        setFormData((prevState) => ({ ...prevState, Password: e.target.value }))
                        setError((rest) => ({ ...rest, passwordErr: "" }))
                    }} style={{ width: "52%" }} placeholder="Enter your Password" name="password" required /> <br /><br />
                    <a href="/login" style={{marginLeft:"32px"}}><b>Already have an account?Login</b></a> <br /><br />
                    <button type="button" style={{ width: "52%" }} onClick={handleFormSubmit}>Login</button>
                </div>

            </form >
        </div>
    )
}

