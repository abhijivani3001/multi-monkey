import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { TypingModeProvider } from './context/TypingModeContext.tsx';
import { IsTypingProvider } from './context/IsTypingContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TypingModeProvider>
      <IsTypingProvider>
        <App />
      </IsTypingProvider>
    </TypingModeProvider>
  </BrowserRouter>
);
