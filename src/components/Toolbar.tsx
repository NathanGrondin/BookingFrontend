import {Nav, Navbar} from 'react-bootstrap';
import {useAuth} from "../context/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

function Toolbar (){

    const {authenticated, handleLogout, auth} = useAuth();
    const navigate = useNavigate();

    const onClick = useCallback((url : string)  => {
        navigate(url);

    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand className={"px-3"} href="/">Belle Shape</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {authenticated ? (
                            <>
                                <Nav.Link onClick={() => onClick('/members')}>Welcome {auth?.username}</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link onClick={() => onClick('/login')}>Sign In</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}
export default Toolbar