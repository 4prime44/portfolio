import { useEffect, useState } from "react";
import "./Preloader.css";
import kaliLogo from './kali-logo.png';
type PreloaderProps = { //when the preloader finishes, it will call this function to notify the parent component
  onFinish: () => void;
};

export default function Preloader({ onFinish }: PreloaderProps) {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setTimeout(() => setOpen(true), 100);

    const t1 = setTimeout(() => setHide(true), 1500);   // after 1.5 seconds, hide the preloader (start fade out animation)
    const t2 = setTimeout(() => onFinish(), 2000);      // after 2 seconds, call onFinish to notify the parent component that the preloader is done

    return () => {
      clearTimeout(t1);   // cleanup timeouts if the component unmounts before they finish
      clearTimeout(t2); 
    };
  }, []);

  return (
    <div className={`preloader ${hide ? "hide" : ""}`}>
      {/* LOGO */}
      <img
        src={kaliLogo}
        className={`logo ${open ? "open" : ""}`}
        alt="kali"
      />

      {/* 2 L-KI */}
      <div className={`corner tl ${open ? "open" : ""}`} />
      <div className={`corner br ${open ? "open" : ""}`} />
    </div>
  );
}