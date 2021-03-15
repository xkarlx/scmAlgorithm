import React, { Component, useRef, useState } from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form"
import stringifyObject from "stringify-object";
import { axiosInstance } from "../../actions/ajax";
import ReactJson from 'react-json-view'

import strategieFollower from "../../assets/image/Strategie_Follower.PNG"
import strategieLeader from "../../assets/image/Strategie_Leader.PNG"

/**
 * /home
 */
function LeaderFollowerModelle() {

    const refApiTextExample = useRef(null)
    const [state, setState] = useState("");
    const apiExample = '{"s_r":2, "s_l":2,"leader":5, "nachfrage": [6,8,11,8,9,7,5,6,8,10,8,6]}';
    const apiExample2 = '{"s_r":2, "s_l":2, "nachfrage": [6,8,11,8,9,7,5,6,8,10,8,6]}';
    const { register, handleSubmit, watch, errors } = useForm();

    function coopyToClipboard() {
        
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
            url: 'volkswirtschafliche_standortmodelle/leader_follower_modelle',
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
                    <h2 className="mb-0">Leader Follower Modelle</h2>
                    <p>Bei diesen Modellen platzieren zwei Wettbewerber nacheinander neue Einrichtungen in einem (bisher unerschlossenen) Markt</p>
                </div>
            </div>
            <div className="row ">

                <div className="col-md-6 overflow-auto vh-100">
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Lecture</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={strategieFollower}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={strategieLeader}
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
                                        <td>Nachfrage</td>
                                        <td></td>
                                        <td>List</td>
                                    </tr>  
                                    <tr>
                                        <td>s_r</td>
                                        <td></td>
                                        <td>Einzugsgebiet rechts</td>
                                    </tr>   
                                    <tr>
                                        <td>s_r</td>
                                        <td></td>
                                        <td>Einzugsgebiet links</td>
                                    </tr>     
                                    <tr>
                                        <td>leader</td>
                                        <td></td>
                                        <td>Position des Liedaers</td>
                                    </tr>                                    
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Leaderposition schon bekannt</small></p>
                                    </div>
                                    <div className="d-flex">
                                        <p ref={refApiTextExample} className="mb-0 pb-0 mr-auto">{apiExample}</p>
                                        <Button className="btn-priamary btn-sm" onClick={() => { coopyToClipboard() }}>Copy</Button>
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
                                    <h6>Liste beginnt mit dem Zähler 0!</h6>
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

export default withRouter(LeaderFollowerModelle);