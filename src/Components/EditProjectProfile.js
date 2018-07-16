import React, { Component } from 'react';
import axios from 'axios'
import { BeatLoader } from 'react-spinners';
import MdEdit from 'react-icons/lib/md/edit';
import MdSave from 'react-icons/lib/md/save';
import IoTrash from 'react-icons/lib/io/trash-a';
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
        this.fetchProject = this.fetchProject.bind(this);
    }

    //fetch data from DB
    fetchProject(){
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

    componentWillMount() {
        this.fetchProject()
    }

    //save data onto DB
    save(e) {
        e.preventDefault();
        axios.put('https://pilotsapp.herokuapp.com/project/updateProject/' + this.state.project._id, {
            ...this.state.project
        }).then(response => {
            console.log(response.data);
            NotificationManager.success(`'${this.state.project.title}' has been updated successfully`, '', 3000)
        })
        .catch(error => {
            console.log(error);
            NotificationManager.error('An error has occured', 'Error', 3000)
        });
        
        this.setState({
            edit: false,
            loading: true
        });
    }

    //enable editing mode
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

    //delete a project
    delete(e){
        e.preventDefault()
        axios.delete('https://pilotsapp.herokuapp.com/project/deleteProject/' + this.state.project._id)
        .then(response => {
            console.log(response);
            NotificationManager.warning(`'${this.state.project.title}' has been deleted successfully`, '', 3000);
        })
        .catch(error => {
            console.log(error);
        });

        this.props.history.push('/ProducerHome')
    }


    //render for editing
    renderFORM() {
        return (
            <div className="card bg-light mb-3">
                <div className='card-body'>
                    <form>
                        <div className="form-group">
                            <label htmlhtmlFor="exampleFormControlTextarea1"><b> Title: </b></label>
                            <textarea name='title' type='text' value={this.state.project.title} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"><b> Category: </b></label>
                            <textarea name='category' type='text' value={this.state.project.category} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"><b> Description: </b></label>
                            <textarea name='description' type='text' value={this.state.project.description} onChange={this.handleChange} rows='4' className="form-control" id="exampleFormControlTextarea1"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"><b> Cover Image: </b></label>
                            <textarea name='cover_image' type='text' value={this.state.project.cover_image} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1"></textarea>
                        </div>
                        <div className="d-flex justify-content-center">
                            <MdSave style={{ color: 'blue', fontSize: "30px" }} onClick={this.save}></MdSave>
                            <IoTrash style={{ color: 'red', fontSize: "30px" }} onClick={this.delete}></IoTrash>
                        </div>

                    </form>
                </div>
            </div>
        )
    }


    //render for viewing
    showDetails() {
        return (
            <div>
                <div className='card bg-light mb-3' key={this.state.project._id} index={this.state.project._id} >
                    <div className='card-header'>{this.state.project.title}</div>
                    <div className='card-body' style={{ textAlign: 'left' }}>
                        <MdEdit style={{color: 'gray', fontSize: "30px", float: "right"}} onClick={this.doEdit}></MdEdit>
                        <p><b> Category: </b> {this.state.project.category}</p>
                        <p><b> Positive Voters: </b> <span style={{color: "green"}}>{this.state.project.positive_voters.length}</span></p>
                        <p><b> Negative Voters: </b> <span style={{color: "red"}}>{this.state.project.negative_voters.length}</span></p>
                        <p><b> Subscribers: </b><span style={{color: "orange"}}> {this.state.project.subscribers.length} </span></p>
                        <p><b> Description: </b>{this.state.project.description}</p>
                        <p><b> Status: </b><meter value={this.state.project.goal_status} min="0" max={this.state.project.goal}></meter> {isNaN((this.state.project.goal_status / this.state.project.goal) * 100) ? '0' : ((this.state.project.goal_status / this.state.project.goal) * 100)}%</p>
                        <p style={{color: "blue"}}><b> Opening Date: </b>{this.state.project.open_timestamp}</p>
                        <p style={{color: "red"}}><b> Deadline: </b>{this.state.project.deadline}</p>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        )

    }

    //main render
    render() {
        return (
            <div>
                <ProducerHeader></ProducerHeader>
                <img src={JSON.parse(sessionStorage.getItem('userDetails')).imageUrl} style={{ height: '40px', width: '40px', float: 'right', borderRadius: '50%', padding: '3px 3px 3px 3px' }}></img>
                <div style={{ textAlign: 'left', justifyContent: 'center', marginTop: '10px' }}>
                    <h6 style={{ fontFamily: "ABeeZee, sans-serif" }}>Hello, {JSON.parse(sessionStorage.getItem('userPilotsDetails')).full_name}</h6>
                </div><p></p>
                <NotificationContainer />
                {/*here we check if the data has been loaded*/}
                {this.state.loading ?
                    (
                        <div className="producerProfile">
                            
                            <div className="d-flex justify-content-center" style={{ textAlign: 'left', justifyContent: 'center', marginTop: '10px' }}>
                                <img src={this.state.project.cover_image} style={{ width: '320px', height: '400px' }}></img>
                            </div>
                            {(this.state.edit ? this.renderFORM() : this.showDetails())}
                        </div>) : (<div className='sweet-loading'> <BeatLoader color={'#123abc'} /> </div>)}
            </div>
        )
    }
}

export default EditProjectProfile;

//style = {{ textAlign: 'center' }}