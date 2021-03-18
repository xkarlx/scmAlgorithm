import React, { Component, useRef, useState } from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form"
import stringifyObject from "stringify-object";
import { axiosInstance } from "../../actions/ajax";
import ReactJson from 'react-json-view'

import ImageGreedyHeuristik1 from "../../assets/image/GreedyHeuristik1.PNG"
import ImageGreedyHeuristik2 from "../../assets/image/GreedyHeuristik2.PNG"

/**
 * /home
 */
function GreedyHeuristik() {

    const refApiTextExample = useRef(null)
    const [state, setState] = useState("");
    const apiExample = '{"list":[[8,10,19,13],[7,14,24,21],[18,12,5,12],[16,14,7,13],[15,15,8,18]],"kosten":[21,17,20,22]}';
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
            method: 'post',
            url: '/diskrete_standortplanung/greedy_heuristik',
            data: {
                ...json_data
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
                    <h2 className="mb-0">Greedy-Heuristik</h2>
                    <p>Konstruktionsheuristiken</p>
                </div>
            </div>
            <div className="row ">

                <div className="col-md-6 overflow-auto vh-100">
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Formula</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={ImageGreedyHeuristik1}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={ImageGreedyHeuristik2}
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
                            <h3 className="mb-0">API introduction</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>                                        
                                        <th>Abbreviation</th>
                                        <th>Unit</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>kosten</td>
                                        <td></td>
                                        <td>1D-Array</td>
                                    </tr> 
                                    <tr>
                                        <td>list</td>
                                        <td></td>
                                        <td>2D-Array</td>
                                    </tr>                                    
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>test</small></p>
                                    </div>
                                    <div className="d-flex">
                                        <p ref={refApiTextExample} className="mb-0 pb-0 mr-auto">{apiExample}</p>
                                        <Button className="btn-priamary btn-sm" onClick={() => { copyToClipboard() }}>Copy</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">API input</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className="">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <textarea name="data" placeholder="API input" defaultValue={apiExample} className="mb-0 w-100" ref={register({ required: true })}></textarea>
                                        <Button type="submit" className="btn-primary">Submit</Button>
                                    </form>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">API output</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className="">
                                    <ReactJson src={state} />
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );

}

export default withRouter(GreedyHeuristik);