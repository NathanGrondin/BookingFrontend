import React, {useEffect, useState} from "react";
import {Alert, Container, Table} from "react-bootstrap";
import {HighscoreData} from "../types/types.ts";
import {getHighscores} from "../services/setsService.ts";

const Highscores: React.FC = () => {

    const [highscores, setHighscores] = useState<Record<string, HighscoreData> | null>(null)
    const [apiError, setApiError] = useState<string | null>(null);
    const [openRow, setOpenRow] = useState<string | null>(null);

    useEffect(() => {
        const fetchHighscores = async () => {
            try{
                const response = await getHighscores()
                const data = response.data as Record<string, HighscoreData>
                setHighscores(data)

            }
            catch (error) {
                setApiError(error)
                console.error(error)
            }
        }
        fetchHighscores()

    }, [])

    const toggleRow = (exerciseName: string) => {
        setOpenRow(openRow === exerciseName ? null : exerciseName);
    };

    return (
        <Container>
            {highscores && (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Exercise Name</th>
                        <th>Username</th>
                        <th>Estimated Max</th>
                        <th>Estimated Max Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(highscores).map(([exerciseName, highscoreData]) => {
                        const firstRow = highscoreData.exerciseRows[0];
                        const remainingRows = highscoreData.exerciseRows.slice(1);

                        return (
                            <React.Fragment key={exerciseName}>
                                <tr onClick={() => toggleRow(exerciseName)} style={{ cursor: "pointer" }}>
                                    <td>
                                        {exerciseName}
                                    </td>
                                    <td style={{ backgroundColor: "#FFD700", fontWeight: "bold" }}>{firstRow.username}</td>
                                    <td>{firstRow.estimatedMax}</td>
                                    <td>{new Date(firstRow.date).toLocaleDateString()}</td>
                                </tr>

                                {openRow === exerciseName &&
                                    remainingRows.map((row, idx) => {

                                        let backgroundColor = "transparent";
                                        let fontWeight = "normal";

                                        if (idx === 0) {
                                            backgroundColor = "#C0C0C0";
                                            fontWeight = "bold";
                                        } else if (idx === 1) {
                                            backgroundColor = "#CD7F32";
                                            fontWeight = "bold";
                                        }
                                        return (
                                            <tr key={idx} className="bg-light">
                                                <td>{row.exerciseName || exerciseName}</td>
                                                <td style={{
                                                    backgroundColor: backgroundColor, // Silver for 2nd row
                                                    fontWeight: fontWeight,
                                                }}>
                                                    {row.username}</td>
                                                <td>{row.estimatedMax}</td>
                                                <td>{new Date(row.date).toLocaleDateString()}</td>
                                            </tr>
                                        )
                                    })}
                            </React.Fragment>
                        );
                    })}
                    </tbody>
                </Table>
            )}
            {apiError &&
                <Alert variant="danger"> Error fetching Data </Alert>
            }
        </Container>
    );
};

export default Highscores;