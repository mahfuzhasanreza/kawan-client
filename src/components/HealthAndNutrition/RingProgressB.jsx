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

const App= ({foodData}) => {

  // console.log(foodData["proteins"], "PPPPPOOPPP");

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <RingProgress label="Proteins" percentage={`${(foodData["proteins"]*100.0).toFixed(1)}`} color="green" />
      <RingProgress label="Carbohydrates" percentage={`${(foodData["carbohydrates"]*100.0).toFixed(1)}`} color="blue" />
      <RingProgress label="Fats" percentage={`${(foodData["fats"]*100.0).toFixed(1)}`} color="red" />
    </div>
  );
};

export default App;
