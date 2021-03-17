import React, { Component, useRef, useState } from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form"
import stringifyObject from "stringify-object";
import { axiosInstance } from "../../actions/ajax";
import ReactJson from 'react-json-view'

import ImageMedianproblemeNetzwerke1 from "../../assets/image/MedianproblemeNetzwerke1.PNG";
import ImageMedianproblemeNetzwerke2 from "../../assets/image/MedianproblemeNetzwerke2.PNG";
import ImageMedianproblemeNetzwerke3 from "../../assets/image/MedianproblemeNetzwerke3.PNG";
import ImageMedianproblemeNetzwerke4 from "../../assets/image/MedianproblemeNetzwerke4.PNG";
import ImageMedianproblemeNetzwerke5 from "../../assets/image/MedianproblemeNetzwerke5.PNG";


/**
 * /home
 */
function MedianproblemeKnotenbeschraenkte() {

    const refApiTextExample = useRef(null)
    const [state, setState] = useState("");
    const apiExample = '{"kosten":[3,1,6,5,4],"distanzmatrix":[[0,7,8,16,13],[7,0,4,12,9],[8,4,0,8,5],[16,12,8,0,5],[13,9,5,5,0]]}';
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
            url: 'standortplanung_netzwerken/medianprobleme_kontenbeschraenkt',
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
                    <h2 className="mb-0">1 Medianprobleme</h2>
                    <p>Absolutes & knotenbeschränktes Problem</p>
                </div>
            </div>
            <div className="row ">

                <div className="col-md-6 overflow-auto vh-100">
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Knotenbeschränktes 1-Medianproblem</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={ImageMedianproblemeNetzwerke1}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={ImageMedianproblemeNetzwerke3}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                        </div>
                    </div>
                    <div className="mt-3 mb-3">
                        <div>
                            <h3 className="mb-0">Absolutes 1-Medianproblem</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={ImageMedianproblemeNetzwerke2}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={ImageMedianproblemeNetzwerke4}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                             <img
                                src={ImageMedianproblemeNetzwerke5}
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
                                        <td>1D-List von den Kosten</td>
                                    </tr>  
                                    <tr>
                                        <td>distanzmatrix</td>
                                        <td></td>
                                        <td>2D Matrix</td>
                                    </tr>                                    
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Medianprobleme knotenbeschränkt</small></p>
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
                    <div className="mt-3 mb-5">
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

export default withRouter(MedianproblemeKnotenbeschraenkte);