import React from "react";
import { Route } from "react-router-dom";
import Login from "../Components/Login";
import ConsumerHome from "../Components/ConsumerHome";
import ProducerHome from "../Components/ProducerHome";
import ConsumerProfile from "../Components/ConsumerProfile";
import ProducerProfile from "../Components/ProducerProfile";
import ProjectProfile from "../Components/ProjectProfile";
import MyActivity from "../Components/MyActivity";
import EditProjectProfile from "../Components/EditProjectProfile";

const ReactRouter = () => {
    return (
        <React.Fragment>
            <Route exact path='/' component={Login}> </Route> {/*login page*/}
            <Route exact path='/ConsumerHome' component={ConsumerHome}> </Route> {/*home page - for consumer*/}
            <Route exact path='/ProducerHome' component={ProducerHome}> </Route> {/*home page - for producer*/}
            <Route exact path='/ConsumerHome/MyActivity' component={MyActivity}> </Route> {/*activity page - for consumer*/}
            <Route exact path='/ConsumerProfile' component={ConsumerProfile}> </Route> {/*personal profile - for consumer*/}
            <Route exact path='/ProducerProfile' component={ProducerProfile}> </Route> {/*personal profile - for producer*/}
            <Route exact path='/ProjectProfile' component={ProjectProfile}> </Route> {/*project profile - for consumer*/}
            <Route exact path='/EditProjectProfile' component={EditProjectProfile}> </Route> {/*project profile - for producer*/}
            {/* <Route exact path='/QueryResult' component={QueryResult}> </Route> projects returned from search query */}
        </React.Fragment>
    );}

export default ReactRouter;


