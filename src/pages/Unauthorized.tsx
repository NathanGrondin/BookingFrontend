import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Unauthorized: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }, []);

    return (
        <Container fluid={true}>
            <h1>YOU DONT HAVE ACCESS HERE, redirecting to homepage</h1>
        </Container>
    )
}

export default Unauthorized;