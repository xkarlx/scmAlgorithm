import React, { Component,useRef } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

import { withRouter } from "react-router-dom";
import {useForm} from "react-hook-form"

/**
 * /home
 */
function Template() {

    const refApiTextExample = useRef(null)
    const apiExample = "Test";
    const { register, handleSubmit, watch, errors } = useForm();

    function coopyToClipboard(){
        console.log(refApiTextExample["current"].innerText,refApiTextExample)
        const el = document.createElement('textarea');
        el.value = refApiTextExample["current"].innerText;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);       
        
    }

    const onSubmit = data => console.log(data);


    return (
        <div className="container-fluid ">
            <div className="row ">

                <div className="col-md-6 overflow-auto vh-100">
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Formula</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{height: "2px"}}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img 
                            src="https://via.placeholder.com/150"
                            alt="new"
                            className="w-100"
                            style={{maxWidth:"600px"}}
                            />
                            <img 
                            src="https://via.placeholder.com/150"
                            alt="new"
                            className="w-100"
                            style={{maxWidth:"600px"}}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Example</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{height: "2px"}}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img 
                            src="https://via.placeholder.com/150"
                            alt="new"
                            className="w-100"
                            style={{maxWidth:"600px"}}
                            />
                            <img 
                            src="https://via.placeholder.com/150"
                            alt="new"
                            className="w-100"
                            style={{maxWidth:"600px"}}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">Excercise</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{height: "2px"}}></hr>
                        </div>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            <img 
                            src="https://via.placeholder.com/150"
                            alt="new"
                            className="w-100"
                            style={{maxWidth:"600px"}}
                            />
                            <img 
                            src="https://via.placeholder.com/150"
                            alt="new"
                            className="w-100"
                            style={{maxWidth:"600px"}}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">API introduction</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{height: "2px"}}></hr>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className="d-flex">
                                    <p ref={refApiTextExample} className="mb-0 mr-auto">Input</p>
                                    <Button className="btn-priamary btn-sm" onClick={()=>{coopyToClipboard()}}>Copy</Button>
                                </Card.Body>
                            </Card>
                        </div>
                       
                    </div>
                    <div className="mt-3">
                        <div>
                            <h3 className="mb-0">API input</h3>
                            <hr className="bg-dark mt-0 pt-0" style={{height: "2px"}}></hr>
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
                            <hr className="bg-dark mt-0 pt-0" style={{height: "2px"}}></hr>
                        </div>
                        <div>
                            <Card>
                                <Card.Body className="">
                                    <form>
                                        
                                    </form>
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