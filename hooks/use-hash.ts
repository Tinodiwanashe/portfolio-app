// useHash.js
import { useState, useEffect } from 'react';

// This custom hook listens for changes in the URL’s hash and updates the component state accordingly. useHash custom hook to manage the hash changes:

export const useHash = () => {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return hash;
};