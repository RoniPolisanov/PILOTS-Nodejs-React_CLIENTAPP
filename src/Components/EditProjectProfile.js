import React, { Component } from 'react';
import axios from 'axios'
import { BeatLoader } from 'react-spinners';
import MdEdit from 'react-icons/lib/md/edit';
import MdSave from 'react-icons/lib/md/save';
import MdDelete from 'react-icons/lib/md/delete';
import ProducerHeader from './ProducerHeader'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class EditProjectProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            project: null,
            loading: false,
            edit: false
        }

        this.showDetails = this.showDetails.bind(this);
        this.renderFORM = this.renderFORM.bind(this);
        this.save = this.save.bind(this);
        this.doEdit = this.doEdit.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        axios.get('https://pilotsapp.herokuapp.com/project/getById/' + sessionStorage.getItem('projectID'))
        .then((response) => {
                console.log(response.data);
                this.setState({
                    project: response.data,
                    loading: true
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    save(e) {
        e.preventDefault();
        axios.put('https://pilotsapp.herokuapp.com/project/updateProject/' + this.state.project._id, {
            ...this.state.project
        }).then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
        
        NotificationManager.success(`${this.state.project.title} has been updated successfully`, '', 3000)
        this.setState({
            edit: false,
            loading: true
        });
    }

    doEdit() {
        this.setState({ edit: true })
    }

    handleChange(event) {
        let projectCopy = JSON.parse(JSON.stringify(this.state.project))
        projectCopy[event.target.name] = event.target.value;
        this.setState({
            project: projectCopy
        })
    }

    delete(){
        axios.delete('https://pilotsapp.herokuapp.com/project/deleteProject/' + this.state.project._id)
        .then(response => {
            console.log(response);
        })
            .catch(error => {
                console.log(error);
            });

        NotificationManager.warning(`${this.state.project.title} has been deleted successfully`, '', 3000);
        this.setState({
            project: null
        });
        this.props.history.push('/ProducerHome')

        axios.get('https://pilotsapp.herokuapp.com/project')
            .then(response => {
                console.log(response);
                this.setState({
                    projects: response.data,
                })
                var filtered = [];
                this.state.projects.map((a) => {
                    a.owner === JSON.parse(sessionStorage.getItem('userPilotsDetails'))._id ? filtered.push(a) : null;
                })
                this.setState({
                    projects: filtered,
                    loading: true
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderFORM() {
        return (
            <div className="card">
                <form>
                    <label>
                        Title:
                        <input name='title' type='text' value={this.state.project.title} onChange={this.handleChange} />
                    </label>
                    <label>
                        Category:
                        <input name='category' type='text' value={this.state.project.category} onChange={this.handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea rows="10" cols="50" name='description' type='text' value={this.state.project.description} onChange={this.handleChange} />
                    </label>
                    <label>
                        Cover Image:
                        <input name='cover_image' type='text' value={this.state.project.cover_image} onChange={this.handleChange} />
                    </label>
                    <button onClick={this.save}><MdSave></MdSave></button>
                    <button onClick={this.delete}><MdDelete /></button>
                </form>
            </div>
                )
    }

    showDetails() {
        return (
            <div>
                <div className='card' key={this.state.project._id} index={this.state.project._id}>
                    <h5>{this.state.project.title}</h5>
                    <p>Category: {this.state.project.category}</p>
                    <p>Positive Voters: {this.state.project.positive_voters.length}</p>
                    <p>Negative Voters: {this.state.project.negative_voters.length}</p>
                    <p>Subscribers Voters: {this.state.project.subscribers.length}</p>
                    <p>Description: {this.state.project.description}</p>
                    <p>Status: <meter value={this.state.project.goal_status} min="0" max={this.state.project.goal}></meter> {isNaN((this.state.project.goal_status / this.state.project.goal) * 100) ? '0' : ((this.state.project.goal_status / this.state.project.goal) * 100)}%</p>
                    <p>Opening Date: {this.state.project.open_timestamp}</p>
                    <p>Deadline: {this.state.project.deadline}</p>
                    <button onClick={this.doEdit}><MdEdit></MdEdit></button>
                </div>
                <NotificationContainer/>
            </div>
        )

    }

    render() {
        return (
            this.state.loading ?
                (<div className="producerProfile">
                    <ProducerHeader></ProducerHeader>
                    <article className='profilePicture'>
                        <img src={JSON.parse(sessionStorage.getItem('userDetails')).imageUrl}></img>
                    </article>
                    <NotificationContainer />
                    <h1>{this.state.project.title}</h1>
                    <img src={this.state.project.cover_image} style={{ width: '170px', height: '170px' }}></img>
                    {(this.state.edit ? this.renderFORM() : this.showDetails())}
                </div>) : (<div className='sweet-loading'> <BeatLoader color={'#123abc'}/> </div>)
        )
    }
}

export default EditProjectProfile;