import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return <div className="navbar-ficxed">
        <nav className="z-depth-0">
            <div className="nav-wrapper white">
                <Link to="/" style={{ fontFamily: "monospace" }}
                    className="col s5 brand-logo cenetr black-text">
                    <i className="material-icons"> code</i>MERN
</Link>
            </div>
        </nav>

    </div>
}


export default Navbar;