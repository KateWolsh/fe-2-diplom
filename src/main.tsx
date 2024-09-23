// main.tsx (или index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '../src/locale.ts';
import { locale } from 'primereact/api';
import { SearchProvider } from '../src/hooks/useSearchContext .tsx';
import { OrderProvider } from './hooks/useOrderContext.tsx';
import { TicketProvider } from './hooks/useTicketContext.tsx';
import { CoachProvider } from './hooks/useCoachContext.tsx';
import { OrderStepProvider } from './hooks/useOrderStepContext.tsx';

locale('ru');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OrderStepProvider>
      <OrderProvider>
        <SearchProvider>
          <TicketProvider>
            <CoachProvider>
              <App />
            </CoachProvider>
          </TicketProvider>
        </SearchProvider>
      </OrderProvider>
    </OrderStepProvider>
  </React.StrictMode>,
);
