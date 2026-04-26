import React, { useState } from 'react'; // 1. Importujemy narzędzie do pamięci
import WordDisplay from './components/Reader/WordDisplay';

const wordsArray = ["Jedno", "Słowo", "Deugie", "Slowo", "ale", "jaja", "hej."];

function App() {
// setCurrentIndex odsiweza ekran
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    if (currentIndex < wordsArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>      
      <WordDisplay word={wordsArray[currentIndex]} />

      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={handleNextClick}
          style={{ padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          Następne Słowo 
        </button>
      </div>
    </div>
  );
}

export default App;