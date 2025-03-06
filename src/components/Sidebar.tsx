import {Nav} from "react-bootstrap";
import {useAuth} from "../context/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

const Sidebar = () => {

    const {authenticated, isAdmin} = useAuth();
    const navigate = useNavigate();

    const onClick = useCallback((url : string)  => {
        navigate(url);

    }, []);

    return (

            <Nav className="flex-column bg-dark" variant="dark" style={{minHeight: "100%"}}>
                <Nav.Link className={"text-light"} onClick={() => onClick('/')}>Home</Nav.Link>
                <Nav.Link className={"text-light"} onClick={() => onClick('/highscores')}>High Scores</Nav.Link>
                {authenticated && (
                    <Nav.Link className={"text-light"} onClick={() => onClick("/members/mylifts")}>My Sets</Nav.Link>
                )}
                {isAdmin && (
                    <Nav.Link className={"text-light"} onClick={() => onClick("/admin/manageExercises")}>Manage Exercises</Nav.Link>
                )}

            </Nav>
    );
};

export default Sidebar;