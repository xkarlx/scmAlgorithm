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
                    <NavDropdown title="Volkswirt.">
                        <NavDropdown.Item onClick={() => pushHistory("/bodennutzung")}>Bodennutzung</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/kostenminimaler_wohnstandorte")}>Kostenminimaler Wohnstandorte</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/modell_huff")}>Modell von Huff</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/leader_follower_modelle")}>Leader Follower Modelle</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <NavDropdown title="Ebene">
                        <NavDropdown.Item onClick={() => pushHistory("/distanzmessung")}>Distanzmessung</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1medianprobleme_ebene_l1")}>1-Medianprobleme mit l_1 Metrik</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1medianprobleme_ebene_l22")}>1-Medianprobleme mit l_2^2 Entfernung</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1medianprobleme_ebene_l2")}>1-Medianprobleme mit l_2 Metrik</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1centerprobleme_ebene_l1")}>1-Centerprobleme mit l_1 Metrik</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1centerprobleme_ebene_gewichtet")}>1-Centerprobleme mit l_1 Gewichtet</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1centerprobleme_ebene_l2")}>1-Centerprobleme mit l2 Metrik</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <NavDropdown title="Netzwerke">
                        <NavDropdown.Item onClick={() => pushHistory("/distanzmessung_netzwerk")}>Distanzmessung Netzwerk</NavDropdown.Item>                        
                        <NavDropdown.Item onClick={() => pushHistory("/1medianprobleme_knotenbeschraenkt")}>1-Medianprobleme Knotenbeschränkt</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1medianprobleme_baeume")}>1-Medianprobleme Bäume</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1centerprobleme_knotenbeschraenkt")}>1-Centerprobleme Knotenbeschränkt</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/1centerprobleme_baeume")}>1-Centerprobleme Bäume</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <Nav>
                    <NavDropdown title="Diskrete">
                        <NavDropdown.Item onClick={() => pushHistory("/dual_adjustment_verfahren")}>Dual-Adjustment Verfahren</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/dual_ascent_verfahren")}>Dual-Ascent Verfahren</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/greedy_heuristik")}>Greedy Heuristik</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/interchange_heuristik")}>Interchange Heuristik</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => pushHistory("/konstruktionsheuristik")}>Konstruktionsheuristik</NavDropdown.Item>
                    </NavDropdown>
                </Nav>


                <Nav>
                    <NavDropdown title="Gebietspl.">
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

