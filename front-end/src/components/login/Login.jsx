import { useState } from 'react'
import './Login.css'
import { userLogin } from '../../BackendFunc'

export default function Login() {
    const [formData, setFormData] = useState({ Email: "", Password: "" })
    const [error, setError] = useState({ emailErr: "", passwordErr: "" })

    const handleFormSubmit = async () => {
        if (validateForm(formData)) {
            alert("success")
            const result = await userLogin(formData, setError)
            if (result) {
                window.location.href = '/'
            }
        } else {
            alert("failure")
        }
    }

    function validateForm({ Email, Password }) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
        if (emailRegex.test(Email)) {
            if (passwordRegex.test(Password)) {
                return true
            } else {
                setError((rest) => ({ ...rest, passwordErr: "Enter a valid password" }))
                return false
            }
        } else {
            setError((rest) => ({ ...rest, emailErr: "Enter a valid email" }))
            return false
        }
    }

    return (
        <div className="formParent">
            <form>
                <div className="imgcontainer">
                    <img src="https://s3.ap-south-1.amazonaws.com/assets.ynos.in/startup-logos/YNOS427860.jpg" alt="Avatar" className="avatarLogo" />
                </div>
                <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Login</h3>
                <div className="container">

                    {error.emailErr && <p style={{ color: "red", marginLeft: '25px' }}>{error.emailErr}</p>}
                    <label htmlFor="uname"><b>Email</b></label> <br />
                    <input type="text" onChange={(e) => {
                        setFormData((prevState) => ({ ...prevState, Email: e.target.value }))
                        setError((rest) => ({ ...rest, emailErr: "" }))
                    }} placeholder="Enter your Email" name="Email" required defaultValue="alan@gmail.co"
                        style={{ width: "52%" }}
                    /> <br /> <br />

                    <label htmlFor="psw"><b>Password</b></label> <br />

                    {error.passwordErr && <p style={{ color: "red" }}>{error.passwordErr}</p>}
                    <input type="password" onChange={(e) => {
                        setFormData((prevState) => ({ ...prevState, Password: e.target.value }))
                        setError((rest) => ({ ...rest, passwordErr: "" }))
                    }} style={{ width: "52%" }} placeholder="Enter your Password"
                        name="password" required defaultValue="alan252" /> <br />
                    <a href="/signup" style={{ marginLeft: "32px" }}><b>Dont have an account?signup</b></a><br />
                    <button type="button" onClick={handleFormSubmit} style={{ width: "52%" }}>Login</button>
                </div>

            </form >
        </div>
    )
}