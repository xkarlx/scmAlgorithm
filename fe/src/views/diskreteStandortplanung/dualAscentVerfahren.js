import React, { Component, useRef, useState } from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form"
import stringifyObject from "stringify-object";
import { axiosInstance } from "../../actions/ajax";
import ReactJson from 'react-json-view'

import ImageDualAscentVerfahren1 from "../../assets/image/DualAscentVerfahren1.PNG"
import ImageDualAscentVerfahren2 from "../../assets/image/DualAscentVerfahren2.PNG"
import ImageDualAscentVerfahren3 from "../../assets/image/DualAscentVerfahren3.PNG"
/**
 * /home
 */
function DualAscentVerfahren() {

    const refApiTextExample = useRef(null)
    const refApiTextExample2 = useRef(null)
    const [state, setState] = useState("");
    const apiExample = '{"list":[[0,4,6,12,3],[2,6,3,4,0],[4,9,10,12,8],[6,0,12,3,7],[9,12,0,3,8],[12,8,4,0,6]],"kosten":[12,6,9,9,12]}';
    const apiExample2 = '{"list":[[4,9,3],[11,2,7],[5,6,4],[2,4,6],[10,3,6]],"sList":[6,4,7],"vList":[4,7,5,4,6],"iteration":2}';
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
            url: '/diskrete_standortplanung/dual_ascent_verfahren',
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
                    <h2 className="mb-0">Dual Ascent Verfahren</h2>
                    <p>DUALOC-Verfahren</p>
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
                                src={ImageDualAscentVerfahren1}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />                        
                        </div>
                    </div>
                    <div className="mt-3 mb-3">
                        <div>
                            <h3 className="mb-0">Example</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{ height: "2px" }}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img
                                src={ImageDualAscentVerfahren3}
                                alt="new"
                                className="w-100"
                                style={{ maxWidth: "600px" }}
                            />      
                             <img
                                src={ImageDualAscentVerfahren2}
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
                                        <td>1D-Array: Variante 1</td>
                                    </tr> 
                                    <tr>
                                        <td>list</td>
                                        <td></td>
                                        <td>2D-Array</td>
                                    </tr>   
                                    <tr>
                                        <td>sList</td>
                                        <td></td>
                                        <td>1D-Array: Variante 2 nur für 3,4 oder 5 Werte möglich</td>
                                    </tr>    
                                    <tr>
                                        <td>vList</td>
                                        <td></td>
                                        <td>1D-Array: Variante 2</td>
                                    </tr>   
                                    <tr>
                                        <td>iteration</td>
                                        <td></td>
                                        <td>Nummer der zu berechende Iteration (beginnt bei 1)</td>
                                    </tr>                                 
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Starting Dual ascent at first iteration</small></p>
                                    </div>
                                    <div className="d-flex">
                                        <p ref={refApiTextExample} className="mb-0 pb-0 mr-auto">{apiExample}</p>
                                        <Button className="btn-priamary btn-sm" onClick={() => { copyToClipboard(refApiTextExample) }}>Copy</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Berechnung falls nur Iteration x gegeben</small></p>
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

export default withRouter(DualAscentVerfahren);