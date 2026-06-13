import React, { useEffect, useRef, useState } from "react";
import AboutAnimation from "./AboutAnimation";
import styles from './styles/Aboutstyle.module.css';
import { Routes, Route, Link } from 'react-router-dom';
function About() {
  const secondPageRef = useRef(null);
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSecond(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      }
    );

    if (secondPageRef.current) {
      observer.observe(secondPageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <nav className={styles.mainNav}>
            <Link to="/">Home</Link>
            <Link to="/cybersecurity">Cybersecurity</Link>
            <Link to="/ai-python">AI & Python</Link>
            <Link to="/fullstack">Fullstack</Link>
          </nav>
    <div className={styles['about-container']}>

      {/* 1page*/}
      <section className={styles['main-page']}>
        
        <AboutAnimation />
      </section>

      {/*2page*/}
      <section 
        ref={secondPageRef} 
        className={`${styles['second-page']} ${showSecond ? styles.visible : ''}`}
      >
        <div className={styles.l2side}>
          <h2>Achievements</h2>

          <div className={styles.achievements}>
            <div className={styles.achievement}>
              <div className={styles['achievement-line']}></div>
              <div className={styles['achievement-content']}>
                <h3>Winner of the Hackathon</h3>
                <p>HACKATHON Krosno 2022</p>
              </div>
            </div>

            <div className={styles.achievement}>
              <div className={styles['achievement-line']}></div>
              <div className={styles['achievement-content']}>
                <h3>Finalist AI4Youth 2023</h3>
                <p>Intel — finalist certificate</p>
              </div>
            </div>

            <div className={styles.achievement}>
              <div className={styles['achievement-line']}></div>
              <div className={styles['achievement-content']}>
                <h3>Obtaining the title of IT technician 2026</h3>
                <p>INF02 and INF03</p>
              </div>
            </div>

            <div className={styles.achievement}>
              <div className={styles['achievement-line']}></div>
              <div className={styles['achievement-content']}>
                <h3>Graduating from high school in 2026</h3>
                <p>Zespół Szkół Elektrycznych i Ogólnokształcących w Krośnie</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.r2side}>
          <h2>What I'm currently learning</h2>
          <ul className={styles['learning-list']}>
            <li>React and modern components</li>
            <li>Backend and databases</li>
            <li>Better Fullstack projects</li>
            <li>Cybersecurity</li>
            <li>AI in Python</li>
            <li>Robotics and drones</li>
            <li>Machine Learning and much more...</li>
          </ul>
          <p>Known technologies in individual tabs</p>
        </div>
      </section>
    </div>
    </>
  );
}

export default About;