import { Container, Navbar} from 'react-bootstrap';

function Toolbar (){
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Belle Shape</Navbar.Brand>
            </Container>
        </Navbar>
    );
}
export default Toolbar