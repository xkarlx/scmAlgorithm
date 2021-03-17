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
function RecursivepartioningAlgorithmus() {

    const refApiTextExample = useRef(null)
    const refApiTextExample2 = useRef(null)
    const refApiTextExample3 = useRef(null)
    const [state, setState] = useState("");
    const apiExample = '{"list":[{"name":1,"x": 2,"y":2 , "w":4},{"name":2,"x": 2,"y":9 , "w":3},{"name":3,"x": 4,"y":8 , "w":3},{"name":4,"x": 3,"y":3 , "w":2},{"name":8,"x": 3,"y":5 , "w":4},{"name":9,"x": 4,"y":4 , "w":2},     \
                                    {"name":10,"x": 5,"y":7 , "w":3}],"betha":0.5}';
    const apiExample2 = '{"x":[2,2,4,3,9,9,7,3,4,5,8,7],  "y":[2,9,8,3,7,2,9,5,4,7,6,4],"w":[4,3,3,2,2,5,5,4,2,3,2,5], "name":[1,2,3,4,5,6,7,8,9,10,11,12]   \
                                   ,"betha":0.5}'; 
    const apiExample3 = '{"x":[2,2,4,3,9,9,7,3,4,5,8,7],  "y":[2,9,8,3,7,2,9,5,4,7,6,4],"w":[4,3,3,2,2,5,5,4,2,3,2,5], "name":[1,2,3,4,5,6,7,8,9,10,11,12]   \
                                   ,"betha":0.5,"L":{"x":5,"y":6.1}}';               
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
            url: 'gebietsplanung/recursive_partioning_algorithmus',
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
                    <h2 className="mb-0">Recursive Partitioning Algorithmus</h2>
                    <p>Teilen der Gebiete in 4 Bereiche & KPI-Berechnung</p>
                </div>
            </div>
            <div className="row ">

                <div className="col-md-6">
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
                                            <td>Gewichte</td>
                                        </tr>   
                                        <tr>
                                            <td>betha</td>
                                            <td></td>
                                            <td>optional (default: 0.5)</td>
                                        </tr>  
                                        <tr>
                                            <td>L</td>
                                            <td></td>
                                            <td> "x"(kleiner gleich),"y"(größer gleich)  optional (Variante 3)</td>
                                        </tr>                             
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className=" mb-0 mt-0 pt-2 pb-2 align-items-center">
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Varainte 1: 2 Bereiche + KPIs</small></p>
                                    </div>
                                    <div className="d-flex">
                                        <p ref={refApiTextExample} className="mb-0 pb-0 mr-auto">{apiExample}</p>
                                        <Button className="btn-priamary btn-sm" onClick={() => { copyToClipboard(refApiTextExample) }}>Copy</Button>
                                    </div>
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Varainte 2: 2 Bereiche + KPIs</small></p>
                                    </div>
                                    <div className="d-flex">
                                        <p ref={refApiTextExample2} className="mb-0 pb-0 mr-auto">{apiExample2}</p>
                                        <Button className="btn-priamary btn-sm" onClick={() => { copyToClipboard(refApiTextExample2) }}>Copy</Button>
                                    </div>
                                    <div>
                                        <p className="mb-0 pb-0 text-primary"><small>Varainte 3: KPIs</small></p>
                                    </div>
                                    <div className="d-flex">
                                        <p ref={refApiTextExample3} className="mb-0 pb-0 mr-auto">{apiExample3}</p>
                                        <Button className="btn-priamary btn-sm" onClick={() => { copyToClipboard(refApiTextExample3) }}>Copy</Button>
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

export default withRouter(RecursivepartioningAlgorithmus);