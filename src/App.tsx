import { Route, Routes} from 'react-router-dom';
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Home from "./pages/Home.tsx";
import Members from "./pages/Members.tsx";
import Admin from "./pages/Admin.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import {Col, Row, Container} from "react-bootstrap";
import Toolbar from "./components/Toolbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Highscores from "./pages/Highscores.tsx";
import MyExercises from "./pages/MyExercises.tsx";
import ManageExercises from "./pages/ManageExercises.tsx";

const App: React.FC = () => {
  return (
      <Container className={"px-0"} style={{ height: '100vh' }} fluid={true}>
          <Row>
              <Col>
                  <Toolbar/>
              </Col>

          </Row>
          <Row style={{ height: '100%' }}>
              <Col md={1}>
                  <Sidebar></Sidebar>
              </Col>
              <Col md={11}>
                  <Routes>
                      <Route path="/" element={<Home/>} />
                      <Route path="/signup" element={<Signup/>} />
                      <Route path="/login" element={<Login/>} />
                      <Route path="/members" element={
                          <ProtectedRoute requiredRole={["guest", "admin"]}>
                              <Members/>
                          </ProtectedRoute>
                      }>
                      </Route>
                      <Route path="/admin" element={
                          <ProtectedRoute requiredRole={["admin"]}>
                              <Admin/>
                          </ProtectedRoute>
                      }>
                      </Route>
                      <Route path="/admin/manageExercises" element={
                          <ProtectedRoute requiredRole={["admin"]}>
                              <ManageExercises/>
                          </ProtectedRoute>
                      }>
                      </Route>
                      <Route path="/unauthorized" element={<Unauthorized/>} />
                      <Route path="/highscores" element={<Highscores/>}></Route>
                      <Route path={"/members/mylifts"} element={<MyExercises/>}></Route>
                  </Routes>
              </Col>
          </Row>
      </Container>

  )
}

export default App
