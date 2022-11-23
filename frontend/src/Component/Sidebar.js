import {NavLink} from "react-router-dom";

export default function Sidebar() {

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
             style={{width: "280px", height: "100vh"}}>
            <NavLink to="/"
                     className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Messenger</span>
            </NavLink>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link text-white">
                        Utilisateurs
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}