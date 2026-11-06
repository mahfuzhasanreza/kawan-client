import React, { useContext } from 'react'
import "./ScoreBoard.css"
import { AuthContext } from '../../../../providers/AuthProvider';

const ScoreBoard = ({ scores }) => {
  const { userDb } = useContext(AuthContext);

  if (userDb) {
    console.log(userDb.name, "USERDB");
  } else {
    console.log("userDb is null or undefined");
  }

  const { xScore, oScore } = scores;

  return (
    <div className='scoreboard'>

      <div className="player">
        <div className='x-score'>
          <h3>{userDb?.name ? `${userDb.name} (X)` : 'You (X)'}</h3>
        </div>
        <h1 className="player-score _x">{xScore}</h1>
      </div>

      <div className="player">
        <div className=' o-score'><h3>Machine (O)</h3></div>
        <h1 className="player-score _o">{oScore}</h1>
      </div>

    </div>
  )
}

export default ScoreBoard