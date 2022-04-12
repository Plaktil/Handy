import React from "react";
import {Link} from "react-router-dom";

function Navbar(props) {
    return (
        <div className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light bg-light nav-custom">
                <div className="container-fluid navbar-global">
                    <p className="navbar-title" href="#">Handy</p>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {props.menuItems.map((item, index) => {
                                return (
                                    <Link key={index} to={"/" + item}>
                                        <li className="container-fluid dropdown-item navbar-item">{item}</li>
                                    </Link>
                                    // Some menu items are still to be implemented on the server side
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;