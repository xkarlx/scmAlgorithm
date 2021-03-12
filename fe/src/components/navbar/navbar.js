import React, { Component } from "react";
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import logo from '../../assets/image/logo192.png'
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
            <div className="container">
            <Navbar.Brand>
            <img 
                alt="Logo"                        
                src={logo}  
                height="30"
                width="scale"              
                className="d-inline-block align-top"
            />{' '}
            PCS sample
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" float="right">
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => pushHistory("/")} >Home</Nav.Link>  
                </Nav>              


                
            </Navbar.Collapse>
            </div>
        </Navbar>
    );
}
export default NavbarApp;

