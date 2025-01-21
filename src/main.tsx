import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
        <StrictMode>
            <Container>
                <App/>
            </Container>
        </StrictMode>,
    </BrowserRouter>

)
