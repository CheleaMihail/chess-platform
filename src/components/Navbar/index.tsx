import { Nav, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./styles.scss";
import Clubs from "../icons/Clubs";

function Navbar() {
  return (
    <Nav defaultActiveKey="/home" className="nav flex-column h-100">
      <Nav.Link as={Link} to="/" className="nav_link d-flex align-items-center">
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
      <Stack gap={1}>
        <Nav.Link
          as={Link}
          to="/game/create"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <Clubs /> Create game or battle
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/clubs"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <Clubs /> Clubs
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <Clubs /> Tournamnts
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <Clubs /> Puzzles
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/players"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <Clubs /> Players
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/clubs"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <Clubs /> Leaderboard
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <Clubs /> Play with computer
        </Nav.Link>
      </Stack>
    </Nav>
  );
}

export default Navbar;
