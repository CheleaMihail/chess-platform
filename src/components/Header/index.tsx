import { Button, Stack } from "react-bootstrap";

import "./styles.scss";
import Settings from "../icons/Settings";
import Exit from "../icons/Exit";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      className="header container-fluid d-flex align-items-center"
      style={{ height: "60px" }}
    >
      <span className="flex-grow-1 text-center">You are in Guest Mode</span>
      <Stack direction="horizontal" className="buttons" gap={2}>
        <span className="verticalLine"></span>
        <Button className="px-2">
          <Link to="/user/settings">
            <Settings />
          </Link>
        </Button>
        <span className="verticalLine"></span>

        <Button className="px-2">
          <Link to="/login">
            <Exit /> Sign in
          </Link>
        </Button>
      </Stack>
    </header>
  );
}

export default Header;
