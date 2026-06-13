import  { useState } from "react";
import { Link } from 'react-router-dom';
import Preloader from "../assets/Preloader";
import styles from './styles/CyberPage.module.css';

function CyberPage() {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      {!loading && (
        <div className={styles.pageWrapper}>
          <nav className={styles.mainNav}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/ai-python">AI & Python</Link>
            <Link to="/fullstack">Fullstack</Link>
          </nav>

          <div className={styles.mainpart}>

            {/* left - tools */}
            <section className={`${styles.panel} ${styles.left}`}>
              <div className={styles['panel-header']}>
                <h2>TOOLS</h2>
                <p>Which I know or I'm currently developing</p>
                <input type="text" placeholder="Search tools..." className={styles.searchInput} />
              </div>

              <div className={styles['tools-grid']}>
                <div className={styles.tool}>Nmap</div>
                <div className={styles.tool}>Python</div>
                <div className={styles.tool}>Linux</div>
              </div>
            </section>

            {/* center - theory */}
            <section className={`${styles.panel} ${styles.center}`}>
              <div className={styles['panel-header']}>
                <h2>KNOWLEDGE</h2>
                <p>Click to expand topics</p>
              </div>

              <div className={styles.accordion}>
                <details className={styles.detailsBlock}>
                  <summary className={styles.summaryTitle}>Topic 1</summary>
                  <p className={styles.detailsContent}>Text...</p>
                </details>

                <details className={styles.detailsBlock}>
                  <summary className={styles.summaryTitle}>Topic 2</summary>
                  <p className={styles.detailsContent}>Text...</p>
                </details>

                <details className={styles.detailsBlock}>
                  <summary className={styles.summaryTitle}>Topic 3</summary>
                  <p className={styles.detailsContent}>Text...</p>
                </details>
              </div>
            </section>

            {/* right - projects */}
            <section className={`${styles.panel} ${styles.right}`}>
              <div className={styles['panel-header']}>
                <h2>PROJECTS</h2>
                <p>Things I'm building</p>
              </div>

              <div className={styles.projects}>
                <div className={styles['project-card']}>Future project 1</div>
                <div className={styles['project-card']}>Future project 2</div>
                <div className={styles['project-card']}>Future project 3</div>
              </div>
            </section>

          </div>
        </div>
      )}
    </>
  );
}

export default CyberPage;
