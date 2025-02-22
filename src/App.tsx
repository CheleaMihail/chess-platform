import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Clubs from './pages/Clubs';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Register from './pages/Register';
import Players from './pages/Players';
import { useAppDispatch } from './redux';
import { fetchAuthRefresh } from './redux/auth/asyncActions';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthRefresh());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/players" element={<Players />} />
          <Route path="/user/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
