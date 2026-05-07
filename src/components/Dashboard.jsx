import { useState, useEffect } from 'react';
import { useFocusTracker } from '../hooks/useFocusTracker';
import StatsCard from './StatsCard';
import Timer from './Timer';
import FocusChart from './FocusChart';
import Goal from './Goal';
import Streak from './Streak';
import History from './History';
import Insights from './Insights';

function Dashboard() {
  const [studyTime, setStudyTime] = useState(() => parseInt(localStorage.getItem('studyTime')) || 0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { tabSwitches, distractionTime } = useFocusTracker(isTimerRunning);

  const focusScore = Math.max(0, 100 - (distractionTime * 0.5) - (tabSwitches * 2));

  // Save daily data periodically and when day changes
  useEffect(() => {
    const saveDailyData = () => {
      const today = new Date().toISOString().split('T')[0];
      const dailyData = {
        studyTime,
        distractionTime,
        focusScore,
        tabSwitches,
        date: today
      };
      localStorage.setItem(`daily-${today}`, JSON.stringify(dailyData));
    };

    // Save data every minute when timer is running, or immediately when timer stops
    const interval = setInterval(() => {
      if (isTimerRunning || studyTime > 0) {
        saveDailyData();
      }
    }, 60000); // Save every minute

    // Also save when component unmounts or timer state changes
    return () => {
      clearInterval(interval);
      saveDailyData();
    };
  }, [isTimerRunning, studyTime, distractionTime, focusScore, tabSwitches]);

  // Focus alerts - less frequent to avoid annoyance
  useEffect(() => {
    if (tabSwitches > 0 && tabSwitches % 10 === 0 && tabSwitches <= 50) {
      alert(`You've switched tabs ${tabSwitches} times. Try to stay focused!`);
    }
    if (distractionTime > 0 && distractionTime % 10 === 0 && distractionTime <= 50) {
      alert(`You've been distracted for ${distractionTime.toFixed(1)} minutes. Consider taking a short break.`);
    }
  }, [tabSwitches, distractionTime]);

  useEffect(() => {
    localStorage.setItem('studyTime', studyTime);
  }, [studyTime]);

  const handleReset = () => {
    setStudyTime(0);
    setIsTimerRunning(false);
    localStorage.removeItem('studyTime');
    localStorage.removeItem('tabSwitches');
    localStorage.removeItem('distractionTime');
    // Force page reload to reset the hook state
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <h1>MindTracker Dashboard</h1>
      <div className="stats-grid">
        <StatsCard title="Study Time" value={`${Math.floor(studyTime / 60)} minutes`} type="study" />
        <StatsCard title="Distraction Time" value={`${distractionTime.toFixed(2)} minutes`} type="distraction" />
        <StatsCard title="Tab Switches" value={tabSwitches} type="switches" />
        <StatsCard title="Focus Score" value={focusScore.toFixed(2)} type="score" />
      </div>
      
      <div className="features-grid">
        <Goal studyTime={studyTime} />
        <Streak focusScore={focusScore} />
      </div>
      
      <Insights tabSwitches={tabSwitches} focusScore={focusScore} distractionTime={distractionTime} />
      
      <Timer 
        onTick={(seconds) => setStudyTime(prev => prev + seconds)} 
        onReset={handleReset}
        onTimerStateChange={setIsTimerRunning}
      />
      
      <FocusChart studyTime={studyTime} distractionTime={distractionTime} />
      
      <History />
    </div>
  );
}

export default Dashboard;