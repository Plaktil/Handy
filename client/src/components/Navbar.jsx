import React from "react";

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
                        <li><a className="container-fluid dropdown-item navbar-item" href="#">Notes</a></li>
                        <li><a className="container-fluid dropdown-item navbar-item" href="#">Calender</a></li>
                        <li><a className="container-fluid dropdown-item navbar-item" href="#">Alarms</a></li>
                        <li><a className="container-fluid dropdown-item navbar-item" href="#">Ckecklists</a></li>
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