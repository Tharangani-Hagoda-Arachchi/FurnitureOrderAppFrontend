import React from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { validateForm } from '../../services/authValidation'
import { loginUser, registerUser } from '../../services/api'
import { authContext } from "../../context/authContext.jsx";


const Login = ({ setShowLogin }) => {
    // for current state
    const [curentState, setCurrentState] = React.useState("Login")
    // store form data
    const [formData, setFormData] = React.useState({ name: '', email: '', password: '', role: 'customer' })
    //errors
    const [error, setError] = React.useState('')

    const { login } = React.useContext(authContext)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    //handle form submision
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        // Use validation from separate file
        const errorMessage = validateForm(formData, curentState);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        try {
            if (curentState === "Sign Up") {
                const payload = { name: formData.name, email: formData.email, password: formData.password, role: 'customer' };
                const res = await registerUser(payload);
                console.log("Register response:", res);
            } else {
                const payload = { email: formData.email, password: formData.password };
                const res = await loginUser(payload);
                console.log("Login response:", res);
              
                
                //store access token
                const accessToken = res.accessToken; // direct access
                if (accessToken) {
                    login(accessToken); // store in context & localStorage
                } else {
                    alert("No access token returned from backend");
                }
            }
            setShowLogin(false);
            alert(`${curentState} successful!`);
        } catch (err) {
            alert(err.response?.data?.message || 'Error occurred');
        }
    };

    return (
        <div className='login'>
            <form className='login-container' onSubmit={handleSubmit}>
                <div className="login-title">
                    <h2>{curentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.crossIcon} alt="" />
                </div>
                <div className="login-inputs">
                    {curentState === "Login" ? <></> : <input type="text" name='name' placeholder='Your Name' required value={formData.name} onChange={handleChange} />}
                    <input type="email" name='email' placeholder='Your Email' required value={formData.email} onChange={handleChange} />
                    <input type="password" name='password' placeholder='Password' value={formData.password} required onChange={handleChange} />
                    {error && <p className="error">{error}</p>}
                </div>
                <button type='submit'>{curentState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-condition">
                    <input type="checkbox" required />
                    <p> By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {curentState === "Login"
                    ? <p>Crate a new account? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login Here</span></p>}


            </form>

        </div>
    )
}

export default Login 