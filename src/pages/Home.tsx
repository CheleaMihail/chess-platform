import React from "react";
import ChessBoard from "../components/Chessboard";

const Home = () => {
  return (
    <main className="container-fluid h-100 bg-transparent">
      <h1 className="text-center my-4">Chess Game</h1>
      <ChessBoard />
    </main>
  );
};

export default Home;
