import React, { Component } from "react";
import "./Header.css"
import { NavLink } from "react-router-dom";

class Header extends Component{
    //super(props)
    render() {
        return(
            <div style={this.header}>
                <NavLink exact to='/' activeStyle={this.active}>
                </NavLink>
            </div>
        )
    }
}

export default Header;