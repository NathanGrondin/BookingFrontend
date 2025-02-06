import { Container, Nav, Navbar} from 'react-bootstrap';
import {useAuth} from "../context/useAuth.tsx";

function Toolbar (){

    const {authenticated, handleLogout, auth} = useAuth();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Belle Shape</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {authenticated ? (
                            <>
                                <Nav.Link href="/members">Welcome {auth?.username}</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link href="/login">Sign In</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Toolbar