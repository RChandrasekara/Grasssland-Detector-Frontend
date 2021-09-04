import React, { useState } from 'react';
import TopNavigation from '../../navigation/topNavigation/TopNavigation';
import { Button, Card, Col, Container, Figure, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const divOne = {
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'center'
}

const wrapperOne = {
    marginTop : '20vh'
}

const centerWrapper = {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'center'
}

const formControl = {
    width : '80%'
}

const form = {
    marginLeft : '5vw'
}

const verticalCenter = {
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    height: '40vh'
}

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token =  localStorage.getItem("token");
    const history = useHistory();

    const loginHandler = () => {
        axios.post(
            `${apiUrl}/login`, 
            {
                "email" : email,
                "password" : password
            },{
                "Content-Type": "application/json"
            }
        ).then(
            (res)=>{
                if(res.status == 200){
                    localStorage.setItem("token",res.data.access_token)
                    localStorage.setItem("id", res.data.id);
                    history.push("/home");
                }else{
                    alert("Something went wrong!");
                }
            }
        ).catch(error=>{
            console.log(error);
        })
    }


    return(
        <div>
            {(token && token !="" && token!=undefined) ? history.push("/home") : 
            <div>
                <TopNavigation />
                <div style={wrapperOne}>
                    <Container style={divOne}>
                        <Row>
                            <Col>
                                <div style={verticalCenter}>
                                    <div>
                                        <h1>Grassland Detecting System</h1>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <Container>
                                <Card>
                                    <Card.Body>
                                        <div style={centerWrapper}>
                                            <Card.Title>Login</Card.Title>
                                        </div>
                                        <Form style={form}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control 
                                                    type="email" 
                                                    placeholder="Enter email" 
                                                    style={formControl} 
                                                    value={email}
                                                    onChange={(e)=> setEmail(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control 
                                                    type="password" 
                                                    placeholder="Password" 
                                                    style={formControl} 
                                                    value={password}
                                                    onChange={(e)=> setPassword(e.target.value)}
                                                    />
                                            </Form.Group>
                                        </Form>
                                        <div style={centerWrapper}>
                                                <Button variant="primary" onClick={loginHandler}>
                                                    Login
                                                </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>}
        </div>
    )
}

export default Login;