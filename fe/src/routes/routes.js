import React, { Component } from "react";
import { BrowserRouter, Router, Switch, Route, Redirect,useParams } from "react-router-dom";


import Home from "../views/home";
import Template from "../views/template";
import NoMatch from "../views/no_match";

import Bodennutzung from "../views/volkswirtschafteStandortmodelle/bodennutzung";
import KostenminimalerWohnstandort from "../views/volkswirtschafteStandortmodelle/kostenminimalerWohnstandorte";
import ModellHuff from "../views/volkswirtschafteStandortmodelle/modellHuff";
import LeaderFollowerModelle from "../views/volkswirtschafteStandortmodelle/leaderFollowerModelle";

import Distanzmessung from "../views/standortplanungEbene/distanzmessung";
import MedianproblemeL1 from "../views/standortplanungEbene/1medinaproblemeEbeneL1";
import MedianproblemeL2 from "../views/standortplanungEbene/1medinaproblemeEbeneL2";
import MedianproblemeL22 from "../views/standortplanungEbene/1medinaproblemeEbeneL22";
import CenterproblemeEbeneL1 from "../views/standortplanungEbene/1centerproblemeEbeneL1";
import CenterproblemeEbeneGewichtet from "../views/standortplanungEbene/1centerproblemeEbeneGewichtet";
import CenterproblemeL2 from "../views/standortplanungEbene/1centerproblemeEbeneL2";

import MedianproblemeKnotenbeschraenkt from "../views/standortplanungNetzwerke/1MedianproblemeKnotenbeschraenkt";
import MedianproblemeAbsolut from "../views/standortplanungNetzwerke/1MedianproblemeAbsolut";
import AnalytischeBetrachtungDistanzfunktion from "../views/standortplanungNetzwerke/analytischeBetrachtungDistanzfunktion";
import CenterproblemeKnotenbeschraenkt from "../views/standortplanungNetzwerke/1CenterproblemeKnoteneschraenkt";
import DistanzmessungNetzwerk from "../views/standortplanungNetzwerke/distanzmessungNetzwerke";

import Kompaktheitsmasse from "../views/gebietsplanung/kompaktheitsmaße";
import RecursivePartioningAlgorithmus from "../views/gebietsplanung/recursivePartioningAlgorithmus";


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
                <Route path="/leader_follower_modelle" exact component={LeaderFollowerModelle} />

                <Route path="/distanzmessung" exact component={Distanzmessung} />  
                <Route path="/1medianprobleme_ebene_l1" exact component={MedianproblemeL1} />  
                <Route path="/1medianprobleme_ebene_l22" exact component={MedianproblemeL22} />
                <Route path="/1medianprobleme_ebene_l2" exact component={MedianproblemeL2} />
                <Route path="/1centerprobleme_ebene_l1" exact component={CenterproblemeEbeneL1} />  
                <Route path="/1centerprobleme_ebene_gewichtet" exact component={CenterproblemeEbeneGewichtet} />
                <Route path="/1centerprobleme_ebene_l2" exact component={CenterproblemeL2} />

                <Route path="/distanzmessung_netzwerk" exact component={DistanzmessungNetzwerk} />
                <Route path="/analytische_betrachtung_distanzfunktion" exact component={AnalytischeBetrachtungDistanzfunktion} />
                <Route path="/1medianprobleme_knotenbeschraenkt" exact component={MedianproblemeKnotenbeschraenkt} />  
                <Route path="/1medianprobleme_absolut" exact component={MedianproblemeAbsolut} />
                <Route path="/1centerprobleme_knotenbeschraenkt" exact component={CenterproblemeKnotenbeschraenkt} />

                <Route path="/kompaktheitsmasse" exact component={Kompaktheitsmasse} />
                <Route path="/recursive_partioning_algorithmus" exact component={RecursivePartioningAlgorithmus} />

                 <Route path="/template" exact className=" " component={Template} />              
                <Route component={NoMatch} />
               
            </Switch>
            </BrowserRouter>
           
    </div>
    


    );

}
export default RoutesApp;