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
            <div className='card bg-light mb-3' onClick={this.setProdId} style={{ textAlign: 'center', maxWidth: '18rem'}}>
                <article style={{ width: 'maxWidth'}}>
                    <img src={this.props.project.cover_image} style={{ align: 'center', width: '200px', height: '250px'}}></img>
                </article>
                <div className='card-header'>{this.props.project.title}</div>
                <div className='card-body' style={{ textAlign: 'left' }}>
                    <p><b> Category: </b>{this.props.project.category}</p>
                    <p><b> Subscribers: </b>{this.props.project.subscribers.length}</p>
                    <p><b> Status: </b><meter value={this.props.project.goal_status} min="0" max={this.props.project.goal}></meter> {isNaN((this.props.project.goal_status / this.props.project.goal) * 100) ? '0' : ((this.props.project.goal_status / this.props.project.goal) * 100)}%</p>
                </div>
            </div>
        )
    }
}

export default Project;