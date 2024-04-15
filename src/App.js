/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [number, setNumber] = useState('');
  const [playing, setPlaying] = useState(false);
  
  const playAudio = (audioFile) => {
    new Audio(audioFile).play();
  };

  const panggil_nomor = (nomor) => {
    let totalWaktu = 0;

    const schedulePlay = (audioFile, delay) => {
      setTimeout(() => {
        playAudio('audio/' + audioFile + '.wav');
      }, totalWaktu);
      totalWaktu += delay;
    };

    const hundreds = Math.floor(nomor / 100);
    const remaining = nomor % 100;

    if (hundreds > 0) {
      schedulePlay(hundreds + '00', 1200);
    }

    if (remaining < 21 || (remaining % 100 < 21 && hundreds > 0)) {
      if (remaining > 0) {
        schedulePlay(remaining, 1000);
      }
    } else {
      const tens = Math.floor(remaining / 10);
      const units = remaining % 10;
      if (tens > 1) {
        schedulePlay(tens + '0', 1000);
      }
      if (units > 0) {
        schedulePlay(units, 1000);
      }
    }
  };

  useEffect(() => {
    if (playing) {
      if (number !== '') {
        panggil_nomor(parseInt(number));
        setPlaying(false);
      }
    }
  }, [playing, number]);

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  return (
    <div className='container'>
      <h1>Audio Player</h1>
      <input
        type="number"
        value={number}
        onChange={handleChange}
        placeholder="Enter a number"
      />
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default App;
