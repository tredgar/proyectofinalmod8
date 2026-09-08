import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px 20px",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link
        to="/"
        style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
      >
        🛒 Tienda (Cliente)
      </Link>
      <Link
        to="/dashboard"
        style={{ color: "#ffc107", textDecoration: "none", fontWeight: "bold" }}
      >
        ⚙️ Panel de Administración
      </Link>
    </nav>
  );
}

export default Navbar;
