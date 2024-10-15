import wepullLogo from './wepull.jpeg';
import './Login.css';


const Login = () => {
    return (
    <div id="Loginflexbox">
        <div id="Logincontainer">
            <div id="loginLogo">
                <img src={wepullLogo} alt="Wepull Logo" id="navLogo"/>
                <span>
                    WeePull
                </span>
            </div>
            <div id="loginDetail">
                <span id="signInSign" >Sign in</span>
                <textarea id="email">Email / Username</textarea>
                <textarea id="password">Password</textarea>
                <button id="login">LOGIN</button>
                <a id="forPass">Forgot Password?</a>
                <div id="otherOptions">
                    <button id="Google">
                    {/* <img src={google} alt="Google Logo" id="googleLogo"/> */}
                    </button>
                    <button id="X">
                    {/* <img src={X} alt="X Logo" id="XLogo"/> */}
                    </button>
                    <button id="Microsoft">
                    {/* <img src={microSoft} alt="MicroSoft Logo" id="microSoftLogo"/> */}
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default Login;