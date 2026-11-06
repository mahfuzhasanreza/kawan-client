import { Helmet } from 'react-helmet-async';
import App from './App';

const FifteenPuzzle = () => {
  return (
    <div>
      <Helmet>
        <title>15Puzzle | Kawan</title>
      </Helmet>
      <App />
    </div>
  );
}

export default FifteenPuzzle;