import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import ProducerHeader from './ProducerHeader'
import ProjectList from './ProjectList'
import MdAdd from 'react-icons/lib/md/add';
import MdSave from 'react-icons/lib/md/save';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class ProducerHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            projects: null,
            edit: false,
            projectToAdd: {
                title: null,
                description: null,
                goal: null,
                cover_image: null,
                category: null,
                open_timestamp: null,
                deadline: null
            }
        }

        this.showProjects = this.showProjects.bind(this);
        this.createProject = this.createProject.bind(this);
        this.renderFORM = this.renderFORM.bind(this);
        this.doEdit = this.doEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Fetch the updated projects and store in state
    componentWillMount() {
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

    doEdit() {
        this.setState({ edit: true })
    }

    createProject(e) {
        e.preventDefault();
        
        let projectCopy = JSON.parse(JSON.stringify(this.state.projectToAdd))
        
        projectCopy['open_timestamp'] = new Date().toString();
        var deadlineDate = new Date();
        deadlineDate.setMonth(deadlineDate.getMonth() + 1);
        projectCopy['deadline'] = deadlineDate.toString();

        axios.post('https://pilotsapp.herokuapp.com/project/createProject/' + JSON.parse(sessionStorage.getItem('userPilotsDetails'))._id, {
            ...projectCopy
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

        NotificationManager.success(`${this.state.projectToAdd.title} has been created successfully`, '', 3000)
        this.setState({
            edit: false,
            loading: false
        });
        

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

    handleChange(event) {
        let projectCopy = JSON.parse(JSON.stringify(this.state.projectToAdd))
        projectCopy[event.target.name] = event.target.value;
        this.setState({
            projectToAdd: projectCopy
        })
    }

    renderFORM() {
        return (
            <div className="card">
                <form>
                    <label>
                        Title:
                        <input name='title' type='text' onChange={this.handleChange} />
                    </label>
                    <label>
                        Category:
                        <input name='category' type='text' onChange={this.handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea rows="7" cols="50" name='description' type='text' onChange={this.handleChange} />
                    </label>
                    <label>
                        Cover Image:
                        <input name='cover_image' type='text' onChange={this.handleChange} />
                    </label>
                    <label>
                        Goal:
                        <input name='goal' type='text' onChange={this.handleChange} />
                    </label>
                    <button onClick={this.createProject}><MdSave></MdSave></button>
                </form>
                <NotificationContainer />
            </div>
        )
    }

    // Showing all the projects to consumer
    showProjects() {
        return (
            <div>
                <button onClick={this.doEdit}><MdAdd></MdAdd> Add Project</button>
                <div className='projectList'>
                    <ProjectList projects={this.state.projects}>
                    </ProjectList>
                </div>
                <NotificationContainer />
            </div>
        )
    }

    render() {
        return (
                <div className='producerHome'>
                    <ProducerHeader></ProducerHeader>
                    <h1>{JSON.parse(sessionStorage.getItem('userPilotsDetails')).full_name}</h1>
                    <article className='profilePicture'>
                        <img src={JSON.parse(sessionStorage.getItem('userDetails')).imageUrl}></img>
                    </article>
                <NotificationContainer />
            {this.state.loading ? (this.state.edit ? this.renderFORM() : this.showProjects()) :
            <div className='sweet-loading'>
                <BeatLoader color={'#123abc'} />
            </div>}
            </div>
            )
    }
}

export default ProducerHome; 