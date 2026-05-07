import { useState, useEffect } from 'react';

export function useFocusTracker(isRunning = true) {
  const [tabSwitches, setTabSwitches] = useState(() => parseInt(localStorage.getItem('tabSwitches')) || 0);
  const [distractionTime, setDistractionTime] = useState(() => parseFloat(localStorage.getItem('distractionTime')) || 0); // in minutes
  const [lastHiddenTime, setLastHiddenTime] = useState(null);

  useEffect(() => {
    localStorage.setItem('tabSwitches', tabSwitches);
  }, [tabSwitches]);

  useEffect(() => {
    localStorage.setItem('distractionTime', distractionTime);
  }, [distractionTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      // Only track tab switches and distraction time when timer is running
      if (!isRunning) return;

      if (document.hidden) {
        setLastHiddenTime(Date.now());
      } else {
        if (lastHiddenTime) {
          const timeAway = (Date.now() - lastHiddenTime) / 60000; // convert to minutes
          setDistractionTime(prev => prev + timeAway);
          setTabSwitches(prev => prev + 1);
          setLastHiddenTime(null);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [lastHiddenTime, isRunning]);

  return { tabSwitches, distractionTime };
}