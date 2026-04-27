// plik: src/App.jsx (lub .tsx)
import React from 'react';
import Reader from './components/Reader/Reader'; // Importujemy nasz nowy komponent!

function App() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '40px', color: '#fff' }}>Fast Reading App</h1>
      
      <Reader />
      
    </div>
  );
}

export default App;