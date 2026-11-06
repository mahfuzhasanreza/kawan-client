import './index.css';
import App from './App';
import { Helmet } from 'react-helmet-async';

const TicTacGame = () => {
  return (
    <div className='bg-gradient-to-br from-black to-purple-700'>
      <Helmet>
        <title>TicTacToe | Kawan</title>
      </Helmet>
      <App />
    </div>
  );
}

export default TicTacGame;