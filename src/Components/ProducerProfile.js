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

        if (!this.state.updatedDetails.vip) this.vip = "no";
        else this.vip = "yes";
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
            <div className="card">
                <form>
                    <label>
                        User Name:
                        <input name='user_name' type='text' value={this.state.updatedDetails.user_name} onChange={this.handleChange} />
                    </label>
                    <label>
                        Full Name:
                        <input name='full_name' type='text' value={this.state.updatedDetails.full_name} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input name='password' type='text' value={this.state.updatedDetails.password} onChange={this.handleChange} />
                    </label>
                    <label>
                        Email:
                        <input name='email' type='text' value={this.state.updatedDetails.email} onChange={this.handleChange} />
                    </label>
                    <label>
                        Phone Number:
                        <input name='phone' type='text' value={this.state.updatedDetails.phone} onChange={this.handleChange} />
                    </label>
                    <button onClick={this.save}><MdSave></MdSave></button>     
                </form>
            </div>)
    }

    showDetails() {
        return (
            <div className="card">
                <p> User Name: {this.state.updatedDetails.user_name} </p>
                <p> Full Name: {this.state.updatedDetails.full_name} </p>
                <p> Password: {this.state.updatedDetails.password} </p>
                <p> Email: {this.state.updatedDetails.email} </p>
                <p> Phone Number: {this.state.updatedDetails.phone} </p>
                <button onClick={this.doEdit}><MdEdit></MdEdit></button>
            </div>
        )
    }

    render() {
        return (
            <div className="producerProfile">
                <ProducerHeader></ProducerHeader>
                <h1>{this.state.updatedDetails.full_name}</h1>
                <article className='profilePicture'>
                    <img src={JSON.parse(sessionStorage.getItem('userDetails')).imageUrl}></img>
                </article>
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