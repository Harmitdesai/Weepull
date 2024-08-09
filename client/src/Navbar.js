import { Link } from 'react-router-dom';
import './Navbar.css';
import wepullLogo from './wepull.jpeg';

const Navbar = () => {

    let intials = 'HD'

    return ( 
        <div className="Navbar">
            <div className = "logoDiv">
                <img src={wepullLogo} alt="Wepull Logo" id="navLogo"/>
                <span>WeePull</span>
            </div> 
            <div className="navOptions">
                <a href="services" className="unactivePage">Home</a>
                <a href="services" className="activePage" id="services">Services</a>
                <a href="services" className="unactivePage">Docs</a>
                <a href="services" className="unactivePage">About Us</a>
            </div>
            <div className="leftDiv">
                <Link to="Login" className="logout">
                    <button>Image</button>
                    <span>Log Out</span>
                </Link>
                <span className="profileLogo">&nbsp;{ intials }&nbsp;</span>
            </div>
        </div>
    );
}
 
export default Navbar;