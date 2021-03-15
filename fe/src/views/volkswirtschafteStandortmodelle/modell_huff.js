import React, { Component, useRef, useState } from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form"
import stringifyObject from "stringify-object";
import { axiosInstance } from "../../actions/ajax";
import ReactJson from 'react-json-view'
import modell_von_huff from "../../assets/image/ModellvonHuff.PNG";
/**
 * /home
 */
function Template() {

    const refApiTextExample = useRef(null)
    const [state, setState] = useState("");
    const apiExample = '{"r": 2, "einrichtungen" : [{"name":"E_A","d_KE":0.7,"w_E":30},   \
                                                    {"name":"E_B","d_KE":2,"w_E":250},  \
                                                    {"name":"E_C","d_KE":6,"w_E":1000}]  }';

    const { register, handleSubmit, watch, errors } = useForm();

    function coopyToClipboard() {
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
            url: 'volkswirtschafliche_standortmodelle/modell_huff',
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
                    <h2 className="mb-0">Modell von Huff</h2>
                    <p>Gravitationsmodell</p>
                </div>
            </div>
            <div className="row ">

                <div className="col-md-6 overflow-auto vh-100">
                   
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Excercise</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={modell_von_huff}
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
                                        <td>A(E,K)</td>
                                        <td></td>
                                        <td>die Anziehungskraft der Einrichtung E auf den Kunden K ist</td>
                                    </tr>   
                                    <tr>
                                        <td>w_E</td>
                                        <td>m^2</td>
                                        <td>die Groe der Einrichtung E an diesem Standort</td>
                                    </tr>   
                                    <tr>
                                        <td>d_KE</td>
                                        <td>km</td>
                                        <td>die Entfernung vom Kunden K zum Standort der Einrichtung E</td>
                                    </tr>  
                                    <tr>
                                        <td>r</td>
                                        <td></td>
                                        <td>eine Potenz (Verfallskonstante) fur die Entfernung</td>
                                    </tr>    
                                    <tr>
                                        <td>D_K</td>
                                        <td></td>
                                        <td>Budget des Kunden</td>
                                    </tr>                               
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">

                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Berechne Attraktivitat der Einrichtungen für 1 Kunde</small></p>
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
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <textarea name="data" placeholder="API input" rows={5} defaultValue={apiExample} className="mb-0 w-100" ref={register({ required: true })}></textarea>
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

export default withRouter(Template);