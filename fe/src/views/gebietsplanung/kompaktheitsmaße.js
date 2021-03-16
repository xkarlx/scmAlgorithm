import React, { Component, useRef, useState } from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form"
import stringifyObject from "stringify-object";
import { axiosInstance } from "../../actions/ajax";
import ReactJson from 'react-json-view'

import imageKompaktheitsmasse1 from "../../assets/image/Kompaktheitsmasse1.PNG"
import imageKompaktheitsmasse2 from "../../assets/image/Kompaktheitsmasse2.PNG"
import imageKompaktheitsmasse3 from "../../assets/image/Kompaktheitsmasse3.PNG"
import imageKompaktheitsmasse4 from "../../assets/image/Kompaktheitsmasse4.PNG"
/**
 * /home
 */
function Kompaktheitsmasse() {

    const refApiTextExample = useRef(null)
    const refApiTextExample2 = useRef(null)
    const [state, setState] = useState("");
    const apiExample = '{"r_uK":2,"A_Dj":4.45}';
    const apiExample2 = '{"U_Dj":8, "A_Dj":3}';
    const { register, handleSubmit, watch, errors } = useForm();

    function copyToClipboard(refApiText) {
        console.log(refApiText["current"].innerText, refApiText)
        const el = document.createElement('textarea');
        el.value = refApiText["current"].innerText;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

    }



    function onSubmit(data) {
        
        var json_data=JSON.parse(data["data"])
        axiosInstance({
            method: 'post',
            url: '/gebietsplanung/kompaktheitsmasse',
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
                    <h2 className="mb-0">Kompaktheitsmaße</h2>
                    <p>Roeck Test & Schwartzberg Test</p>
                </div>
            </div>
            <div className="row ">

                <div className="col-md-6 overflow-auto vh-100">
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Lecture - Reock Test</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={imageKompaktheitsmasse1}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={imageKompaktheitsmasse2}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Lecture - Schwartzberg Test</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center mb-3">
                            <img
                                src={imageKompaktheitsmasse3}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />
                            <img
                                src={imageKompaktheitsmasse4}
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
                                        <td>r_uK</td>
                                        <td></td>
                                        <td>äußere Umkreis: (Reock)</td>
                                    </tr>   
                                    <tr>
                                        <td>A_Dj</td>
                                        <td></td>
                                        <td>äußere Umkreis: (Reock)</td>
                                    </tr>    
                                    <tr>
                                        <td>U_Dj</td>
                                        <td></td>
                                        <td>Umfang: (Schwartzberg)</td>
                                    </tr>   
                                    <tr>
                                        <td>A_Dj</td>
                                        <td></td>
                                        <td>Fläche: (Schwartzberg)</td>
                                    </tr>                                    
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Roeck-Test</small></p>
                                    </div>
                                    <div className="d-flex">
                                        <p ref={refApiTextExample} className="mb-0 pb-0 mr-auto">{apiExample}</p>
                                        <Button className="btn-priamary btn-sm" onClick={() => { copyToClipboard(refApiTextExample) }}>Copy</Button>
                                    </div>
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Schwartzberg-Test</small></p>
                                    </div>
                                    <div className="d-flex">
                                        <p ref={refApiTextExample2} className="mb-0 pb-0 mr-auto">{apiExample2}</p>
                                        <Button className="btn-priamary btn-sm" onClick={() => { copyToClipboard(refApiTextExample2) }}>Copy</Button>
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

export default withRouter(Kompaktheitsmasse);