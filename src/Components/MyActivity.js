import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners'; // npm install react-spinners --save
import ConsumerHeader from './ConsumerHeader'
import ProjectList from './ProjectList'
import data from '../data/data.json'

class ConsumerHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false, 
            filtered: false,
            projects: null,
            updatedDetails: [
                {
                    subscribedProjects: []
                },
                {
                    positiveProjects: []
                },
                {
                    negativeProjects: []
                }
            ]
        }
        this.showActivities = this.showActivities.bind(this);
        this.filterActivities = this.filterActivities.bind(this);
    }

    // Fetch the updated projects and store in state
    componentWillMount(){
        axios.get('https://pilotsapp.herokuapp.com/consumer/getProfile/' + JSON.parse(sessionStorage.getItem("userPilotsDetails"))._id)
          .then(response => {
            console.log(response);
            this.setState({
                updatedDetails: response.data,
            });
          })
          .catch(error => {
            console.log(error);
          });

          axios.get('https://pilotsapp.herokuapp.com/project')
          .then(response =>{
              console.log(response.data);
              this.setState({
                  projects: response.data,
                  loading: true
              });
          })
          .catch(error => {
              console.log(error);
          });

    }

    // Filtering by the projects by activities
    filterActivities(){
        let filtered = [
            { subscribedProjects: [] },
            { positiveProjects: [] },
            { negativeProjects: [] }
        ];

        this.state.updatedDetails.subscriptions.map((usersub) => {
            this.state.projects.map((proj) =>{
                usersub === proj._id ? filtered[0].subscribedProjects.push(proj) : null;
            })
        })

        this.state.updatedDetails.positive_votes.map((posvote) => {
            this.state.projects.map((proj) =>{
                posvote === proj._id ? filtered[1].positiveProjects.push(proj) : null;
            })
        })

        this.state.updatedDetails.negative_votes.map((negvote) => {
            this.state.projects.map((proj) =>{
                negvote === proj._id ? filtered[2].negativeProjects.push(proj) : null;
            })
        })

        this.setState({
            updatedDetails: filtered,
            filtered: true
        })

    }

    // Showing the filtered activities
    showActivities(){
        return(
            <div>
                <h5 style={{fontFamily: "ABeeZee, sans-serif", textAlign: 'center', color: "orange"}}>Subscriptions</h5>                
                <ProjectList projects={this.state.updatedDetails[0].subscribedProjects}>
                </ProjectList>

                <h5 style={{fontFamily: "ABeeZee, sans-serif", textAlign: 'center', color: "green"}}>Promoted projects</h5>                
                <ProjectList projects={this.state.updatedDetails[1].positiveProjects}>
                </ProjectList>

                <h5 style={{fontFamily: "ABeeZee, sans-serif", textAlign: 'center', color: "red"}}>Demoted projects</h5>                
                <ProjectList projects={this.state.updatedDetails[2].negativeProjects}>
                </ProjectList>
            </div>
        )
    }

    render() {
        return(
        <div>
        <ConsumerHeader></ConsumerHeader>
                <img src={JSON.parse(sessionStorage.getItem('userDetails')).imageUrl} style={{ height: '40px', width: '40px', float: 'right', borderRadius: '50%', padding: '3px 3px 3px 3px' }}></img>
                <div style={{ textAlign: 'left', justifyContent: 'center', marginTop: '10px'}}>
                    <h6 style={{fontFamily: "ABeeZee, sans-serif"}}>Hello, {JSON.parse(sessionStorage.getItem('userPilotsDetails')).full_name}</h6>
                </div>
            {this.state.loading ? (this.state.filtered ? this.showActivities(): this.filterActivities() ) :
            <div className='sweet-loading'>
            <BeatLoader color={'#123abc'} />
            </div>}
        </div>
        )
    }
}

export default ConsumerHome; 