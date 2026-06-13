import { Outlet, Link } from "react-router-dom";
import Background from "./assets/bg";

export default function Layout() {
  return (
    <div className="app-container">
      <Background />

      <nav>
        <Link to="/">Home</Link>
        <Link to="/cybersecurity">Cybersecurity</Link>
        <Link to="/ai-python">AI & Python</Link>
        <Link to="/fullstack">Fullstack</Link>
      </nav>

      <Outlet />
    </div>
  );
}