import React from "react";
import styles from "./styles/Aboutstyle.module.css";
import meImage from "./me.png";

function AboutAnimation() {
    return (
      <div className={styles.mpage}>
        <div className={styles['left-section']}>
          <h1>Who am I?</h1>
          <p>
            Born in 2006, I am a passionate developer interested in Cybersecurity, 
            AI and Full Stack Development. I enjoy building secure, scalable and 
            intelligent systems.
          </p>
        </div>
        <div className={styles['right-section']}>
          <img src={meImage} alt="About Me" />
        </div>
      </div>
    );
}

export default AboutAnimation;