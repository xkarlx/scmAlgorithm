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
                            Volkswirtschaftliche Standortmodelle: Vorlesung 1
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
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    <h3>
                        
                    </h3>
                </div>
                
            </div>
        </div>
       
    );
    
}

export default withRouter(Home);