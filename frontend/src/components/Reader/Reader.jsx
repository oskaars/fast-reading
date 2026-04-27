import React, { useState, useEffect } from 'react';
import WordDisplay from './WordDisplay';
import './Reader.css';

function Reader() {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(300);
  const [status, setStatus] = useState('idle'); 
  
  const [isPreparing, setIsPreparing] = useState(false); 

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus('loading');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.words.length === 0) {
          alert("Plik jest pusty!");
          setStatus('idle');
          return;
      }
      
      setWords(data.words);
      setCurrentIndex(0);
      setStatus('reading');
    } catch (error) {
      console.error("Błąd serwera:", error);
      setStatus('idle');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    setIsPreparing(true); 
    setTimeout(() => {
      setIsPreparing(false);
      setIsPlaying(true);
    }, 1500);
  };

  useEffect(() => {
    let intervalId;
    if (isPlaying && currentIndex < words.length && !isPreparing) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 60000 / wpm);
    } else if (currentIndex >= words.length && words.length > 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, wpm, currentIndex, words, isPreparing]);

  const isFinished = currentIndex >= words.length && words.length > 0;

  if (status === 'idle' || status === 'loading') {
    return (
      <div className="reader-wrapper">
        <label className="upload-zone" style={{ border: '2px dashed #444', padding: '60px', borderRadius: '16px', cursor: 'pointer', backgroundColor: '#1a1e24' }}>
          <span style={{ color: '#aaa', fontSize: '1.2rem', fontWeight: 'bold' }}>
            {status === 'loading' ? 'processing' : 'wgraj plik'}
          </span>
          <input type="file" style={{ display: 'none' }} onChange={handleFileUpload} accept=".txt" />
        </label>
      </div>
    );
  }

  const displayWord = isPreparing ? "ready?" : (words[currentIndex] || "");

  return (
    <div className="reader-wrapper">
      <div className="reading-area">
        
        {isFinished ? (
          <div className="finish-screen">
            <h2 className="finish-title">Koniec tekstu </h2>
            <div className="controls-container">
              <button onClick={handleRestart} className="btn btn-play">
                Jeszcze raz 
              </button>
              <button onClick={() => { setStatus('idle'); setWords([]); }} className="btn btn-reset">
                Nowy plik 
              </button>
            </div>
          </div>
        ) : (
          <>
            <WordDisplay word={displayWord} />
            
            <div className="controls-container">
              <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                className={`btn ${isPlaying ? 'btn-pause' : 'btn-play'}`}
                disabled={isPreparing}
                style={{ opacity: isPreparing ? 0.5 : 1, cursor: isPreparing ? 'not-allowed' : 'pointer' }}
              >
                {isPlaying ? 'PAUZA ' : 'START '}
              </button>
              
              <button onClick={() => { setStatus('idle'); setWords([]); }} className="btn btn-reset">
                NOWY PLIK 
              </button>
            </div>

            <div className="slider-container">
              <div className="slider-header">
                <span>Prędkość czytania</span>
                <span className="slider-value">{wpm} WPM</span>
              </div>
              <input 
                type="range" min="100" max="1000" step="50" 
                value={wpm} 
                onChange={(e) => setWpm(Number(e.target.value))} 
                className="slider-input" 
              />
              <div className="stats-bar">
                POSTĘP: {currentIndex} / {words.length} SŁÓW
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Reader;