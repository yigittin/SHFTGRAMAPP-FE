import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BrowserRouter, Link } from "react-router-dom";
import Logo from "../../assets/SHFT-Logo.png"
import { isUserLoggedIn } from "../../Utils/APICalls";
function Navbar() {
	const navRef = useRef();
    const [isLogedIn,setIsLogedIn]=useState(isUserLoggedIn())
	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
            <Link to='/'><img className='logo' src={Logo} alt="logo"/></Link>            
            <nav ref={navRef}>
                <Link to='/'>Home</Link>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
                <Link to='/Profile'>Profile</Link>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
                <Link to='/search'>Search</Link>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
                {isLogedIn&& 
                <>
                    <Link to='/signout'>Sign Out</Link>
                    <button
                        className="nav-btn nav-close-btn"
                        onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </>
                }

            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
		</header>
	);
}

export default Navbar;