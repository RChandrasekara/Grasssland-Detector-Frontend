import React from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';

function TopNavigation() {

    const token = localStorage.getItem("token");
    const history = useHistory();

    const logoutHandler = () => {
        localStorage.clear();
        history.push("/");
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Grassland Detecting System</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    {(token && token !="" && token!=undefined) ? <Nav>
                        <Nav.Link ><Link to='/'><Button variant="outline-light" onClick={logoutHandler}>Logout</Button></Link></Nav.Link>
                    </Nav> :
                    <Nav>
                        <Nav.Link ><Link to='/'><Button variant="outline-light">Login</Button></Link></Nav.Link>
                        <Nav.Link ><Link to='/sign-in'><Button variant="light">Sign In</Button></Link></Nav.Link>
                    </Nav>
                    }
                </Navbar.Collapse>
            </Container>
            </Navbar>
    )
}

export default TopNavigation;