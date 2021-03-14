import React, { Component } from "react";
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import logo from '../../assets/image/chain.svg'
import { useHistory, withRouter  } from "react-router-dom";

/**
 * Navbar when not looged in
 */
export function NavbarApp (){
    let history = useHistory();
    function pushHistory(push_path){
        
        history.push(push_path);
       
    }
 

    return (
        <Navbar className="sticky-top navbar-fill " collapseOnSelect expand="md" bg="dark" variant="dark">
            <div className="container-fluid">
            <Navbar.Brand>
            <img 
                alt="Logo"                        
                src={logo}  
                height="30"
                width="scale"              
                className="d-inline-block align-top"
            />{' '}
            SCM Algorithm
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" float="right">
                <Nav className="">
                    <Nav.Link onClick={() => pushHistory("/")} >Home</Nav.Link>  
                </Nav>              
                <Nav>
                    <NavDropdown title="Dropdown">
                        <NavDropdown.Item onClick={() => pushHistory("/")}>Action</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/")}>Another action</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/")}>Something</NavDropdown.Item>                       
                        <NavDropdown.Item onClick={() => pushHistory("/")}>Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                
            </Navbar.Collapse>
            </div>
        </Navbar>
    );
}
export default NavbarApp;

