import React, { Component } from 'react';
import axios from 'axios';
import ProducerHeader from './ProducerHeader'
import MdEdit from 'react-icons/lib/md/edit';
import MdSave from 'react-icons/lib/md/save';
import { BeatLoader } from 'react-spinners';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class ProducerHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            updatedDetails: [],
            loading: false,
            editing: false
        }
        this.showDetails = this.showDetails.bind(this);
        this.renderFORM = this.renderFORM.bind(this);
        this.save = this.save.bind(this);
        this.doEdit = this.doEdit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    // Fetch the updated projects and store in state
    componentWillMount() {
        axios.get('https://pilotsapp.herokuapp.com/project')
            .then(response => {
                console.log(response);
                this.setState({
                    projects: response.data,
                })
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(' https://pilotsapp.herokuapp.com/producer/getProfile/' + JSON.parse(sessionStorage.getItem('userPilotsDetails'))._id)
            .then(response => {
                console.log(response);
                this.setState({
                    updatedDetails: response.data,
                    loading: true
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    save(e) {
        e.preventDefault();
        axios.put('https://pilotsapp.herokuapp.com/producer/updateProfile/' + JSON.parse(sessionStorage.getItem('userPilotsDetails'))._id, {
            ...this.state.updatedDetails
        }).then(response => {
            console.log(response);
        })
            .catch(error => {
                console.log(error);
            }); 

        NotificationManager.success(`Your profile has been updated successfully`, '', 3000)
        this.setState({
            edit: false,
            loading: true
        });
    }

    doEdit() {
        this.setState({ edit: true })
    }

    handleChange(event) {

        let detailsCopy = JSON.parse(JSON.stringify(this.state.updatedDetails))
        detailsCopy[event.target.name] = event.target.value;
            this.setState({
                updatedDetails: detailsCopy
            }) 
    }



    renderFORM() {
        return (
            <div>
                <h5 style={{ fontFamily: "ABeeZee, sans-serif", textAlign: 'center' }}>Edit profile</h5>
                <div className="card bg-light mb-3">
                    <div className='card-body'>
                        <form>
                            <div className="form-group">
                                <label htmlfor="exampleFormControlTextarea1"><b> User Name: </b></label>
                                <textarea name='user_name' type='text' value={this.state.updatedDetails.user_name} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlfor="exampleFormControlTextarea2"><b> Full Name: </b></label>
                                <textarea name='full_name' type='text' value={this.state.updatedDetails.full_name} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea2"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlfor="exampleFormControlTextarea3"><b> Password: </b></label>
                                <textarea name='password' type='text' value={this.state.updatedDetails.password} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea3"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlfor="exampleFormControlTextarea4"><b> Email: </b></label>
                                <textarea name='email' type='text' value={this.state.updatedDetails.email} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea4"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlfor="exampleFormControlTextarea5"><b> Phone Number: </b></label>
                                <textarea name='phone' type='text' value={this.state.updatedDetails.phone} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea5"></textarea>
                            </div>
                            <div className="d-flex justify-content-center">
                                <MdSave style={{ color: 'black', fontSize: "30px" }} onClick={this.save}></MdSave>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


    showDetails() {
        return (
            <div>
            <h5 style={{fontFamily: "ABeeZee, sans-serif", textAlign: 'center'}}>Profile Details</h5>                
            <div className="card bg-light mb-3">
                <div className='card-body'>
                    <MdEdit style={{color: 'gray', fontSize: "30px", float: "right"}} onClick={this.doEdit}></MdEdit>
                    <p><b> User Name:</b> {this.state.updatedDetails.user_name} </p>
                    <p><b> Full Name: </b>{this.state.updatedDetails.full_name} </p>
                    <p><b> Email: </b>{this.state.updatedDetails.email} </p>
                    <p><b> Password: </b>{this.state.updatedDetails.password} </p>
                    <p><b> Phone Number: </b>{this.state.updatedDetails.phone} </p>
                </div>
            </div>
            </div>

        )
    }

    render() {
        return (
            <div className="producerProfile">
                <ProducerHeader></ProducerHeader>
                <img src={JSON.parse(sessionStorage.getItem('userDetails')).imageUrl} style={{ height: '40px', width: '40px', float: 'right', borderRadius: '50%', padding: '3px 3px 3px 3px' }}></img>
                <div style={{ textAlign: 'left', justifyContent: 'center', marginTop: '10px'}}>
                    <h6 style={{fontFamily: "ABeeZee, sans-serif"}}>Hello, {JSON.parse(sessionStorage.getItem('userPilotsDetails')).full_name}</h6>
                </div><p></p>
                <NotificationContainer />
                {this.state.loading ? (this.state.edit ? this.renderFORM() : this.showDetails()) :
                    <div className='sweet-loading'>
                        <BeatLoader color={'#123abc'} />
                    </div>}
            </div>
        )
    }
}

export default ProducerHome;