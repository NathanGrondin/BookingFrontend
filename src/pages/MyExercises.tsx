import React, {FormEvent, useEffect, useState} from "react";
import {Alert, Button, Col, Container, Form, Modal, Row, Table, Card, Collapse} from "react-bootstrap";
import {useAuth} from "../context/useAuth.tsx";
import {Exercise, Set, UserExerciseSummary} from "../types/types.ts";
import {
    addSet, getUserExerciseSummary, calculateMax
} from "../services/setsService.ts";
import {getExercises} from "../services/exercisesServices.ts";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';



const MyExercises: React.FC = () => {
    const [showForm, setShowForm] = useState(false)
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
    const [exerciseName, setExerciseName] = useState<string>('')
    const [setReps, setSetReps] = useState<number>(0)
    const [setWeight, setSetWeight] = useState<number>(0)
    const [error, setError] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [exerciseSummary, setExerciseSummary] = useState<Record<string, UserExerciseSummary> | null>(null)
    const {getTokenInfo, auth} = useAuth();
    const [openRow, setOpenRow] = useState<string | null>(null);

    const toggleRow = (exerciseName: string) => {
        setOpenRow(openRow === exerciseName ? null : exerciseName);
    };

    useEffect(() => {
        if (!auth) {
            return
        }

        console.log('fetching ...')

        const fetchExerciseSummary = async () => {
            try{
                const response = await getUserExerciseSummary(getTokenInfo().userId)
                const data = response.data as Record<string, UserExerciseSummary>
                console.log(data)
                setExerciseSummary(data)

            }
            catch (error) {
                setApiError(error)
                console.error(error)
            }
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
        fetchExerciseSummary()

    }, [])



    const addSetToState = (exerciseSummary: Record<string, UserExerciseSummary | null>, set: Set) => {
        set.estimatedMax = calculateMax(set)

        if (exerciseName in exerciseSummary) {

            exerciseSummary[exerciseName]['sets'].unshift(set)

            if (set.estimatedMax > exerciseSummary[exerciseName]['estimatedMax']) {
                exerciseSummary[exerciseName]['estimatedMax'] = set.estimatedMax
                exerciseSummary[exerciseName]['estimatedMaxDate'] = set.date
            }
            setExerciseSummary((exerciseSummary) => ({ ...exerciseSummary }));
        }
        else {

            exerciseSummary[exerciseName] = {
                estimatedMax: set.estimatedMax,
                estimatedMaxDate: set.date,
                sets: [set]
            }
            setExerciseSummary((exerciseSummary) => ({ ...exerciseSummary }));
        }
    }
    const validateFormData = () => {
        if (!exerciseName || !setReps || !setWeight) {
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

        const userId = getTokenInfo().userId
        const exercise = exerciseList.find((exercise) => exercise.name === exerciseName);

        const liftBeingAdded : Set = {
            id: undefined,
            userid: userId,
            exerciseid: exercise['id'],
            weight: setWeight,
            reps: setReps,
            date: Date.now(),
        }
        try {
            const response = await addSet(liftBeingAdded)
            console.log('just got response')
            if (response.status == 200) {
                setSuccess(true);
                console.log('adding set')
                addSetToState(exerciseSummary, liftBeingAdded)
            }
        }

        catch (error) {
            console.log('wtf is going on')
            console.error(error)
        }
    }
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setExerciseName(event.target.value);
    };

    return (

        <Container className={"px-0"}>
            <Row className="justify-content-start">
                <Col md={2} className="text-start">
                    <Button variant="primary" size={"lg"} onClick={() => {
                        setShowForm(true)
                    }}>Add Set</Button>
                </Col>
                <Col md={10} className="text-start">
                    {/* Success Alert */}
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
                {exerciseSummary &&
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Exercise Name</th>
                            <th># of Sets</th>
                            <th>Estimated Max</th>
                            <th>Estimated Max Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(exerciseSummary).map(([exerciseName, exercise]) => (
                            <React.Fragment key={exerciseName}>
                                <tr
                                    className="clickable-row"
                                    onClick={() => toggleRow(exerciseName)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{exerciseName}</td>
                                    <td>{exercise.sets.length}</td>
                                    <td>{exercise.estimatedMax}</td>
                                    <td>{new Date(exercise.estimatedMaxDate).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan={4} style={{ padding: 0, border: 'none' }}>
                                        <Collapse in={openRow === exerciseName}>
                                            <Row>
                                                <h1 style={{textAlign: "center"}}>Estimated one rep max in lbs over time for {exerciseName}</h1>
                                                <Card.Body>
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <LineChart data={exercise.sets.slice().reverse().map(set => ({
                                                            date: new Date(set.date).toLocaleDateString(),
                                                            estimatedMax: set.estimatedMax || 0
                                                        }))}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="date" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Line type="monotone" dataKey="estimatedMax" stroke="#8884d8" />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </Card.Body>
                                            </Row>
                                        </Collapse>
                                    </td>
                                </tr>
                            </React.Fragment>
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
                            <Form.Label>Lift Name</Form.Label>
                            <Form.Select
                                value={exerciseName}
                                onChange={handleSelectChange}
                                aria-label="Select an exercise"
                            >
                                <option value="">Choose an exercise</option>
                                {exerciseList.map((exercise) => (
                                    <option key={exercise.id} value={exercise.name}>
                                        {exercise.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Reps</Form.Label>
                            <Form.Control type='number' placeholder='Enter the amount of repetitions you performed'
                                          value={setReps} min="1"
                                          onChange={(e) => setSetReps(e.target.value ? parseInt(e.target.value) : 0)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Weight</Form.Label>
                            <Form.Control type='number' placeholder='Enter the weight used during your set'
                                          value={setWeight} min="1"
                                          onChange={(e) => setSetWeight(e.target.value ? parseInt(e.target.value) : 0)}/>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit" style={{marginTop: "5%"}}>
                                Add lift
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


export default MyExercises;