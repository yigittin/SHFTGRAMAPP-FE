import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BrowserRouter, Link } from "react-router-dom";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
            <h3>LOGO</h3>
            <nav ref={navRef}>
                <Link to='/'>Home</Link>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
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