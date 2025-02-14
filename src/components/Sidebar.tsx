import {Nav} from "react-bootstrap";
import {useAuth} from "../context/useAuth.tsx";

const Sidebar = () => {

    const {authenticated, isAdmin} = useAuth();

    return (

            <Nav className="flex-column bg-dark" variant="dark" style={{minHeight: "100%"}}>
                <Nav.Link className={"text-light"} href="/">Home</Nav.Link>
                <Nav.Link className={"text-light"} href="/highscores">High Scores</Nav.Link>
                {authenticated && (
                    <Nav.Link className={"text-light"} href="/members/mylifts">My Sets</Nav.Link>
                )}
                {isAdmin && (
                    <Nav.Link className={"text-light"} href="/admin/manageExercises">Manage Exercises</Nav.Link>
                )}

            </Nav>
    );
};

export default Sidebar;