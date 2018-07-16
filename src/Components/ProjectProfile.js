import React, { Component } from 'react';
import axios from 'axios'
import { BeatLoader } from 'react-spinners';
import ConsumerHeader from './ConsumerHeader'
import IoCheckmarkCircled from 'react-icons/lib/io/checkmark-circled';
import IoCloseCircled from 'react-icons/lib/io/close-circled';
import IoFiling from 'react-icons/lib/io/filing';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


class ProjectProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            project: null,
            loading: false,
            edit: false,
            voted: false
        }

        this.showDetails = this.showDetails.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unSubscribe = this.unSubscribe.bind(this);
        this.positiveVote = this.positiveVote.bind(this);
        this.negativeVote = this.negativeVote.bind(this);
        this.fetchProject = this.fetchProject.bind(this);
    }

    componentWillMount() {
        this.fetchProject();
    }
    

    // Fetching the consumer's project to keep him updated
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

    // delete(e){
    //     e.preventDefault()
    //     axios.delete('https://pilotsapp.herokuapp.com/project/deleteProject/' + this.state.project._id)
    //     .then(response => {
    //         console.log(response);
    //         NotificationManager.warning(`'${this.state.project.title}' has been deleted successfully`, '', 3000);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

    //     this.props.history.push('/ProducerHome')
    // }
    // Handle subscribe event
    subscribe(){
        axios.put('https://pilotsapp.herokuapp.com/consumer/subscribe/' + JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id, {
            projId: sessionStorage.getItem('projectID')
        }).then(response => {
            this.fetchProject();
            console.log(response);
            NotificationManager.info('Youre now subscribed to ' + this.state.project.title + ' project.', 'Notice', 3000);
        })
        .catch(error => {
            console.log(error);
        }).then(() => {window.location.reload();})

        this.setState({
            loading: false
        })

    }

    // Handle unSubscribe event
    unSubscribe(){
        axios.put('https://pilotsapp.herokuapp.com/consumer/unsubscribe/' + JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id, {
            projId: sessionStorage.getItem('projectID')            
        })
        .then(response => {
            this.fetchProject();
            console.log(response);
            NotificationManager.warning('Youre now Unsubscribed to ' + this.state.project.title + ' project.', 'Notice', 3000);
        })
        .catch(error => {
            console.log(error);
        }).then(() => {window.location.reload();})

        this.setState({
            loading: false
        })
    }

    // Handle positive vote event
    positiveVote(){
        axios.put('https://pilotsapp.herokuapp.com/consumer/voteProject/' + JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id + '/1', {
            projId: sessionStorage.getItem('projectID')
        }).then(response => {
            this.fetchProject();
            console.log(response);
            NotificationManager.success('You voted for ' + this.state.project.title + ' project.', 'Notice', 3000);
        })
        .catch(error => {
            console.log(error);
            //NotificationManager.error('Already voted for ' + this.state.project.title + ' project.', 'Error', 3000);
        }).then(() => {window.location.reload();})

        this.setState({
            loading: false
        })
    }

    // Handle the negative vote event
    negativeVote(){
        axios.put('https://pilotsapp.herokuapp.com/consumer/voteProject/' + JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id + '/0', {
            projId: sessionStorage.getItem('projectID')
        }).then(response => {
            this.fetchProject();
            console.log(response);
            NotificationManager.error('You voted against ' + this.state.project.title + ' project.', 'Notice', 3000);
        })
        .catch(error => {
            console.log(error);
            //NotificationManager.error('Already voted for ' + this.state.project.title + ' project.', 'Error', 3000);
        }).then(() => {window.location.reload();})

        this.setState({
            loading: false
        })
    }

    // Showing the project details
    showDetails() {
        return (
            <div>
            <NotificationContainer />
                <div className='card bg-light mb-3' key={this.state.project._id} index={this.state.project._id} >
                    <div className='card-header' style={{textAlign: 'center', fontSize: '120%'}}> <b> {this.state.project.title} </b></div>
                    <div className='card-body' style={{ textAlign: 'left' }}>
                        <p><b> Category: </b> {this.state.project.category}</p>
                        <p><b> Positive Voters: </b> <span style={{color: "green"}}>{this.state.project.positive_voters.length}</span></p>
                        <p><b> Negative Voters: </b> <span style={{color: "red"}}>{this.state.project.negative_voters.length}</span></p>
                        <p><b> Subscribers: </b><span style={{color: "orange"}}> {this.state.project.subscribers.length} </span></p>
                        <p><b> Description: </b>{this.state.project.description}</p>
                        <p><b> Status: </b><meter value={this.state.project.goal_status} min="0" max={this.state.project.goal}></meter> {isNaN((this.state.project.goal_status / this.state.project.goal) * 100) ? '0' : ((this.state.project.goal_status / this.state.project.goal) * 100)}%</p>
                        <p style={{color: "blue"}}><b> Opening Date: </b>{this.state.project.open_timestamp}</p>
                        <p style={{color: "red"}}><b> Deadline: </b>{this.state.project.deadline}</p>
                        {
                        this.state.project.subscribers.map((sub) => {
                            if (this.state.project.subscribers.length && (JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id == sub)){
                                this.state.voted = true;
                            }
                        })
                        }
                        <div className="d-flex justify-content-center">

                            {this.state.voted ? 
                            <div>
                            <IoCheckmarkCircled style={{color: 'green', fontSize: "35px", marginRight: "20px", marginLeft: "20px"}} onClick={this.positiveVote}></IoCheckmarkCircled>
                            <IoCloseCircled style={{color: 'red', fontSize: "35px", marginRight: "20px", marginLeft: "20px"}} onClick={this.negativeVote}></IoCloseCircled>
                            <IoFiling style={{color: 'orange', fontSize: "40px", marginRight: "20px", marginLeft: "20px"}} onClick={this.unSubscribe}></IoFiling>
                            </div>
                                : 
                                <div>
                            <IoCheckmarkCircled style={{color: 'green', fontSize: "35px", marginRight: "20px", marginLeft: "20px"}} onClick={this.positiveVote}></IoCheckmarkCircled>
                            <IoCloseCircled style={{color: 'red', fontSize: "35px", marginRight: "20px", marginLeft: "20px"}} onClick={this.negativeVote}></IoCloseCircled>
                            <IoFiling style={{color: 'black', fontSize: "40px", marginRight: "20px", marginLeft: "20px"}} onClick={this.subscribe}></IoFiling>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <ConsumerHeader></ConsumerHeader>
                <img src={JSON.parse(sessionStorage.getItem('userDetails')).imageUrl} style={{ height: '40px', width: '40px', float: 'right', borderRadius: '50%', padding: '3px 3px 3px 3px' }}></img>
                <div style={{ textAlign: 'left', justifyContent: 'center', marginTop: '10px' }}>
                </div>
                {this.state.loading ?
                (<div className="producerProfile">
                    <NotificationContainer />
                        <h6  style={{fontFamily: "ABeeZee, sans-serif"}}>Hello, {JSON.parse(sessionStorage.getItem('userPilotsDetails')).full_name}</h6>                
                        <p></p><div className="d-flex justify-content-center" style={{ textAlign: 'center', justifyContent: 'center', margin: "0 auto"}}>
                        <img src={this.state.project.cover_image} style={{ width: '320px', height: '400px' }}></img>
                    </div>
                    {this.showDetails()}
                </div>) : 
                (<div className='sweet-loading'> <BeatLoader color={'#123abc'}/> </div>)}
            </div>
        )
    }
}

export default ProjectProfile;