import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

/**
 * No Match page
 */
function NoMatch(){
    
    return (
        <h1>No Match </h1>
    );
    
}

export default withRouter(NoMatch);