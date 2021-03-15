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
                    <NavDropdown title="Volkswirtschaftliche Standorte">
                        <NavDropdown.Item onClick={() => pushHistory("/bodennutzung")}>Bodennutzung</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/kostenminimaler_wohnstandorte")}>Kostenminimaler Wohnstandorte</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/modell_huff")}>Modell von Huff</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/leader_follower_modelle")}>Leader Follower Modelle</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <NavDropdown title="Standortplanung Ebene">
                        <NavDropdown.Item onClick={() => pushHistory("/distanzmessung")}>Distanzmessung</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1medianprobleme_ebene_l1")}>1-Medianprobleme mit l_1 Metrik</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1medianprobleme_ebene_l22")}>1-Medianprobleme mit l_2^2 Entfernung</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1medianprobleme_ebene_l2")}>1-Medianprobleme mit l_2 Metrik</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1centerprobleme_ebene_l1")}>1-Centerprobleme mit l_1 Metrik</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1centerprobleme_ebene_linf")}>1-Centerproblme mit l_inf Metrik</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1centerprobleme_ebene_l2")}>1-Centerprobleme mit l2 Metrik</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <NavDropdown title="Standortplanung Netzwerken">
                        <NavDropdown.Item onClick={() => pushHistory("/distanzmessung_netzwerk")}>Distanzmessung Netzwerk</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/analytische_betrachtung_distanzfunktion")}>Analytische Betrachtung Distanzfunktion</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1medianprobleme_knotenbeschraenkt")}>1-Medianprobleme Knotenbeschränkt</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1medianprobleme_absolut")}>1 Medianprobleme Absolut</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1centerprobleme_knotenbeschraenkt")}>1-Centerprobleme Knotenbeschränkt</NavDropdown.Item>
                    </NavDropdown>
                </Nav>



                <Nav>
                    <NavDropdown title="Gebietsplanung">
                        <NavDropdown.Item onClick={() => pushHistory("/kompaktheitsmasse")}>Kompaktheitsmaße</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/recursive_partioning_algorithmus")}>Recursive-Partioning-Algorithmus</NavDropdown.Item>
                   </NavDropdown>
                </Nav>

                
            </Navbar.Collapse>
            </div>
        </Navbar>
    );
}
export default NavbarApp;

