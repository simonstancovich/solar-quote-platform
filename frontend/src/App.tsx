import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import Landing from "./features/landing/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "12px 24px",
          borderBottom: "1px solid #ddd",
          background: "#fff",
        }}
      >
        <Link to="/" style={{ marginRight: 12 }}>
          Quote
        </Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
