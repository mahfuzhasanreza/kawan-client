import { useState, useRef } from "react";
import "./Board.css";
import ScoreBoard from "./ScoreBoard";

const Board = () => {
  const board = useRef(Array(9).fill(null));

  const [player, setPlayer] = useState(true); // `true` for Player, `false` for Machine
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [messages, setMessages] = useState(null);

  const WIN_CONDITIONS = useRef([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.current.length; i++) {
      const [x, y, z] = WIN_CONDITIONS.current[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
    return null;
  };

  const handleBoxClick = (boxIndex) => {
    if (board.current[boxIndex] !== null || gameOver) return;

    // Player move
    board.current[boxIndex] = "X";

    // Check for a winner or tie
    const winner = checkWinner(board.current);
    if (winner || !board.current.includes(null)) {
      endGame(winner);
      return;
    }

    // Machine's turn
    setPlayer(false);
    setTimeout(machineMove, 500); // Add delay for better UX
  };

  const machineMove = () => {
    const bestMove = findBestMove(board.current);
    if (bestMove !== null) {
      board.current[bestMove] = "O";

      // Check for a winner or tie
      const winner = checkWinner(board.current);
      if (winner || !board.current.includes(null)) {
        endGame(winner);
        return;
      }
      setPlayer(true);
    }
  };

  const findBestMove = (board) => {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O"; // Machine's move
        const score = minimax(board, 0, false);
        board[i] = null; // Undo move
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  };

  const minimax = (board, depth, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner === "X") return -10 + depth; // Player win
    if (winner === "O") return 10 - depth; // Machine win
    if (!board.includes(null)) return 0; // Tie

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "X";
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const endGame = (winner) => {
    if (winner) {
      setScores((prevScores) => ({
        ...prevScores,
        xScore: winner === "X" ? prevScores.xScore + 1 : prevScores.xScore,
        oScore: winner === "O" ? prevScores.oScore + 1 : prevScores.oScore,
      }));
      const won = winner === "X" ? "You" : "Machine";
      setMessages(`${won} Wins!`);
    } else {
      setMessages("It's a Tie!");
    }
    setGameOver(true);
  };

  const closeModal = () => {
    setPlayer(true);
    setGameOver(false);
    board.current = Array(9).fill(null);
    setMessages(null);
  };

  return (
    <div className="main">
      <div className="score">
        <ScoreBoard scores={scores} />
      </div>
      <div className="board">
        <div className="board-square">
          {board.current.map((value, index) => (
            <button
              key={index}
              className={`box ${value === null ? "default" : value === "X" ? "x" : "o"
                }`}
              onClick={() => player && handleBoxClick(index)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-box py-10 rounded-badge">
            <p className="py-4 text-3xl text-center font-semibold">{messages}</p>
            <div className="modal-action">
              <form className="justify-center mx-auto" method="dialog">
                <button onClick={closeModal} className="btn-close">Close</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
