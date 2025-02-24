import { Button, Stack } from "react-bootstrap";

import "./styles.scss";
import Settings from "../icons/Settings";
import Exit from "../icons/Exit";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux";
import { selectAuthStatus } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { logOut } from "../../redux/auth/slice";

function Header() {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuthStatus);

  return (
    <header
      className="header container-fluid d-flex align-items-center"
      style={{ height: "60px" }}
    >
      <span className="flex-grow-1 text-center">
        {!auth.id && "You are in Guest Mode"}
      </span>
      <Stack direction="horizontal" className="buttons" gap={2}>
        <span className="verticalLine"></span>
        <Button className="px-2">
          <Settings />
        </Button>
        <span className="verticalLine"></span>

        {auth.id ? (
          <Button className="px-2" onClick={() => dispatch(logOut())}>
            Log out
          </Button>
        ) : (
          <Button className="px-2">
            <Link to="/login">
              <Exit /> Sign in
            </Link>
          </Button>
        )}
      </Stack>
    </header>
  );
}

export default Header;
