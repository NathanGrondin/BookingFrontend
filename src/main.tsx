import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import Toolbar from "./components/Toolbar.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Container>
          <Toolbar/>
          <App/>
      </Container>

  </StrictMode>,
)
