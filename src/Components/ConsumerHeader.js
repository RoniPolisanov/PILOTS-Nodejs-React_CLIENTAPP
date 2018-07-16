import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';

class ConsumerHeader extends Component{
    constructor(props){
        super(props)

        this.logout = this.logout.bind(this)
        this.reload = this.reload.bind(this)
    }

    reload(){
        window.location.reload();
    }

    // Log out and clean the connection storage
    logout() {
        console.log('Logged out, connection sotrage clened')
        sessionStorage.clear();
    }

    // CSS
    active = {
        textDecoration: "underline",
        color: "black",
        fontWeight: "bold",
    };
    
    // CSS
    header = {
        backgroundColor: "#168be3",
        color: "white",
        listStyle: "none",
        display: "flex",
        justifyContent: "space-evenly",
    };

    NavLink = {
        textDecoration: "none",
        paddingRight: "10px",
        color: "white",
        fontFamily: "ABeeZee, sans-serif",
        paddingRight: "15px",
        paddingTop: "15px"        
    }

    ArrowNavLink = {
        textDecoration: "none",
        paddingRight: "10px",
        color: "white",
        fontFamily: "ABeeZee, sans-serif",
        paddingLeft: "10px",
        paddingTop: "15px"        
    }

    render() {
        return(
            <div style={this.header}>
            <MdKeyboardArrowLeft onClick={this.reload}> </MdKeyboardArrowLeft>
                <NavLink style={this.NavLink} exact to='/ConsumerHome' activeStyle={this.active}>
                    Home
                </NavLink>
                <NavLink style={this.NavLink}exact to='/ConsumerProfile' activeStyle={this.active}>
                    Profile
                </NavLink>
                <NavLink style={this.NavLink} exact to='/ConsumerHome/MyActivity' activeStyle={this.active}>
                   Activity
                </NavLink>
                <NavLink style={this.NavLink} exact to='/' activeStyle={this.active}>
                    <p onClick={this.logout}>Logout</p>
                </NavLink>
            </div>
        )
    }
}

export default ConsumerHeader;