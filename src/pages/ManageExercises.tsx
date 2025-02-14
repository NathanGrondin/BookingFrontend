import React, {FormEvent, useEffect, useState} from "react";
import {Alert, Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {Exercise} from "../types/types.ts";
import {useAuth} from "../context/useAuth.tsx";
import {addExercise, getExercises} from "../services/exercisesServices.ts";

const ManageExercises: React.FC = () => {
    const [showForm, setShowForm] = useState(false)
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
    const [exerciseName, setExerciseName] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const {isAdmin} = useAuth();

    useEffect(() => {

        if (!isAdmin) {
            return
        }

        const fetchExercises = async () => {
            try{
                const response = await getExercises()
                const data = response.data as Exercise[]
                setExerciseList(data)

            }
            catch (error) {
                setApiError(error)
                console.error(error)
            }
        }
        fetchExercises()

    }, [])

    const validateFormData = () => {
        if (!exerciseName) {
            return false;
        }

        setError(null);
        return true;
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateFormData()) {
            setError('All fields are required.');
            setSuccess(false);
            return
        }
        setShowForm(false)
        const exerciseBeingAdded : Exercise = {
            id: undefined,
            name: exerciseName
        }
        try {
            const response = await addExercise(exerciseBeingAdded)
            if (response.status == 200) {
                setSuccess(true);
                setExerciseList([...exerciseList, exerciseBeingAdded])
            }
        }

        catch (error) {
            console.error(error)
        }
    }

    return (

        <Container className={"px-0"}>
            <Row className="justify-content-start">
                <Col md={2} className="text-start">
                    <Button variant="primary" size={"lg"} onClick={() => {setShowForm(true)}}>Add Exercise</Button>
                </Col>
                <Col md={10} className="text-start">

                    {success && (
                        <Alert variant="success">
                            Lift was added successfully!
                        </Alert>
                    )}

                    {apiError && (
                        <Alert variant="danger"> Error fetching Data </Alert>
                    )}
                </Col>
            </Row>
            <Row className="justify-content-start">
                {exerciseList &&
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Exercise</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(exerciseList).map((exercise) => (
                            <tr key={exercise.id}>
                                <td>{exercise.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                }


            </Row>

            <Modal show={showForm} onHide={() => setShowForm(false)} centered>
                <Modal.Header closeButton> </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Exercise Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter the name of the exercise'
                                          value={exerciseName}
                                          onChange={(e) => setExerciseName(e.target.value)}/>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit" style={{marginTop: "5%"}}>
                                Add Exercise
                            </Button>
                        </div>
                    </Form>
                    <div className="d-flex justify-content-center">
                        <Col md={4}>
                            {/* Error Alert */}
                            {error && (
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                            )}
                        </Col>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default ManageExercises;