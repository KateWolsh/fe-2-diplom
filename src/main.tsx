// main.tsx (или index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '../src/locale.ts';
import { locale } from 'primereact/api';
import { SearchProvider } from '../src/hooks/useSearchContext .tsx';

locale('ru');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>,
);
