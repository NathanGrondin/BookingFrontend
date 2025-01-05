import React from "react";
import { useState, FormEvent } from 'react';
import {Button, Container, Form, Row, Alert} from 'react-bootstrap';
import {signupUser, User} from "../services/usersService.ts";
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    const validateFormData = () => {
        if (!username || !password || !email) {
            setError('All fields are required.');
            setSuccess(false);
            return false;
        }

        if (!isValidEmail(email)){
            setError('Email is not valid');
            setSuccess(false);
            return false;
        }
        setError(null); // Clear the error message
        return true;
    }

    const onSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateFormData()) {
            const userSigningUp : User = {
                username: username,
                password: password,
                email: email
            }

            setSuccess(true);
            const response = await signupUser(userSigningUp)

            if (response.status == 200) {
                setTimeout(() => {
                    navigate('/');
                }, 1000);
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
                <Row>
                    <h1>Sign up</h1>
                </Row>
                <Row>
                    <Form onSubmit={onSignup}>
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
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' placeholder='enter your email here' value={email}
                                          onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit">
                                Sign up
                            </Button>
                        </div>
                    </Form>
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
export default Signup;