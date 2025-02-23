import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux";
import { useSelector } from "react-redux";
import { selectRooms } from "../redux/rooms/selectors";
import { connectToRoom, disconnectRoom, sendMove } from "../services/rooms";
import {
  addMessage,
  setColor,
  setConnected,
  setFEN,
  setMessages,
} from "../redux/rooms/slice";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { selectAuthStatus } from "../redux/auth/selectors";
import { FaDove, FaRocket } from "react-icons/fa6";
import { GiJetFighter } from "react-icons/gi";

const Home = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("quick");
  const { messages, isConnected, color, fen } = useSelector(selectRooms);
  const auth = useSelector(selectAuthStatus);

  const handleMakeMove = async (fen: string) => {
    const roomId = localStorage.getItem("roomId");
    if (roomId) sendMove(fen, roomId);
  };

  useEffect(() => {
    if (auth.id || auth.guestId) {
      const roomId = localStorage.getItem("roomId");

      connectToRoom({
        roomId: roomId || undefined,
        user_id: (auth.id || auth.guestId) + "",
        onMessage: (message) => dispatch(addMessage(message)),
        onStatusChange: (status) => dispatch(setConnected(status)),
        onGetColor: (color) => dispatch(setColor(color)),
        onChangeFEN: (fen: string) => {
          dispatch(setFEN(fen));
        },
      });

      return () => {
        disconnectRoom();
      };
    }
  }, [dispatch, auth.id, auth.guestId]);

  const handleSendMessage = () => {};

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
          <Col className="md-3">
            <Button className="bg-dark text-light w-100">
              <h2>1 min</h2>
              <div className="d-flex gap-3 justify-content-center">
                <FaRocket size={20} className="text-success" />
                <span style={{ color: "var(--text-gray)" }}>Bullet</span>
              </div>
            </Button>
          </Col>
          <Col className="md-3">
            <Button className="bg-dark text-light w-100">
              <h2>3+2s</h2>
              <div className="d-flex gap-3 justify-content-center">
                <GiJetFighter size={20} className="text-success" />
                <span style={{ color: "var(--text-gray)" }}>Blitz</span>
              </div>
            </Button>
          </Col>
          <Col className="md-3">
            <Button className="bg-dark text-light w-100">
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
