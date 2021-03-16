import React from "react";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Home from "./Home";
import Room from "./Room";
import { BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route path={'/join'} component={JoinRoom}/>
                <Route path={'/create'} component={CreateRoom}/>
                <Route path={'/room/:roomCode'} component={Room}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;