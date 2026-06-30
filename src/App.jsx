import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <div className="flag-ribbon" aria-hidden="true" />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Sitio de una sola página: cualquier ruta vuelve al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
