import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 1. Globally patch JSON.stringify to handle circular references safely
const originalStringify = JSON.stringify;
JSON.stringify = function (value: any, replacer?: any, space?: any): string {
  const seen = new WeakSet();
  function safeReplacer(key: string, val: any) {
    if (val !== null && typeof val === 'object') {
      if (seen.has(val)) {
        return '[Circular]';
      }
      seen.add(val);
    }
    if (typeof replacer === 'function') {
      return replacer(key, val);
    }
    return val;
  }
  try {
    return originalStringify(value, replacer ? (key, val) => {
      if (val !== null && typeof val === 'object') {
        if (seen.has(val)) return '[Circular]';
        seen.add(val);
      }
      if (Array.isArray(replacer)) {
        if (key === "" || replacer.indexOf(key) !== -1) return val;
        return undefined;
      }
      return replacer(key, val);
    } : safeReplacer, space);
  } catch (err) {
    try {
      const clean = (obj: any, cache = new WeakSet()): any => {
        if (obj === null || typeof obj !== 'object') return obj;
        if (cache.has(obj)) return '[Circular]';
        cache.add(obj);
        if (Array.isArray(obj)) {
          return obj.map(x => clean(x, cache));
        }
        const res: any = {};
        for (const k in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, k)) {
            try {
              res[k] = clean(obj[k], cache);
            } catch {
              res[k] = '[Error]';
            }
          }
        }
        return res;
      };
      return originalStringify(clean(value), undefined, space);
    } catch {
      return '"[Unstringifiable Circular Object]"';
    }
  }
};

// 2. Intercept unhandled error exceptions on capture phase and sterilize circular structures
window.addEventListener('error', (event) => {
  if (event.error) {
    const error = event.error;
    try {
      // Test if error is stringifiable
      originalStringify(error);
    } catch (e) {
      console.warn('Intercepted circular reference in unhandled error. Sterilizing to prevent parent frame serialization crash.');
      
      // Redefine event.error with a sterilized non-circular version
      Object.defineProperty(event, 'error', {
        value: {
          message: error.message || String(error),
          name: error.name || 'Error',
          stack: error.stack || '',
          code: error.code || null,
          isSterilized: true
        },
        configurable: true,
        enumerable: true
      });
    }
  }
}, true); // capture-phase is crucial to run prioritize before external platform hooks

// 3. Intercept unhandled promise rejections on capture phase and sterilize circular structures
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason) {
    const reason = event.reason;
    try {
      // Test if reason is stringifiable
      originalStringify(reason);
    } catch (e) {
      console.warn('Intercepted circular reference in unhandled rejection. Sterilizing to prevent parent frame serialization crash.');
      
      // Redefine event.reason with a sterilized non-circular version
      Object.defineProperty(event, 'reason', {
        value: {
          message: reason.message || String(reason),
          name: reason.name || 'PromiseRejection',
          stack: reason.stack || '',
          code: reason.code || null,
          isSterilized: true
        },
        configurable: true,
        enumerable: true
      });
    }
  }
}, true); // capture-phase is crucial to run prioritize before external platform hooks

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
