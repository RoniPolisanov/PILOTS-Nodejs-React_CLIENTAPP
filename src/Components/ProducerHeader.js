import React, { Component } from "react";
import ProducerCSS from "./ProducerHeader.css"
import { NavLink } from "react-router-dom";

class ProducerHeader extends Component {
    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this)
    }

    logout() {
        console.log('logged out bitch')
        sessionStorage.clear();
    }

    active = {
        backgroundColor: "#212F3D",
        color: "white",
        fontWeight: "bold",
        paddingTop: "9px"
    };

    header = {
        listStyle: "none",
        display: "flex",
        justifyContent: "space-evenly"
    };

    render() {
        return (
            <div style={this.header}>
                <NavLink exact to='/ProducerHome' activeStyle={this.active}>
                    My Projects
                </NavLink>
                <NavLink exact to='/ProducerProfile' activeStyle={this.active}>
                    Profile
                </NavLink>
                <NavLink exact to='/' activeStyle={this.active}>
                    <p onClick={this.logout}>Logout</p>
                </NavLink>
            </div>
        )
    }
}

export default ProducerHeader;