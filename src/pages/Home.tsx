import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux";
import { useSelector } from "react-redux";
import { connectToRoom, disconnectRoom } from "../services/rooms";
import { Button, Col, Nav, Row, Spinner } from "react-bootstrap";
import { selectAuthStatus } from "../redux/auth/selectors";
import { FaDove, FaRocket } from "react-icons/fa6";
import { GiJetFighter } from "react-icons/gi";
import { EFetchStatus, EGameType } from "../types/enums";
import { IGame, setGame, setMove } from "../redux/rooms/slice";
import { selectGame } from "../redux/rooms/selectors";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("quick");
  // const { messages, isConnected, color, fen } = useSelector(selectRooms);
  const auth = useSelector(selectAuthStatus);
  const game = useSelector(selectGame);
  const navigate = useNavigate();

  const handleQuickConnect = (type: EGameType) => {
    if (auth.id)
      connectToRoom({
        op: "search",
        type,
        userId: auth.id,
        onSetGame: (game: IGame) => dispatch(setGame(game)),
      });
  };

  useEffect(() => {
    if (game?.opponentId) {
      navigate("/game/" + game.roomId);
    }
  }, [game]);

  useEffect(() => {
    dispatch(setGame(undefined));
    return () => disconnectRoom();
  }, []);

  return (
    <main className="container-fluid h-100 bg-transparent">
      <h1 className="text-center my-4 text-white">Chess Game</h1>
      {/* Navigation Tabs */}
      <Nav variant="underline" className="bg-transparent w-100">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "quick"}
            onClick={() => setActiveTab("quick")}
          >
            Quick start
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "lobby"}
            onClick={() => setActiveTab("lobby")}
          >
            Lobby
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "quick" && (
        <Row className="md-9 mt-3">
          <Col className="md-3 mb-2">
            <Button
              className="bg-dark text-light w-100 position-relative border-1"
              style={{ borderColor: "var(--light-gray)" }}
              onClick={() => handleQuickConnect(EGameType.bullet)}
            >
              {game?.type === EGameType.bullet && (
                <div className="position-absolute top-0 bottom-0 d-flex align-items-center justify-content-center">
                  <Spinner />
                </div>
              )}
              <h2>1 min</h2>
              <div className="d-flex gap-3 justify-content-center">
                <FaRocket size={20} className="text-success" />
                <span style={{ color: "var(--text-gray)" }}>Bullet</span>
              </div>
            </Button>
          </Col>
          <Col className="md-3 mb-2">
            <Button
              className="bg-dark text-light w-100 position-relative border-1"
              style={{ borderColor: "var(--light-gray)" }}
              onClick={() => handleQuickConnect(EGameType.blitz)}
            >
              {game?.type === EGameType.blitz && (
                <div className="position-absolute top-0 bottom-0 d-flex align-items-center justify-content-center">
                  <Spinner />
                </div>
              )}

              <h2>3+2s</h2>
              <div className="d-flex gap-3 justify-content-center">
                <GiJetFighter size={20} className="text-success" />
                <span style={{ color: "var(--text-gray)" }}>Blitz</span>
              </div>
            </Button>
          </Col>
          <Col className="md-3 mb-2">
            <Button
              className="bg-dark text-light w-100 position-relative border-1"
              style={{ borderColor: "var(--light-gray)" }}
              onClick={() => handleQuickConnect(EGameType.rapid)}
            >
              {game?.type === EGameType.rapid && (
                <div className="position-absolute top-0 bottom-0 d-flex align-items-center justify-content-center">
                  <Spinner />
                </div>
              )}
              <h2>10 min</h2>
              <div className="d-flex gap-3 justify-content-center">
                <FaDove size={20} className="text-success" />
                <span style={{ color: "var(--text-gray)" }}>Rapid</span>
              </div>
            </Button>
          </Col>
        </Row>
      )}
      {activeTab === "lobby" && <Row>Lobby</Row>}
    </main>
  );
};

export default Home;
