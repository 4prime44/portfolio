import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import CyberPage from './pages/CyberPage';
import AiPage from './pages/AiPage';
import FullstackPage from './pages/FullstackPage';
import Background from './assets/bg';
import About from './pages/About';
import styles from './App.module.css';

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={styles.appContainer}>
      
      {isHome && (
        <div className={styles.canvasBg}>
          <Background />
        </div>
      )}

      <div className={styles.content}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <nav className={styles.navigation}>
                  <Link to="/About">About</Link>
                  <Link to="/cybersecurity">Cybersecurity</Link>
                  <Link to="/ai-python">AI & Python</Link>
                  <Link to="/fullstack">Fullstack</Link>
                </nav>

                <div className={styles.hero}>
                  <h1 className={styles.heroTitle}>
                    Building systems that think, scale and secure.
                  </h1>
                </div>
              </>
            }
          />

          <Route path="/About" element={<About />} />
          <Route path="/cybersecurity" element={<CyberPage />} />
          <Route path="/ai-python" element={<AiPage />} />
          <Route path="/fullstack" element={<FullstackPage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;