import React from "react";
import { useState, FormEvent } from 'react';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import {signinUser} from "../services/usersService.ts";
import {User} from "../types/types.ts"

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const validateFormData = () => {
        if (!username || !password) {
            setError('All fields are required.');
            setSuccess(false);
            return false;

        }

        setError(null); // Clear the error message
        return true;
    }

    const onSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateFormData()){
            const userSigningIn : User = {
                username:username,
                password:password,
                email:undefined
            }
            try{

                const response = await signinUser(userSigningIn);
                const token = response.data.token
                localStorage.setItem('jwt', token);
                localStorage.setItem("user", JSON.stringify({
                    username: username,
                }))
                navigate('/members');
            }

            catch {
                setError('Invalid username or password');
                setSuccess(false);
            }
        }
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
                <Row style={{marginBottom: "5%"}}>
                    <h1>Sign in</h1>
                </Row>
                <Row style={{marginBottom: "5%"}}>
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
                                    <Button variant="primary" type="submit" style={{marginTop: "5%"}}>
                                        Log in
                                    </Button>
                                </div>
                        </Form>
                </Row>
                <Row>
                    <Col>
                        <div className={"d-flex justify-content-center"}>
                            <h5>Or sign up using</h5>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <div className={"d-flex justify-content-center"}>
                            <Link to={"/signup"}>
                                <Button variant="primary" type="submit">
                                    sign up
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* Success Alert */}
                    {success && (
                        <Alert variant="success">
                            Form submitted successfully!
                        </Alert>
                    )}

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}
                </Row>
            </Container>
        </div>
    );
};
export default Login;