import React, { Component } from 'react';

class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectID: this.props.project._id
        }
        this.setProdId = this.setProdId.bind(this)
    }

    setProdId(_id) {
        sessionStorage.setItem('projectID', this.state.projectID);
    }

    render() {
        return (
            <article className='card-body' onClick={this.setProdId}>
                <img src={this.props.project.cover_image} style={{ width: '170px', height: '170px'}}></img>
                <h5>{this.props.project.title}</h5>
                <p>Category: {this.props.project.category}</p>
                <p>Subscribers: {this.props.project.subscribers.length}</p>
                <p>Status: <meter value={this.props.project.goal_status} min="0" max={this.props.project.goal}></meter> {isNaN((this.props.project.goal_status / this.props.project.goal) * 100) ? '0' : ((this.props.project.goal_status / this.props.project.goal) * 100)}%</p>
            </article>
        )
    }
}

export default Project;