import React, { useState } from 'react';
import TopNavigation from '../../navigation/topNavigation/TopNavigation';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const divOne = {
    backgroundColor: 'white',
    marginTop : '15vh'
}

const centerWrapper = {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'center'
}

const formControl = {
    width : '90%'
}

const form = {
    marginLeft : '5vw'
}

const verticalCenter = {
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    height: '50vh'
}

function SignIn(){

    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    // const [passwordConfirm,setPasswordConfirm]=useState('');
    const history = useHistory();

    const validateInputs = () =>{
        if(firstName === ""){
            return false;
        }
        if(lastName === ""){
            return false;
        }
        if(email === ""){
            return false;
        }
        if(password === ""){
            return false;
        }
        return true;
    }

    const signinHandler = () => {
        if(validateInputs()){
            axios.post(
                `${apiUrl}/sign-in`, 
                {
                    "firstName" : firstName,
                    "lastName" : lastName,
                    "email" : email,
                    "password" : password
                },{
                    "Content-Type": "application/json"
                }
            ).then(
                (res)=>{
                    if(res.status == 200){
                        localStorage.setItem("token",res.data.access_token);
                        localStorage.setItem("id", res.data.id);
                        history.push("/home");
                    }else{
                        alert("Something went wrong!");
                    }
                }
            ).catch(error=>{
                console.log(error);
            })
        }else{
            console.log("Failed");
        }
    }

    return(
        <div>
            <TopNavigation />
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
                                <Card.Title>Sign In</Card.Title>
                                </div>
                                <Form style={form}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control 
                                            required
                                            type="text" 
                                            placeholder="First Name"
                                            style={formControl}
                                            value={firstName}
                                            onChange={(e)=>setFirstName(e.target.value)}
                                             />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control 
                                            required
                                            type="text" 
                                            placeholder="Last Name"
                                            style={formControl}
                                            value={lastName}
                                            onChange={(e)=>setLastName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                            required
                                            type="email" 
                                            placeholder="Enter email"
                                            style={formControl}
                                            value={email}
                                            onChange={(e)=>setEmail(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            required
                                            type="password" 
                                            placeholder="Password"
                                            style={formControl}
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)} />
                                    </Form.Group>

                                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password Confirm</Form.Label>
                                        <Form.Control
                                            required
                                            type="password" 
                                            placeholder="Confirm Password"
                                            style={formControl}
                                            value={passwordConfirm}
                                            onChange={(e)=>setPassword(e.target.value)} />
                                    </Form.Group> */}
                                    <div style={centerWrapper}>
                                        <Button variant="primary" onClick={signinHandler}>
                                            Sign In
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignIn;