import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./styles.scss";

function Navbar() {
  return (
    <Nav defaultActiveKey="/home" className="nav flex-column h-100">
      <Nav.Link
        as={Link}
        to="/"
        className="d-flex align-items-center"
        style={{ height: "60px" }}
      >
        <img
          src={require("../../assets/images/horseLogo.png")}
          className="logo rounded d-block"
          alt="logo"
        />
        <div className="domain">
          <span className="green">Chess</span>
          <span>.org</span>
        </div>
      </Nav.Link>
      <div className="divider"></div>
      <Nav.Link as={Link} to="/clubs">
        Clubs
      </Nav.Link>
      <Nav.Link as={Link} to="/2">
        Link
      </Nav.Link>
      <Nav.Link as={Link} to="/3" disabled>
        Disabled
      </Nav.Link>
    </Nav>
  );
}

export default Navbar;
