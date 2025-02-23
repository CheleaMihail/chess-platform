import React from "react";
import { Card, Container, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FaMagnifyingGlass } from "react-icons/fa6";

const LeaderBoard = () => {
  const recentMembers = [
    { name: "Bohodir", joined: "a day ago" },
    { name: "Rithoosh", joined: "4 days ago" },
    { name: "Yonas", joined: "5 days ago" },
    { name: "RMchess04", joined: "6 days ago" },
    { name: "prefix", joined: "8 days ago" },
    { name: "Aomidi", joined: "10 days ago" },
    { name: "Yuusuf", joined: "10 days ago" },
    { name: "Oleggf", joined: "12 days ago" },
  ];

  return (
    <Container className="p-4">
      <div className="d-flex gap-3 mb-2">
        <FaMagnifyingGlass size={30} style={{ color: "var(--orange)" }} />
        <h2 className="m-0 p-0" style={{ color: "var(--text-gray)" }}>
          Search players
        </h2>
      </div>
      <InputGroup style={{ maxWidth: "300px" }}>
        <Form.Control
          placeholder="Search player"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Card className="p-3 bg-transparent">
        <div className="section py-3">
          <h5 className="infoSectionName mb-3">All players</h5>
          <ListGroup variant="flush">
            {recentMembers.map((member, index) => (
              <ListGroup.Item
                key={index}
                className="bg-transparent border-bottom border-top color-secondary px-0 d-flex justify-content-between"
                style={{ color: "var(--text-gray)" }}
              >
                <span>{member.name}</span>
                <small className="text-secondary">{member.joined}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Card>
    </Container>
  );
};

export default LeaderBoard;
