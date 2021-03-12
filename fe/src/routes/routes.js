import React, { Component } from "react";
import { BrowserRouter, Router, Switch, Route, Redirect,useParams } from "react-router-dom";


import Home from "../views/home";
import NoMatch from "../views/no_match";
import NavbarApp from '../components/navbar/navbar';


/**
 * routing
 */
function RoutesApp() {
    
    return (
        
        <div className="d-flex flex-column vh-100 overflow-hidden">
            <BrowserRouter>
            <NavbarApp></NavbarApp>
       
               
            <Switch >
              
                <Route path="/" exact component={Home} />               
                <Route component={NoMatch} />
               
            </Switch>
            </BrowserRouter>
           
    </div>
    


    );

}
export default RoutesApp;