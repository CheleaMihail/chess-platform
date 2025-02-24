import React from "react";
import { Card, Container, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FaMagnifyingGlass, FaMedal } from "react-icons/fa6";

import "./styles.scss";

const LeaderBoard = () => {
  const listPlayers = [
    { id: 1, name: "Bohodir", rating: 5000 },
    { id: 2, name: "Rithoosh", rating: 4090 },
    { id: 3, name: "Yonas", rating: 4080 },
    { id: 4, name: "RMchess04", rating: 4070 },
    { id: 5, name: "prefix", rating: 4060 },
    { id: 6, name: "Aomidi", rating: 4050 },
    { id: 7, name: "Yuusuf", rating: 4040 },
    { id: 8, name: "Oleggf", rating: 4030 },
  ];

  return (
    <Container className="p-4">
      <div className="leaderHeader">
        <FaMagnifyingGlass size={30} style={{ color: "var(--orange)" }} />
        Search players
      </div>
      <InputGroup style={{ maxWidth: "300px" }}>
        <Form.Control
          placeholder="Search player"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <div className="leaderHeader mt-3">
        <FaMedal size={30} style={{ color: "var(--orange)" }} />
        Leaderboard
      </div>
      <div className="d-flex gap-3">
        <Card className="p-3 bg-transparent flex-grow-1">
          <div className="section py-3">
            <h5 className="infoSectionName mb-3">Blitz</h5>
            <ListGroup variant="flush">
              {listPlayers.map((member, index) => (
                <ListGroup.Item
                  key={index}
                  className="bg-transparent border-bottom border-top color-secondary px-0 d-flex justify-content-between"
                  style={{ color: "var(--text-gray)" }}
                >
                  <span>{member.name}</span>
                  <small className="text-secondary">{member.rating}</small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Card>
        <Card className="p-3 bg-transparent flex-grow-1">
          <div className="section py-3">
            <h5 className="infoSectionName mb-3">Classic</h5>
            <ListGroup variant="flush">
              {listPlayers.map((member, index) => (
                <ListGroup.Item
                  key={index}
                  className="bg-transparent border-bottom border-top color-secondary px-0 d-flex justify-content-between"
                  style={{ color: "var(--text-gray)" }}
                >
                  <span>{member.name}</span>
                  <small className="text-secondary">{member.rating}</small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default LeaderBoard;
