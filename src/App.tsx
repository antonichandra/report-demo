import React from 'react';
import Home from "./ui/home"
import { CookiesProvider } from "react-cookie";
import './App.css';

function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <header className="App-header">
          <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap`} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

          <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet" />
          <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>

          <Home />
        </header>
      </div>
    </CookiesProvider>
  );
}

export default App;
