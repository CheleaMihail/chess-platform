import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Clubs from "./pages/Clubs";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
