import React, { useState } from "react"; 
import { Routes, Route, Link } from 'react-router-dom'; 
import styles from "./styles/FullstackPage.module.css";  

function FullstackPage() {     
  const [active, setActive] = useState<string>("frontend");  
  //define object
  const stackData: Record<
    string,
    {
      title: string;
      description: string;
      technologies: string[];
      projects: string[];
    }
  > = { //define options
    frontend: {
      title: "Frontend",
      description: "Tworzenie nowoczesnych interfejsów użytkownika.",
      technologies: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"],
      projects: ["Portfolio", "E-Commerce", "Task Manager"]
    },
    backend: {
      title: "Backend",
      description: "Budowanie API oraz logiki aplikacji.",
      technologies: ["Node.js", "Express", "REST API", "JWT"],
      projects: ["Auth System", "Chat API", "School System"]
    },
    database: {
      title: "Database",
      description: "Projektowanie i zarządzanie bazami danych.",
      technologies: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
      projects: ["Analytics System", "School Database"]
    },
    deployment: {
      title: "Deployment",
      description: "Wdrażanie aplikacji i DevOps.",
      technologies: ["Docker", "Linux", "GitHub", "Vercel"],
      projects: ["CI/CD", "Production Deployments"]
    }
  };   

  return (
    <>
      {/* Nav */}
      <nav className={styles['mainNav']}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/ai-python">AI & Python</Link>
        <Link to="/cybersecurity">Cybersecurity</Link>
      </nav>

      {/*main app */}
      <div className={styles['fs_container']}> 
        {/* Option Bar + check if chosen */}   
        <div className={styles['fs-left']}>      
          <h1>FULL STACK ARCHITECTURE</h1>      
          <div className={styles.architecture}>        
            <div         
              className={`${styles.layer} ${active === "frontend" ? styles.active : ""}`}         
              onClick={() => setActive("frontend")}       
            >         
              Frontend       
            </div>        
            <div className={styles.connector}></div>        
            <div         
              className={`${styles.layer} ${active === "backend" ? styles.active : ""}`}         
              onClick={() => setActive("backend")}       
            >         
              Backend       
            </div>        
            <div className={styles.connector}></div>        
            <div         
              className={`${styles.layer} ${active === "database" ? styles.active : ""}`}         
              onClick={() => setActive("database")}       
            >         
              Database       
            </div>        
            <div className={styles.connector}></div>        
            <div         
              className={`${styles.layer} ${active === "deployment" ? styles.active : ""}`}         
              onClick={() => setActive("deployment")}       
            >         
              Deployment       
            </div>      
          </div>   
        </div>    
        {/* info frame  */}
        <div className={styles['fs-right']}>      
          <div className={styles['info-card']}>        
            <h2>{stackData[active].title}</h2>        
            <p>{stackData[active].description}</p>        
            <h3>Technologies</h3>        
            <div className={styles['tech-grid']}>         
              {stackData[active].technologies.map((tech) => (           
                <span key={tech}>{tech}</span>         
              ))}       
            </div>        
            <h3>Projects</h3>        
            <ul>         
              {stackData[active].projects.map((project) => (           
                <li key={project}>{project}</li>         
              ))}       
            </ul>      
          </div>    
        </div>  
      </div>
    </>
  ); 
}  

export default FullstackPage;
