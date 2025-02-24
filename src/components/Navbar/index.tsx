import { Nav, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./styles.scss";
import Clubs from "../icons/Clubs";
import {
  FaCampground,
  FaChess,
  FaChessQueen,
  FaCube,
  FaGraduationCap,
  FaMagnifyingGlass,
  FaMedal,
} from "react-icons/fa6";

function Navbar() {
  return (
    <Nav defaultActiveKey="/home" className="nav flex-column">
      <Nav.Link
        as={Link}
        to="/"
        className="nav_link d-flex align-items-center first"
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
      <Stack gap={1}>
        <Nav.Link
          as={Link}
          to="/game/create"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <FaChess /> Create game or battle
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/clubs"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <FaCampground /> Clubs
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <FaChessQueen /> Tournamnts
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <FaGraduationCap /> Puzzles
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/players"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <FaMagnifyingGlass /> Players
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/leaderboard"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <FaMedal /> Leaderboard
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/"
          className="nav_link d-flex gap-3 align-items-center"
        >
          <FaCube /> Play with computer
        </Nav.Link>
      </Stack>
    </Nav>
  );
}

export default Navbar;
