import React from 'react';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../../redux';
import { fetchSearchPlayers } from '../../redux/players/asyncActions';

const Players = () => {
  const dispatch = useAppDispatch();

  const handleSearchPlayers = () => {
    dispatch(fetchSearchPlayers('jo'));
  };

  return (
    <main className="container-fluid h-100 bg-transparent">
      <Button onClick={handleSearchPlayers}>Search Players</Button>
    </main>
  );
};

export default Players;
