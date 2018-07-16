import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import ProducerHeader from './ProducerHeader'
import ProjectList from './ProjectList'
import MdAdd from 'react-icons/lib/md/add';
import MdSave from 'react-icons/lib/md/save';
import IoJet from 'react-icons/lib/io/jet';
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
        this.fetchProjects = this.fetchProjects.bind(this);
    }

    // Fetch the updated projects and store in state
    fetchProjects(){
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

    componentWillMount() {
        this.fetchProjects()
    }


    doEdit() {
        this.setState({ edit: true })
    }

    createProject(e) {
        e.preventDefault();
        let projectCopy = JSON.parse(JSON.stringify(this.state.projectToAdd))
        
        //check if all fields are ok
        if (projectCopy.title && projectCopy.category && projectCopy.description && projectCopy.cover_image && projectCopy.goal) {
            projectCopy['open_timestamp'] = new Date().toString();
            var deadlineDate = new Date();
            deadlineDate.setMonth(deadlineDate.getMonth() + 1);
            projectCopy['deadline'] = deadlineDate.toString();

            this.setState({
                edit: false,
                loading: false
            });

            axios.post('https://pilotsapp.herokuapp.com/project/createProject/' + JSON.parse(sessionStorage.getItem('userPilotsDetails'))._id, {
                ...projectCopy
            })
            .then(response => {
                NotificationManager.success(`${this.state.projectToAdd.title} has been created successfully`, '', 3000)
                console.log(response.data);
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
        }
        else
            NotificationManager.warning('Please fill in all the field!', '', 3000)

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
            <div className="card bg-light mb-3">
                <div className='card-body'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"><b> Title: </b></label>
                            <textarea name='title' type='text' onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"><b> Category: </b></label>
                            <textarea name='category' type='text' onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"><b> Description: </b></label>
                            <textarea name='description' type='text' onChange={this.handleChange} rows='4' className="form-control" id="exampleFormControlTextarea1"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"><b> Cover Image: </b></label>
                            <textarea name='cover_image' type='text' onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"><b> Goal: </b></label>
                            <textarea type='number' name='goal' min='1' onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1"></textarea>
                        </div>
                        <div className="d-flex justify-content-center">
                            <MdSave style={{ color: 'black', fontSize: "30px" }} onClick={this.createProject}></MdSave>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    // Showing all the projects to consumer
    showProjects() {
        return (
            <div>
                <div className="d-flex justify-content-center">
                    <IoJet style={{color: 'gray', fontSize: "35px", marginRight: "20px", marginLeft: "20px", border: '1px solid gray', borderRadius: '50%', marginBottom: "5px"}} onClick={this.doEdit}></IoJet>
                </div>
                <div className='projectList'>
                    <ProjectList projects={this.state.projects}>
                    </ProjectList>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <ProducerHeader></ProducerHeader>
                <img src={JSON.parse(sessionStorage.getItem('userDetails')).imageUrl} style={{ height: '40px', width: '40px', float: 'right', borderRadius: '50%', padding: '3px 3px 3px 3px' }}></img>
                <div style={{ textAlign: 'left', justifyContent: 'center', marginTop: '10px'}}>
                    <h6 style={{fontFamily: "ABeeZee, sans-serif"}}>Hello, {JSON.parse(sessionStorage.getItem('userPilotsDetails')).full_name}</h6>
                </div><p></p>
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