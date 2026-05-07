import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Weekly from './components/Weekly';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <nav className="nav">
        <button onClick={() => setCurrentPage('dashboard')} className={currentPage === 'dashboard' ? 'active' : ''}>
          Dashboard
        </button>
        <button onClick={() => setCurrentPage('weekly')} className={currentPage === 'weekly' ? 'active' : ''}>
          Weekly Analytics
        </button>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </nav>
      {currentPage === 'dashboard' ? <Dashboard /> : <Weekly />}
    </div>
  );
}

export default App;
