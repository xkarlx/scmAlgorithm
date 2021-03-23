import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Footer from "../components/footer"

/**
 * /home
 */
function Impressum() {
    
    return (
        <div>
         
        <div className="container-fluid pb-5 pt-5 vh-100 "  >
            <div className="row">
                <div className="col-12">
                    <div className="container">
                        <div className="row d-flex justify-content-center pb-5">
                            <div className="d-flex flex-column justify-content-center mb-4">                                
                                <h2 className="text-dark mt-n3">Impressum</h2>
                                <p className="mb-0">
                                    Lars Kiefer
                                </p>
                                <p className="mb-0">
                                    uufrm@student.kit.edu
                                </p>                             
                                <p className="mb-0">
                                    Klosterweg 28, P213
                                </p>
                                <p className="mb-0">
                                    76131 Karlsruhe
                                </p>

                            </div>
                          
                          
                        </div>
                      
                    </div>
                </div>
            </div>
            
        </div>
        <div className="">
                <Footer></Footer>
            </div>
        </div>

    );
    
}

export default withRouter(Impressum);