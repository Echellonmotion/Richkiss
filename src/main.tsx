import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely intercept potential circular references or FirebaseErrors to hinder global serialisation crashes
window.addEventListener('error', (event) => {
  if (event.error) {
    const error = event.error;
    if (
      error.name === 'FirebaseError' || 
      error.code || 
      'firestore' in error || 
      (typeof error.message === 'string' && error.message.toLowerCase().includes('circular'))
    ) {
      console.warn('Intercepted Firebase/Circular reference error safely:', error.message || String(error));
      event.preventDefault(); // Stop default event propagation from breaking the parent frame serializer
    }
  }
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  if (reason) {
    if (
      reason.name === 'FirebaseError' || 
      reason.code || 
      'firestore' in reason || 
      (typeof reason.message === 'string' && reason.message.toLowerCase().includes('circular'))
    ) {
      console.warn('Intercepted Unhandled Promise Rejection containing Firebase/Circular reference error safely:', reason.message || String(reason));
      event.preventDefault(); // Stop default event propagation from breaking the parent frame serializer
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
