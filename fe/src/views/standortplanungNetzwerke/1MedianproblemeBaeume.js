import React, { Component, useRef, useState } from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form"
import stringifyObject from "stringify-object";
import { axiosInstance } from "../../actions/ajax";
import ReactJson from 'react-json-view'


import MedianproblemeBaeume1 from "../../assets/image/MedianproblemeBaeume1.PNG";
import MedianproblemeBaeume2 from "../../assets/image/MedianproblemeBaeume2.PNG";
import MedianproblemeBaeume3 from "../../assets/image/MedianproblemeBaeume3.PNG";
import MedianproblemeBaeume4 from "../../assets/image/MedianproblemeBaeume4.PNG";


/**
 * /home
 */
function MedianproblemeBaeume() {

    

    return (
        <div className="container-fluid ">
            <div className="row ">
                <div className="col-12 mt-3">
                    <h2 className="mb-0">1-Medianprobleme auf Bäumen</h2>
                    <p>Einklapp Algorithmus von Goldmann</p>
                </div>
            </div>
            <div className="row ">

                <div className="col-md-6">
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Lecture</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={MedianproblemeBaeume1}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                          
                        </div>
                    </div>
                    
                  
                </div>
                <div className="col-md-6 ">
                <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Algortihmus</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={MedianproblemeBaeume2}
                                alt="new"
                                className="w-100 mb-3"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={MedianproblemeBaeume3}
                                alt="new"
                                className="w-100 mb-3"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={MedianproblemeBaeume4}
                                alt="new"
                                className="w-100 mb-3"
                                style={{ maxWidth: "600px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default withRouter(MedianproblemeBaeume);