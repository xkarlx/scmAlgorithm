import React, { Component, useRef, useState } from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form"
import stringifyObject from "stringify-object";
import { axiosInstance } from "../../actions/ajax";
import ReactJson from 'react-json-view'

import CenterproblemeBaeume1 from "../../assets/image/CenterproblemeNetzwerkeBaum1.PNG";
import CenterproblemeBaeume2 from "../../assets/image/CenterproblemeNetzwerkeBaum2.PNG";
import CenterproblemeBaeume3 from "../../assets/image/CenterproblemeNetzwerkeBaum3.PNG";

/**
 * /home
 */
function CenterproblemeBaeume() {

    const refApiTextExample = useRef(null)
    const [state, setState] = useState("");
    const apiExample = "Test";
    const { register, handleSubmit, watch, errors } = useForm();

    function copyToClipboard() {
        console.log(refApiTextExample["current"].innerText, refApiTextExample)
        const el = document.createElement('textarea');
        el.value = refApiTextExample["current"].innerText;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

    }



    function onSubmit(data) {
        
        var json_data=JSON.parse(data["data"])
        axiosInstance({
            method: 'get',
            url: 'test',
            data: {
                type: "hot",
                limit: 10
            }
        })
            .then(res => {
                
                setState(res.data);


            })
            .catch(err => {
                setState("error");
            })

    }

    return (
        <div className="container-fluid ">
            <div className="row ">
                <div className="col-12 mt-3">
                    <h2 className="mb-0">1-Centerprobleme Netzwerke Bäume</h2>
                    <p>nur kurze Erklärung</p>
                </div>
            </div>
            <div className="row ">

                <div className="col-md-6 ">
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Lecture</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={CenterproblemeBaeume1}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={CenterproblemeBaeume2}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                             <img
                                src={CenterproblemeBaeume3}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                        </div>
                    </div>
                   
                </div>
                <div className="col-md-6 ">
                    

                    
                </div>
            </div>

        </div>
    );

}

export default withRouter(CenterproblemeBaeume);