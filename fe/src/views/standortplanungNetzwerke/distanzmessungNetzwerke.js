import React, { Component, useRef, useState } from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form"
import stringifyObject from "stringify-object";
import { axiosInstance } from "../../actions/ajax";
import ReactJson from 'react-json-view'

import ImageDistanzmessungNetzwerk1 from "../../assets/image/DistanzmessungNetzwerk1.PNG";
import ImageDistanzmessungNetzwerk2 from "../../assets/image/DistanzmessungNetzwerk2.PNG";
import ImageDistanzmessungNetzwerk3 from "../../assets/image/DistanzmessungNetzwerk3.PNG";
import ImageDistanzmessungBeispiel from "../../assets/image/DistanzmessungBeispiel.PNG";


/**
 * /home
 */
function DistanzmessungNetzwerke() {

    const refApiTextExample = useRef(null)
    const [state, setState] = useState("");
    const apiExample = '{"0":"Fr","1":"Mu","d_01":200,"distanzen":[   \
        {"name":"Mz","0":350 ,"1":430}, {"name":"St","0":370 ,"1":120},   {"name":"Ka","0":160 ,"1":300}                \
    ]}';
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
            url: '/standortplanung_netzwerken/distanzmeesung_netzwerke',
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
                    <h2 className="mb-0">Distanzmessung Netzwerke</h2>
                    <p>Bestimmung Bottleneckpunkte, Analytische Betrachtung der Distanzfunktion</p>
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
                                src={ImageDistanzmessungNetzwerk1}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={ImageDistanzmessungNetzwerk2}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={ImageDistanzmessungNetzwerk3}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Example</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={ImageDistanzmessungBeispiel}
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
                                        <td>0</td>
                                        <td>str</td>
                                        <td>Name linker Startpunkt</td>
                                    </tr>   
                                    <tr>
                                        <td>1</td>
                                        <td>str</td>
                                        <td>Name rechter Zielpunkt</td>
                                    </tr>   
                                    <tr>
                                        <td>d_01</td>
                                        <td>float</td>
                                        <td>Distanz zwischen 0 und 1 (muss unten nicht angegeben werden)</td>
                                    </tr>    
                                    <tr>
                                        <td>distanzen</td>
                                        <td>{}</td>
                                        <td>"name":,"0":Distanz zum Start ,"1":Distanz zum Ziel</td>
                                    </tr>                                    
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Distanzberechnung für 1 Verbindung</small></p>
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

export default withRouter(DistanzmessungNetzwerke);