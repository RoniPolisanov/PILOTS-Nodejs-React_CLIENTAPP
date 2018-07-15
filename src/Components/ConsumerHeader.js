import React, { Component } from "react";
import header from "./ConsumerHeader.css"
import { NavLink } from "react-router-dom";

class ConsumerHeader extends Component{
    constructor(props){
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
        return(
            <div style={this.header}>
                <NavLink exact to='/ConsumerHome' activeStyle={this.active}>
                    Home
                </NavLink>
                <NavLink exact to='/ConsumerProfile' activeStyle={this.active}>
                    Profile
                </NavLink>
                <NavLink exact to='/ConsumerHome/MyActivity' activeStyle={this.active}>
                    My Activity
                </NavLink>
                <NavLink exact to='/' activeStyle={this.active}>
                    <p onClick={this.logout}>Logout</p>
                </NavLink>
            </div>
        )
    }
}

export default ConsumerHeader;