import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RingProgress = ({ label, percentage, color }) => {
  return (
    <div className="ring-progress" style={{ display: 'inline-block', margin: '10px' }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={10}
        styles={{
          path: { stroke: color },
          trail: { stroke: '#ddd' },
          text: { fill: '#000', fontSize: '16px' },
        }}
      />
      <div className="label" style={{ textAlign: 'center', marginTop: '10px' }}>
        {label}
      </div>
    </div>
  );
};

const App= () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <RingProgress label="Proteins" percentage={75} color="green" />
      <RingProgress label="Carbons" percentage={50} color="blue" />
      <RingProgress label="Fats" percentage={60} color="red" />
    </div>
  );
};

export default App;
