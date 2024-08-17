import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Exercise Tracker</h1>
          <p>Full Stack MERN App</p>
        </header>

        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-exercise">Create Exercise</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-exercise" element={<CreateExercisePage />} />
            <Route path="/edit-exercise/:id" element={<EditExercisePage />} />
          </Routes>
        </main>

        <footer>
          <p>© Created in 2024 </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
