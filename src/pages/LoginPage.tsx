import React from "react";
import { useState, FormEvent } from 'react';
import {Button, Container, Form, Row} from 'react-bootstrap';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'top',
                height: '100vh', // Full viewport height
                padding: '1rem', // Prevent edges
                boxSizing: 'border-box', // Ensure padding is included in dimensions
            }}
        >
            <Container fluid={"true"}>
                <Row>
                    <h1>Sign in</h1>
                </Row>
                <Row>
                    <Form onSubmit={onSignIn}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' placeholder='enter your username here' value={username}
                                          onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='enter your password here' value={password}
                                          onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit">
                                Log in
                            </Button>
                        </div>
                    </Form>
                </Row>
                <Row>
                    <div className={"d-flex justify-content-center"}>
                        <h5>Or sign up using</h5>
                    </div>
                </Row>
                <div className={"d-flex justify-content-center"}>
                    <Button variant="primary" type="submit">
                        sign up
                    </Button>
                </div>
            </Container>
        </div>
    );
};
export default LoginPage;