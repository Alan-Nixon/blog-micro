import React from 'react'
import { Logout } from '../BackendFunc'

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-inverse" style={{ position: "fixed", width: "100%",height:"35px", zIndex:"2" }}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">WebSiteName</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li style={{ marginLeft: "5px" }}><a href="/"><span style={{color:"white"}}>Home</span></a></li>
                    </ul>
                    <span style={{ color: "white", marginLeft: "30%", fontSize: "25px", marginTop: "10px", fontWeight: "bolder" }}>Hi, Alan</span>
                    <div onClick={Logout} style={{
                        float: "right",
                        cursor:"pointer"
                    }}>
                        <span style={{ color: "white", marginRight: "10px", marginTop: "-15px" }}><b>LOGOUT</b></span>
                        <i className="fa fa-sign-out" style={{
                            fontSize: "30px",
                            color: "white",
                            marginTop: "10px"
                        }} />
                    </div>

                </div>
            </nav >
        </div>
    )
}

export default Navbar
