import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoDotFill } from 'react-icons/go';
import { useAppDispatch } from '../../redux';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../redux/auth/selectors';
import { sendMove } from '../../services/rooms';
import ChessBoard from '../../components/Chessboard';
import { Col, Row, Stack } from 'react-bootstrap';
import { FaLandmark } from 'react-icons/fa6';

const ChessGameScreen = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuthStatus);

  const handleMakeMove = async (fen: string) => {
    const roomId = localStorage.getItem('roomId');
    if (roomId) sendMove(fen, roomId);
  };

  return (
    <div className="container-fluid text-white border-3 border-success">
      <Row className="md-9">
        <Col className="md-6 p-3">
          <div className="d-flex justify-content-between">
            <div style={{ lineHeight: '42px' }}>chessio_level_1 • 1650 </div>
            <div className="fs-3">03:00</div>
          </div>
          <ChessBoard boardOrientation={'white'} onMakeMove={handleMakeMove} fen={''} />
          <div className="d-flex justify-content-between">
            <div style={{ lineHeight: '42px' }}>me • 1650 </div>
            <div className="fs-3">03:00</div>
          </div>
        </Col>
        <Col className="md-3 p-3 v-flex gap-3">
          <div className="bg-dark p-3">
            <div className="d-flex justify-content-between align-content-center">
              <div className="d-flex gap-2 h-100 align-content-center">
                <FaLandmark size={20} />
                <span className="text-primary fw-bold">Classic</span>
                <div className="vr" style={{ width: '1.5px' }}></div>
                <span className="text-primary fw-bold">Frendly</span>
              </div>
              <div className="h-100">60+60</div>
            </div>
            <div className="text-center">Game in progress</div>
          </div>
          <h6 className="mt-3">Moves History</h6>
          <div className="bg-dark">
            <ul className="list-unstyled px-2" style={{ fontSize: '12px' }}>
              <li className="bg-transparent text-white my-1 d-flex justify-content-between align-content-center border-1 border-bottom">
                <div className="v-flex align-content-center">2</div>
                <div className="v-flex align-content-center">d4</div>
                <div className="v-flex align-content-center">b5</div>
                <div className="v-flex">
                  <div className="d-flex gap-2 justify-content-center align-content-center">
                    <div>
                      <GoDotFill size={10} className="text-light" />
                    </div>{' '}
                    0.97s
                  </div>
                  <div className="d-flex gap-2 justify-content-center align-content-center">
                    <div>
                      <GoDotFill size={10} style={{ color: 'black' }} />
                    </div>
                    0.91s
                  </div>
                </div>
              </li>
              <li className="bg-transparent text-white my-1 d-flex justify-content-between align-content-center border-1 border-bottom">
                <div className="v-flex align-content-center">2</div>
                <div className="v-flex align-content-center">d4</div>
                <div className="v-flex align-content-center">b5</div>
                <div className="v-flex">
                  <div className="d-flex gap-2 justify-content-center align-content-center">
                    <div>
                      <GoDotFill size={10} className="text-light" />
                    </div>{' '}
                    0.97s
                  </div>
                  <div className="d-flex gap-2 justify-content-center align-content-center">
                    <div>
                      <GoDotFill size={10} style={{ color: 'black' }} />
                    </div>
                    0.91s
                  </div>
                </div>
              </li>
              {/* {moves.map((m, index) => (
              <li key={index} className="bg-secondary text-white p-1 rounded">
                {index + 1}. {m.move}
              </li>
            ))} */}
            </ul>
          </div>
        </Col>
      </Row>
      <div>
        <button className="btn btn-primary">New Game</button>
        <button className="btn btn-primary">Cancel Game</button>
      </div>
    </div>
  );
};

export default ChessGameScreen;
