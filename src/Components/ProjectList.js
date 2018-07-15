import React, { Component } from 'react';
import Project from './Project'
import { NavLink } from "react-router-dom";

class ProjectList extends Component {
    constructor(props){
        super(props)
        this.state = {
            projects: props.projects
        }
        
    }

    render() {
        return (
            <div className="row">
                {this.state.projects.map((proj) => {
                    return (
                        <div className="col" index={proj._id} key={proj._id} >
                        <NavLink exact to={(JSON.parse(sessionStorage.getItem('userType')) == 'consumer') ? '/ProjectProfile/' : '/EditProjectProfile/'} style={{ textDecoration: 'none' }} >
                            <Project project={proj} id={proj._id} key={proj._id} index={proj._id}>
                            </Project>
                        </NavLink>
                    </div>
                    )
                })}
            </div>
        )
    }

}


export default ProjectList;