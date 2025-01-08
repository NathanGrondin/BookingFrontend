import { Route, Routes} from 'react-router-dom';
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Home from "./pages/Home.tsx";
import Members from "./pages/Members.tsx";
import Admin from "./pages/Admin.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import {Container} from "react-bootstrap";
import Toolbar from "./components/Toolbar.tsx";

const App: React.FC = () => {
  return (
      <Container>
          <Toolbar></Toolbar>
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
              <Route path="/unauthorized" element={<Unauthorized/>} />
          </Routes>
      </Container>

  )
}

export default App
