import React, { Component } from 'react';
import axios from 'axios'
import { BeatLoader } from 'react-spinners';
import ConsumerHeader from './ConsumerHeader'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class EditProjectProfile extends Component {
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

    subscribe(){
        console.log(JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id)
        console.log(sessionStorage.getItem('projectID'))
        axios.put('https://pilotsapp.herokuapp.com/consumer/subscribe/' + JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id, {
            projId: sessionStorage.getItem('projectID')
        }).then(response => {
            console.log(response);

            this.setState({
                loading: false
            })
        })
        .catch(error => {
            console.log(error);
        });
        NotificationManager.info('Youre now subscribed to ' + this.state.project.title + 'project.', 'Notice', 3000);
        this.fetchProject();
    }

    unSubscribe(){
        console.log(JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id)
        console.log(sessionStorage.getItem('projectID'))

        axios.put('https://pilotsapp.herokuapp.com/consumer/unsubscribe/' + JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id, {
            projId: sessionStorage.getItem('projectID')            
          })
          .then(response => {
            console.log(response);
            this.setState({
                loading: false,
            })
          })
          .catch(error => {
            console.log(error);
          });


        NotificationManager.warning('Youre now Unsubscribed to ' + this.state.project.title + 'project.', 'Notice', 3000);
        this.fetchProject();
    }

    positiveVote(){
        axios.put('https://pilotsapp.herokuapp.com/consumer/voteProject/' + JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id + '/+1', {
            projId: sessionStorage.getItem('projectID')
        }).then(response => {
            console.log(response);

            this.setState({
                loading: false
            })
        })
        .catch(error => {
            console.log(error);
        });
        NotificationManager.success('You voted for ' + this.state.project.title + 'project.', 'Notice', 3000);
        this.fetchProject();
    }

    negativeVote(){
        axios.put('https://pilotsapp.herokuapp.com/consumer/voteProject/' + JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id + '/0', {
            projId: sessionStorage.getItem('projectID')
        }).then(response => {
            console.log(response);

            this.setState({
                loading: false
            })
        })
        .catch(error => {
            console.log(error);
        });
        NotificationManager.error('You voted against ' + this.state.project.title + 'project.', 'Notice', 3000);
        this.fetchProject();
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

                    <button onClick={this.positiveVote}>Vote Positive</button>
                    <button onClick={this.negativeVote}>Vote Negative</button>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.state.loading ?
                (<div className="producerProfile">
                    <ConsumerHeader></ConsumerHeader>
                    <article className='profilePicture'>
                        <img src={JSON.parse(sessionStorage.getItem('userDetails')).imageUrl}></img>
                    </article>
                    <NotificationContainer />
                    <h1>{this.state.project.title}</h1>
                    <img src={this.state.project.cover_image} style={{ width: '170px', height: '170px' }}></img> 
                    {this.showDetails()}
                </div>) : 
                (<div className='sweet-loading'> <BeatLoader color={'#123abc'}/> </div>)
        )
    }
}

export default EditProjectProfile;


