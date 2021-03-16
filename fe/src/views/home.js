import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { withRouter,useHistory } from "react-router-dom";

/**
 * /home
 */
function Home() {

    let history = useHistory();
    function pushHistory(push_path){
        
        history.push(push_path);
       
    }
 
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 mt-3">
                    <Card>
                        <Card.Header>
                            Volkswirtschaftliche Standortmodelle: Vorlesung 2
                        </Card.Header>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/kostenminimaler_wohnstandorte")}}>
                                   <h6 className="mr-3"> Kostenminimaler Wohnstandorte </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/bodennutzung")}}>
                                   <h6 className="mr-3"> Boden- & Flächennutzung </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/modell_huff")}}>
                                   <h6 className="mr-3"> Modell von Huff </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/leader_follower_modelle")}}>
                                   <h6 className="mr-3"> Leader Follower Modelle </h6>
                                   <small></small>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    <h3>
                        
                    </h3>
                </div>
                <div className="col-md-6 mt-3">
                    <Card>
                        <Card.Header>
                        Standortplanung in der Ebene: Vorlesung 3
                        </Card.Header>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/distanzmessung")}}>
                                   <h6 className="mr-3"> Distanzmessung </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/1medianprobleme")}}>
                                   <h6 className="mr-3"> 1-Medianprobleme </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/1medianprobleme_ebene_l1")}}>
                                   <h6 className="mr-3"> 1-Medianprobleme mit l_1 Metrik </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/1medianprobleme_ebene_l22")}}>
                                   <h6 className="mr-3"> 1-Medianprobleme mit l_2^2 Entfernung </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/1medianprobleme_ebene_l2")}}>
                                   <h6 className="mr-3"> 1-Medianprobleme mit l_2 Metrik </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/1centerprobleme_ebene_l1")}}>
                                   <h6 className="mr-3"> 1-Centerprobleme mit l_1 Metrik </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/1centerprobleme_ebene_gewichtet")}}>
                                   <h6 className="mr-3"> Gewichtete 1-Centerproblme mit l_1 </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/1centerprobleme_ebene_l2")}}>
                                   <h6 className="mr-3"> 1-Centerprobleme mit l2 Metrik </h6>
                                   <small></small>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                   
                </div>
                <div className="col-md-6 mt-3">
                    <Card>
                        <Card.Header>
                        Standortplanung in Netzwerken: Vorlesung 4
                        </Card.Header>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/distanzmessung_netzwerk")}}>
                                   <h6 className="mr-3"> Distanzmessung Netzwerk </h6>
                                   <small></small>
                                </ListGroup.Item>                    
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/analytische_betrachtung_distanzfunktion")}}>
                                   <h6 className="mr-3"> Analytische Betrachtung Distanzfunktion </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/1medianprobleme_knotenbeschraenkt")}}>
                                   <h6 className="mr-3"> 1-Medianprobleme Knotenbeschränkt </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/1medianprobleme_absolut")}}>
                                   <h6 className="mr-3"> 1-Medianprobleme Absolut </h6>
                                   <small></small>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/1centerprobleme_knotenbeschraenkt")}}>
                                   <h6 className="mr-3"> 1-Centerprobleme Knotenbeschränkt </h6>
                                   <small></small>
                                </ListGroup.Item>                            
                            </ListGroup>
                        </Card.Body>
                    </Card>
                   
                </div>


                <div className="col-md-6 mt-3">
                    <Card>
                        <Card.Header>
                        Gebietsplanung: Vorlesung 6
                        </Card.Header>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/kompaktheitsmasse")}}>
                                   <h6 className="mr-3"> Kompaktheitsmaße </h6>
                                   <small></small>
                                </ListGroup.Item>                    
                                <ListGroup.Item className="d-flex" onClick={()=>{pushHistory("/recursive_partioning_algorithmus")}}>
                                   <h6 className="mr-3"> Recursive-Partioning-Algorithmus </h6>
                                   <small></small>
                                </ListGroup.Item>                                                    
                            </ListGroup>
                        </Card.Body>
                    </Card>
                   
                </div>
                
            </div>
        </div>
       
    );
    
}

export default withRouter(Home);