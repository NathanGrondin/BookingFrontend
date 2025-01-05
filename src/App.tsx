import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Home from "./pages/Home.tsx";
import Members from "./pages/Members.tsx";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/member" element={<Members/>} />
        </Routes>
    </Router>
  )
}

export default App
