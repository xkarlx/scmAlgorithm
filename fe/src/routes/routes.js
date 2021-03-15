import React, { Component } from "react";
import { BrowserRouter, Router, Switch, Route, Redirect,useParams } from "react-router-dom";


import Home from "../views/home";
import Template from "../views/template";
import NoMatch from "../views/no_match";

import Bodennutzung from "../views/volkswirtschafteStandortmodelle/bodennutzung";
import KostenminimalerWohnstandort from "../views/volkswirtschafteStandortmodelle/kostenminimaler_wohnstandorte";
import ModellHuff from "../views/volkswirtschafteStandortmodelle/modell_huff";

import NavbarApp from '../components/navbar/navbar';


/**
 * routing
 */
function RoutesApp() {
    
    return (
        
        <div className="d-flex flex-column ">
            <BrowserRouter>
            <NavbarApp></NavbarApp>
       
               
            <Switch >
              
                <Route path="/" exact component={Home} />  

                <Route path="/bodennutzung" exact component={Bodennutzung} />  
                <Route path="/kostenminimaler_wohnstandorte" exact component={KostenminimalerWohnstandort} />  
                <Route path="/modell_huff" exact component={ModellHuff} />  


                 <Route path="/template" exact className=" " component={Template} />              
                <Route component={NoMatch} />
               
            </Switch>
            </BrowserRouter>
           
    </div>
    


    );

}
export default RoutesApp;