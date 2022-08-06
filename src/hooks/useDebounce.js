import { useState, useEffect } from 'react';

const useDebounce = (value, delay = 1500) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);

    // cancel timeout if value/delay changes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;