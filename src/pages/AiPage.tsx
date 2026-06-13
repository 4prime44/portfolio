import styles from "./styles/AiPage.module.css";
import React, { useState } from "react"; 
import { Routes, Route, Link } from 'react-router-dom'; 
type TopicKey = "python" | "vision" | "robotics" | "drones" | "ml";

const topics = {
  python: {
    title: "Python",
    description: "Główny język wykorzystywany do AI, automatyzacji oraz analizy danych.",
    technologies: ["Python", "NumPy", "Pandas", "Tkinter"],
    projects: ["Automation Scripts", "Desktop Apps"]
  },
  vision: {
    title: "Computer Vision",
    description: "Rozpoznawanie ludzi, obiektów i analiza obrazu.",
    technologies: ["OpenCV", "YOLO", "MediaPipe"],
    projects: ["Face Recognition", "Object Tracking"]
  },
  robotics: {
    title: "Robotics",
    description: "Sterowanie urządzeniami oraz systemami autonomicznymi.",
    technologies: ["Arduino", "Raspberry Pi", "Sensors"],
    projects: ["Robot Controller", "Automation Systems"]
  },
  drones: {
    title: "Drones",
    description: "Programowanie lotów oraz systemów monitoringu.",
    technologies: ["Telemetry", "Mission Planning", "GPS"],
    projects: ["Drone Tracking", "Autonomous Flight"]
  },
  ml: {
    title: "Machine Learning",
    description: "Uczenie modeli i analiza danych.",
    technologies: ["Scikit-Learn", "TensorFlow", "PyTorch"],
    projects: ["Prediction Models", "Classification Systems"]
  }
};

export default function AiPage() {
  const [active, setActive] = useState<TopicKey>("python");

  return (
    <>
      <nav className={styles.mainNav}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/ai-python">Cybersecurity</Link>
            <Link to="/fullstack">Fullstack</Link>
      </nav>
    <div className={styles['ai-page']}>
      <div className={styles['network-container']}>
        
        {/* svg dynamic lines */}
        <svg className={styles['network-svg']} viewBox="0 0 700 700">
          <line x1="350" y1="350" x2="345" y2="75" className={`${styles['svg-line']} ${active === 'vision' ? styles.activeLine : ''}`} />
          <line x1="350" y1="350" x2="105" y2="335" className={`${styles['svg-line']} ${active === 'robotics' ? styles.activeLine : ''}`} />
          <line x1="350" y1="350" x2="145" y2="525" className={`${styles['svg-line']} ${active === 'drones' ? styles.activeLine : ''}`} />
          <line x1="350" y1="350" x2="345" y2="595" className={`${styles['svg-line']} ${active === 'python' ? styles.activeLine : ''}`} />
          <line x1="350" y1="350" x2="585" y2="335" className={`${styles['svg-line']} ${active === 'ml' ? styles.activeLine : ''}`} />
        </svg>

        {/* core */}
        <div className={styles.core}>
          <div className={styles['core-pulse']}></div>
          <span>AI CORE</span>
        </div>

        {/*nodes */}
        <div
          className={`${styles.node} ${styles.vision} ${active === "vision" ? styles.activeNode : ""}`}
          onClick={() => setActive("vision")}
          onMouseEnter={() => setActive("vision")}
        >
          Computer Vision
        </div>

        <div
          className={`${styles.node} ${styles.robotics} ${active === "robotics" ? styles.activeNode : ""}`}
          onClick={() => setActive("robotics")}
          onMouseEnter={() => setActive("robotics")}
        >
          Robotics
        </div>

        <div
          className={`${styles.node} ${styles.drones} ${active === "drones" ? styles.activeNode : ""}`}
          onClick={() => setActive("drones")}
          onMouseEnter={() => setActive("drones")}
        >
          Drones
        </div>

        <div
          className={`${styles.node} ${styles.ml} ${active === "ml" ? styles.activeNode : ""}`}
          onClick={() => setActive("ml")}
          onMouseEnter={() => setActive("ml")}
        >
          Machine Learning
        </div>

        <div
          className={`${styles.node} ${styles.python} ${active === "python" ? styles.activeNode : ""}`}
          onClick={() => setActive("python")}
          onMouseEnter={() => setActive("python")}
        >
          Python
        </div>
      </div>

      {/* info panel */}
      <div className={styles['info-panel']}>
        <h2>{topics[active].title}</h2>
        <p>{topics[active].description}</p>

        <h3>Technologies</h3>
        <div className={styles['tech-list']}>
          {topics[active].technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <h3>Projects</h3>
        <ul className={styles['project-list']}>
          {topics[active].projects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
  );
}