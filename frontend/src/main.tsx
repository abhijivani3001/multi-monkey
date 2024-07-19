import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { IsTypingProvider } from './context/IsTyping/IsTypingProvider.tsx';
import { TypingModeProvider } from './context/TypingMode/TypingModeProvider.tsx';
import { AuthProvider } from './context/Auth/AuthProvider.tsx';
import { Toaster } from 'react-hot-toast';
import { LoadingProvider } from './context/Loading/LoadingProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LoadingProvider>
      <AuthProvider>
        <TypingModeProvider>
          <IsTypingProvider>
            <Toaster
              toastOptions={{
                className: 'font-sans',
              }}
            />
            <App />
          </IsTypingProvider>
        </TypingModeProvider>
      </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>
);
