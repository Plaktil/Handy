import React from "react";
import {Link} from "react-router-dom";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light nav-custom">
            <div className="container-fluid navbar-global">
                <p className="navbar-title" href="#">Handy</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to="/notes">
                            <li className="container-fluid dropdown-item navbar-item">Notes</li>
                        </Link>
                        <Link to="/checklists">
                            <li className="container-fluid dropdown-item navbar-item">Checklists</li>
                        </Link>
                        <Link to="/calendar">
                            <li className="container-fluid dropdown-item navbar-item">Calendar</li>
                        </Link>
                        {/* <Link to="/Alarms"><li className="container-fluid dropdown-item navbar-item">Alarms</li></Link> */}
                    </ul>
                </div>
            </div>
        </nav>

        // <div classNameName="header row">
        //     <h2 classNameName="col">Notes</h2>
        //     <h2 classNameName="col">Ckecklists</h2>
        //     <h1 classNameName="col-2" h1>Handy</h1>
        //     <h2 classNameName="col">Calender</h2>
        //     <h2 classNameName="col">Alarms</h2>
        // </div>
    )
}

export default Navbar;