import React, { Component, useRef, useState } from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form"
import stringifyObject from "stringify-object";
import { axiosInstance } from "../../actions/ajax";
import ReactJson from 'react-json-view'
/**
 * /home
 */
function MedianproblemeEbeneL22() {

    const refApiTextExample = useRef(null)
    const [state, setState] = useState("");
    const apiExample = '[{"x":1,"y":4,"w":2},{"x":2,"y":6,"w":3},{"x":5,"y":1,"w":1},{"x":4,"y":2,"w":1},{"x":6,"y":5,"w":2}]';
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
            url: 'standortplanung_ebene/medianprobleme_ebene_l22',
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
                    <h2 className="mb-0">1-Medianprobleme mit l_2^2-Entfernung</h2>
                    <p></p>
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
                            <h6>Die Zielfunktion lässt sich wieder in zwei, voneinander unabhängige
                                Ausdrücke zerlegen</h6>
                            <p>Beachte 𝑓1(𝑥1) und 𝑓2(𝑥2) sind differenzierbar</p>
                        </div>
                    </div>   
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
                                        <td>x</td>
                                        <td></td>
                                        <td>x-Koordinate</td>
                                    </tr>  
                                    <tr>
                                        <td>y</td>
                                        <td></td>
                                        <td>y-Koordinate</td>
                                    </tr> 
                                    <tr>
                                        <td>w</td>
                                        <td></td>
                                        <td>Gewichtungsfaktor</td>
                                    </tr>                                   
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>2D-Problem</small></p>
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
                </div>
                <div className="col-md-6 ">
                    
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

export default withRouter(MedianproblemeEbeneL22);