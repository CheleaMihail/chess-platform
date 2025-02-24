import { Card, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux";
import { fetchSearchPlayers } from "../../redux/players/asyncActions";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaCampground } from "react-icons/fa6";

import "./styles.scss";

interface Club {
  id: number;
  name: string;
  description?: string;
  members: number;
}

const clubs: Club[] = [
  { id: 1, name: "SpinnerCoin", members: 376 },
  {
    id: 2,
    name: "Chess Lovers",
    description: "First official Chessio club! Join to play, learn, and earn!",
    members: 229,
  },
  {
    id: 3,
    name: "Chess Academy Community",
    description:
      "Ukraine's #1 Chess Community: 2600+ members, top tournaments, and elite players. Join us to grow, compete, and connect with champions. For those who strive for excellence in every move!",
    members: 222,
  },
];

const Clubs = () => {
  const dispatch = useAppDispatch();

  const handleSearchPlayers = () => {
    dispatch(fetchSearchPlayers("jo"));
  };
  return (
    <main className="clubs container bg-transparent h-flex gap-3 p-4">
      <Stack direction="horizontal" gap={3} className="clubsHeader">
        <FaCampground size={30} color="var(--orange)" />
        <div className="title">Chess Clubs</div>
      </Stack>
      {/* <Button onClick={handleSearchPlayers}>Search Players</Button> */}
      <div className="tabTitle">All Clubs</div>
      <InputGroup style={{ maxWidth: "300px" }}>
        <Form.Control
          placeholder="Search club"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <div className="subtitle">Top clubs:</div>
      <div className="px-0">
        {clubs.map((club) => (
          <Link to={`/club/${club.id}`} key={club.id}>
            <Card
              key={club.id}
              className="mb-3 bg-dark border-0"
              style={{ color: "var(--text-gray)" }}
            >
              <Card.Body>
                <Card.Title className="fs-4 mb-2">{club.name}</Card.Title>
                {club.description && (
                  <div className="description mb-2">
                    <Card.Text className="fst-italic border-left">
                      {club.description}
                    </Card.Text>
                  </div>
                )}
                <div className="d-flex align-items-center gap-1">
                  <FaPeopleGroup size={20} />
                  <span>{club.members}</span>
                  <span>members</span>
                </div>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Clubs;
