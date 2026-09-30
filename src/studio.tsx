import React from 'react';
import ReactDOM from 'react-dom/client';
import { AlphaxenFontStudio } from './components/editor/AlphaxenFontStudio';
import './index.css';

ReactDOM.createRoot(document.getElementById('studio-root')!).render(
  <React.StrictMode>
    <AlphaxenFontStudio onBackToFoundry={() => {
      if (window.opener) {
        window.close();
      } else {
        window.location.href = '/';
      }
    }} />
  </React.StrictMode>
);
