import { useState } from "react";
import { Nav } from "react-bootstrap";
import CreateGamePanel from "../../components/CreateGamePanel";
import CreateBattlePanel from "../../components/CreateBattlePanel";

const CreateGame = () => {
  const [activeTab, setActiveTab] = useState("game");

  return (
    <div
      className="container mt-5 p-4"
      style={{
        maxWidth: "500px",
        background: "#1a1a1a",
        borderRadius: "10px",
        color: "var(--text-gray)",
      }}
    >
      <Nav variant="underline" className="bg-transparent w-100">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "game"}
            onClick={() => setActiveTab("game")}
          >
            Game
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "battle"}
            onClick={() => setActiveTab("battle")}
          >
            Battle
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "game" && <CreateGamePanel />}
      {activeTab === "battle" && <CreateBattlePanel />}
    </div>
  );
};

export default CreateGame;
