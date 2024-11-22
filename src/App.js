import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login'; 
import Register from './register';
import Catalogo from './catalogo';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/catalogo" element={<Catalogo />} />
            </Routes>
        </Router>
    );
}

export default App;
