import {
  Row,
  Col,
  Card,
  Nav,
  ListGroup,
  InputGroup,
  Form,
} from "react-bootstrap";
import { FaUsers, FaCampground, FaRegCalendarAlt } from "react-icons/fa";

import "./styles.scss";
import { useState } from "react";

interface IClub {
  id: number;
  name: string;
  description?: string;
  info?: string;
  members: number;
  created: string;
}

const club: IClub = {
  id: 3,
  name: "Chess Academy Community",
  description:
    "Ukraine's #1 Chess Community: 2600+ members, top tournaments, and elite players. Join us to grow, compete, and connect with champions. For those who strive for excellence in every move!",
  members: 222,
  created: "October 10 2024",
};

const Club = () => {
  const [activeTab, setActiveTab] = useState("info");
  const admins = ["Arzion", "Viktor", "Alex007"];
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
    <main className="container p-5 overflow-y-hidden">
      <Card className="bg-transparent text-light p-4">
        {/* Header */}
        <Row className="mb-3">
          <Col>
            <h3 className="d-flex align-items-center">
              <FaCampground
                className="me-2"
                style={{ color: "var(--orange)" }}
              />
              {club.name}
            </h3>
            <div className="description mb-2">
              <Card.Text className="fst-italic border-left">
                {club.description}
              </Card.Text>
            </div>
          </Col>
        </Row>

        {/* Navigation Tabs */}
        <Nav variant="underline" className="bg-transparent w-100">
          <Nav.Item>
            <Nav.Link
              active={activeTab === "info"}
              onClick={() => setActiveTab("info")}
            >
              INFO
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === "players"}
              onClick={() => setActiveTab("players")}
            >
              <FaUsers className="me-1" /> PLAYERS ({club.members})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === "events"}
              onClick={() => setActiveTab("events")}
            >
              <FaRegCalendarAlt className="me-1" /> EVENTS
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Row className="mt-4">
          <Col md={12}>
            {activeTab === "info" && (
              <Row>
                <Col md={9}>
                  {club.info && (
                    <>
                      <div className="infoSectionName">Club description</div>
                      <Card className="p-3 bg-dark">
                        <h4 style={{ color: "var(--orange)" }}>{club.name}</h4>
                        <div>{club.description}</div>
                      </Card>
                    </>
                  )}
                </Col>

                <Col md={3} className="d-flex flex-column gap-2">
                  <div className="section">
                    <h5 className="infoSectionName">Club created</h5>
                    <span style={{ color: "var(--text-gray)" }}>
                      {club.created}
                    </span>
                  </div>
                  <div className="section">
                    <h5 className="infoSectionName">Administrators</h5>
                    <ListGroup variant="flush">
                      {admins.map((admin, index) => (
                        <ListGroup.Item
                          key={index}
                          className="bg-transparent border-0 p-0"
                          style={{ color: "var(--text-gray)" }}
                        >
                          {admin}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                  <div className="section">
                    <h5 className="infoSectionName">Recently joined</h5>
                    <ListGroup variant="flush">
                      {recentMembers.map((member, index) => (
                        <ListGroup.Item
                          key={index}
                          className="bg-transparent border-0 p-0 d-flex gap-3"
                          style={{ color: "var(--text-gray)" }}
                        >
                          <span>{member.name}</span>
                          <small className="text-secondary">
                            {member.joined}
                          </small>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </Col>
              </Row>
            )}

            {activeTab === "players" && (
              <>
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
                          <small className="text-secondary">
                            {member.joined}
                          </small>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "events" && (
              <Card className="p-3 bg-secondary">
                <h5 className="fw-bold">Upcoming Events</h5>
                <p className="fst-italic text-warning">
                  No events scheduled yet.
                </p>
              </Card>
            )}
          </Col>
        </Row>
      </Card>
    </main>
  );
};

export default Club;
