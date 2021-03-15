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
function KostenminimalerWohnstandort() {

    const refApiTextExample = useRef(null)
    const [state, setState] = useState("");
    const apiExample = '{"P_z": 10, "P_d1": 6  , "d_1" : 7 , "Q":50, "V": 80, "K":0.35}';
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

        var json_data = JSON.parse(data["data"])

        axiosInstance({
            method: 'post',
            url: 'volkswirtschafliche_standortmodelle/kostenminimaler_wohnstandorte',
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
                    <h2 className="mb-0">Kostenminimaler Wohnstandort</h2>
                    <p></p>
                </div>
            </div>
            <div className="row ">

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
                                        <td>d</td>
                                        <td>km</td>
                                        <td>Entfernung des Standortes</td>
                                    </tr>
                                    <tr>
                                        <td>C(d)</td>
                                        <td>€</td>
                                        <td>die gesamten Standortkosten</td>
                                    </tr>
                                    <tr>
                                        <td>Q</td>
                                        <td>m^2</td>
                                        <td>Größe der Wohnfläche</td>
                                    </tr>
                                    <tr>
                                        <td>V</td>
                                        <td></td>
                                        <td>Anzahl der Fahrten ins Zentrum</td>
                                    </tr>
                                    <tr>
                                        <td>K</td>
                                        <td>€/km</td>
                                        <td>Fahrtkosten/km sind proportional zur Entfernung</td>
                                    </tr>
                                    <tr>
                                        <td>P_z</td>
                                        <td>€/m^2</td>
                                        <td>der Mietpreis direkt im Zentrum</td>
                                    </tr>
                                    <tr>
                                        <td>P_d1</td>
                                        <td>€/m^2</td>
                                        <td>der Mietpreis in Entfernung d_1</td>
                                    </tr>
                                    <tr>
                                        <td>d_1</td>
                                        <td>km</td>
                                        <td>der Mietpreis in Entfernung d_1</td>
                                    </tr>
                                    <tr>
                                        <td>r</td>
                                        <td></td>
                                        <td>Verfallskonstante für die Entfernung ist</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Berechnung des optimalen Standorts</small></p>
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

export default withRouter(KostenminimalerWohnstandort);